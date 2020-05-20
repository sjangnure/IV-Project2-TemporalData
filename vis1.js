function vis1(heatmap_data,sorted_countries,div)
{
  const lightgray = '#f0f0f0'
  const height = 900
  const width = 1200
  
  const net_amount_data=heatmap_data.map(d=>d.net_amount) 
   const countries_list_old = sorted_countries.map(d=>d.country)
  const countries_old = d3.set(countries_list_old).values();
  
  const color1=d3.scaleQuantile()
  .domain(net_amount_data) // pass the whole dataset to a scaleQuantile’s domain
  .range(['#d7191c','#fdae61','#ffffbf','#abd9e9','#2c7bb6'])
  
  const margin = ({ top: 50, left: 110, right: 30, bottom: 10 })
  
  //const svg = d3.select(DOM.svg(width, height))
  
  const svg = d3.select("#vis1")
	.append("svg")
		.attr("width",width + margin.left + margin.right )
		.attr("height",height+margin.top + margin.bottom)
		.attr("transform", `translate(${margin.left}, ${margin.top})`);
  
  const g = svg.attr('width', width + margin.left)
  .attr('height', height + margin.top + margin.bottom)
   .append('g')
   .attr("transform", `translate(${margin.left}, ${margin.top})`);
 
 
 
 
  const years = d3.set(heatmap_data.map(d=> d.year)).values();
  
 const x_scale = d3.scaleBand()
.domain(years)
.range([0, width])
.padding(0.05);

  const countries = d3.set(heatmap_data.map(d=> d.country)).values();
   const y_scale = d3.scaleBand().domain(countries_old).range([height-(6*margin.bottom), margin.top]).padding(0.025);
   
   
    
 g.append('g')
  .append('rect')
   .attr('x', 0)
    .attr('y',0)
  .attr('width', width)
    .attr('height',height-(6*margin.bottom)-margin.top)
   .attr('fill',lightgray) 
  
 g.append('g')
    .attr('transform', `translate(0, 0 )`)
    .call(d3.axisTop(x_scale))
	.append('text')
      .attr('x', width / 2)
      .attr('y', -20)
      .attr('fill', 'black')
      .attr('text-anchor', 'middle')
      .text('Year');
  
 g.append('g')
  .attr('transform', `translate(0, -${margin.top} )`)
  .call(d3.axisLeft(y_scale))
	10
g.append('g')
    .attr('transform', `translate(0, ${height-(6*margin.bottom)-margin.top})`)
    .call(d3.axisBottom(x_scale))
	.append('text')
      .attr('x', width / 2)
      .attr('y', 30)
      .attr('fill', 'black')
      .attr('text-anchor', 'middle')
      .text('Year');
	
	//legend
const g3 = svg.append('g')
      .attr("transform", `translate(${margin.left},-5)`)
      .attr("text-anchor", "end")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
    .selectAll("g")
    .data(color1.range())
    .join("g")
      .attr("transform", (d, i) => `translate(${i * 120},0)`);
	  

  g3.append("rect")
      .attr("x", 15)
      .attr("width", 20)
      .attr("height", 20)
      .attr("fill", d=>d);

  g3.append("text")
	.data(['low (-91400M)','','','','high(113900M)'])
      .attr("x", 10)
      .attr("y", 9.5)
      .attr("dy", "0.5em")
      .text(d=>d);
  
  svg.selectAll()
    .data(heatmap_data)
    .enter()
    .append('rect')
    .attr('x', (d) => x_scale(d.year) + margin.left)
    // .attr('y', (d) => y_scale(d.country))
    .attr('y', (d) => y_scale(d.country))
    .attr('width', x_scale.bandwidth())
    .attr('height', y_scale.bandwidth())
    .attr('fill', (d=> color1(d.net_amount)))
 
	 
  
}