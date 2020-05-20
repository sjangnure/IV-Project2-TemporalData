Promise.all([
  d3.json('IV_Proj2_Viz1_data.json'),
  d3.json('Sorted_Countries.json'),
  d3.json('Viz2_data.json'),
  d3.json('received_amt.json'),
  d3.json('sorted_country.json')
]).then(([heatmap_data,sorted_countries,stackedbar_data,heatmap_data2,sorted_country]) => {
  vis1(heatmap_data,sorted_countries,d3.select('#vis1'));
  vis2(stackedbar_data,d3.select('#vis2'));
  vis3(heatmap_data2,sorted_country,d3.select('#vis3'));
});



