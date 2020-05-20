function vis2(stackedbar_data,div)
{
	 stackedBarChart(stackedbar_data, 1, '.0%','')
}
function stackedBarChart(stackedbar_data, yMax, yFormat, yLabel) {
  
  const width=1300
  const margin = {top: 100, right: 0, bottom: 50, left: 80};
  const visWidth = width - margin.left - margin.right;
  const visHeight = 700 - margin.top - margin.bottom;
  
  const counts = d3.rollup(stackedbar_data,
         transactions => d3.sum(transactions, c => c.Amount),
         d => d.year,
         d => d.coalesced_purpose_name);
  
const dataByYear = Array.from(counts, (([year, map]) => {
    map.set('total', d3.sum(map.values()));
    map.set('year', year);
    return Object.fromEntries(map)
  }));
  
  const years = dataByYear.map(d => d.year)
  
  const purpose = Array.from(d3.rollup(stackedbar_data,
                                transactions => d3.sum(transactions, c => c.Amount),
                                d => d.coalesced_purpose_name),
                     ([key, value]) => ({key, value}))
  .sort((a, b) => d3.descending(a.value, b.value))
  .map(d => d.key)
  
  const data = d3.stack()
    .keys(purpose)
    .offset(d3.stackOffsetExpand)(dataByYear)
  
  
  
    const color = d3.scaleOrdinal()
    .domain(purpose)
    .range(d3.schemeTableau10);

  
  
  
  //const svg = d3.select(DOM.svg(visWidth + margin.left + margin.right,
    //                            visHeight + margin.top + margin.bottom));
  
  const svg = d3.select("#vis2")
	.append("svg")
		.attr("width",visWidth + margin.left + margin.right )
		.attr("height",visHeight + margin.top + margin.bottom)
		.attr("transform", `translate(${margin.left},0)`);
  
  const g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);
  
  const x = d3.scaleBand()
      .domain(years)
      .range([0, visWidth])
      .padding(0.25)
      
  
  const y = d3.scaleLinear()
      .domain([0, yMax]).nice()
      .range([visHeight, 0]);
  const formatPercent = d3.format('.2f')
  const xAxis = d3.axisBottom(x)
   .tickFormat(d3.format('.0f')).ticks(20)
  
	  
  
  const yAxis = d3.axisLeft(y)
  .tickFormat(d3.format(yFormat))
  
  g.append('g')
      .attr('transform', `translate(0,${visHeight})`)
      .call(xAxis)
      .call(g => g.selectAll('.domain').remove());
  
  g.append("g")
      .call(yAxis)
      .call(g => g.selectAll('.domain').remove())
    .append('text')
      .attr('fill', 'black')
      .attr('x', 0)
      .attr('y', visHeight / 2)
      .text(yLabel);
  
  const series = g.selectAll('.series')
    .data(data)
    .join('g')
      .attr('fill', d => color(d.key))
      .attr('class', 'series')
    .selectAll('rect')
    .data(d => d)
    .join('rect')
      .attr('y', d => y(d[1]))
      .attr('height', d => (y(d[0]) - y(d[1])))
      .attr('x', d => x(d.data.year))
      .attr('width', x.bandwidth());
	  
/*legend*/	  
	  const g3 = svg.append('g')
      .attr("transform", `translate(${margin.left},10)`)
      .attr("text-anchor", "end")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
    .selectAll("g")
    .data([purpose[0],purpose[1],purpose[2],purpose[3],purpose[4]])
    .join("g")
      .attr("transform", (d, i) => `translate(${i * 230},10)`);

  g3.append("rect")
      .attr("x", 15)
      .attr("width", 20)
      .attr("height", 20)
      .attr("fill", color);

  g3.append("text")
      .attr("x", 10)
      .attr("y", 9.5)
      .attr("dy", "0.5em")
      .text(d => d);
	  
	  
const g4 = svg.append('g')
      .attr("transform", `translate(${margin.left},25)`)
      .attr("text-anchor", "end")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
    .selectAll("g")
    .data([purpose[5],purpose[6],purpose[7],purpose[8],purpose[9]])
    .join("g")
      .attr("transform", (d, i) => `translate(${i * 230},25)`);

  g4.append("rect")
      .attr("x", 15)
      .attr("width", 20)
      .attr("height", 20)
      .attr("fill", color);

  g4.append("text")
      .attr("x", 10)
      .attr("y", 9.5)
      .attr("dy", "0.5em")
      .text(d => d);
  
  
  
  return svg.node();
}
/*function legend() {
  const size = 10;
  const lineHeight = size * 1.5;
  
  const svg =  d3.select(DOM.svg(width, color.domain().length * lineHeight));
  
  const rows = svg
    .selectAll("g")
    .data(color.domain())
    .join("g")
      .attr("transform", (d, i) => `translate(0, ${i * lineHeight})`);
  
  rows.append("rect")
      .attr("height", size)
      .attr("width", size)
      .attr("fill", d => color(d));
  
  rows.append("text")
      .attr("font-family", "sans-serif")
      .attr("font-size", 12)
      .attr("dominant-baseline", "hanging")
      .attr("x", lineHeight)
      .text(d => d);
  
  return svg.node();
}*/