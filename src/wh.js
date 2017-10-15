let _d;
let _n;
let draw;
let axis = [];
let xLinear;
let yLinear;
let chartYear = 2016;
let margin = [];

document.addEventListener("DOMContentLoaded", (event) => {
  _d = new Data();
  draw = new Draw();
  _n = new Navigation();
  _d.loadHappy("https://CJKraenzle.github.io/data/data.csv", _n.setChart);

  margin.width = window.innerWidth - 40;   // svg#chart1 widith
  margin.height = window.innerHeight - 60; // svg#chart1 height
  margin.paddingLeft = margin.height / 10;
  margin.paddingRight = 10;
  margin.paddingTop = 10;
  margin.paddingBottom = margin.width / 15;
});

class Navigation {
  constructor() {
    this.setEventListeners();
  }
  setEventListeners() {
    window.addEventListener("resize", () => {  this.executeResize();  });
  }
  executeResize() {
    margin.width = window.innerWidth - 40;   // svg#chart1 widith
    margin.height = window.innerHeight - 60; // svg#chart1 height
    margin.paddingBottom = margin.width / 15;
    margin.paddingLeft = margin.height / 10;

    draw.renderWorldHappiness(_d.getDataByYear(chartYear));
  }
  setChart() {
    draw.renderWorldHappiness(_d.getDataByYear(chartYear));

  }
}

class Draw {
  createScale(data) {
    xLinear = d3.scaleLinear()
      .domain([0,d3.max(data,(d,i)=>{ return d.x; })])
      //.domain([d3.min(data,(d,i)=>{ return d.x; }),d3.max(data,(d,i)=>{ return d.x; })])
      .range([margin.paddingLeft, (margin.width - margin.paddingRight)])
      .nice();
    yLinear = d3.scaleLinear()
      .domain([0, d3.max(data,(d,i)=>{ return d.y; })])
      .range([(margin.height - margin.paddingBottom), margin.paddingTop])
      .nice();
  }
  renderWorldHappiness(data) {
    this.createScale(data);
    let radius = Math.ceil((margin.width < margin.height ? margin.height : margin.width) / 100);
    let t = d3.transition().duration(750);
    let t2 = d3.transition().duration(1500);
    let scatter = d3.select("#chart1")
      .selectAll("circle")
      .data(data);

    scatter 
      .exit()
        .remove();

    scatter
      .enter()
      .append("circle")
      .merge(scatter)
        // Start attributes on resize
        .attr("r",6)
        // Transition after resize
        .transition(t)
          .attr("cx", (d)=>{ return xLinear(d.x); })
          .attr("cy", (d)=>{ return yLinear(d.y); })
          .attr("fill", (d)=>{
            if (d.y < 3) return "rgba(255,36,0,.8)";
            if (d.y < 4) return "rgba(102,165,255,.8)";
            if (d.y < 5) return "rgba(50,135,255,.8)";
            if (d.y < 6) return "rgba(0,105,255,.8)";
            if (d.y < 7) return "rgba(0,84,204,.8)";
            return "rgba(12,148,0,.8)";
          })
          .attr("r", 20)
        // Transition to final state
        .transition(t2)
          .attr("r",radius);
    this.xAxis(data);
    this.yAxis(data);
  }
  xAxis(data) {
    if (axis.xAxisG!=undefined) axis.xAxisG.remove();
    if (axis.xAxisTitle!=undefined) axis.xAxisTitle.remove();

    axis.xAxis = d3.axisBottom(xLinear)
      .tickFormat((d,i)=>{ 
        if (data[d]==undefined) return "";
        return data[d].country;
      });
    axis.xAxisG = d3.select("#chart1")
      .append("g")
      .attr("transform", "translate(0," + (margin.height - margin.paddingBottom) + ")")
      .call(axis.xAxis);

    axis.xAxisTitle = d3.select("#chart1").append("text")
      .attr("class","labelW")
      .attr("y", margin.height - (margin.paddingBottom / 5))
      .attr("x", margin.width / 2)
      .style("text-anchor", "middle")
      .text("World Happiness - Surveyed Countries");
  }
  yAxis(data) {
    if (axis.yAxisG!=undefined) axis.yAxisG.remove();
    if (axis.yAxisTitle!=undefined) axis.yAxisTitle.remove();
    
    axis.yAxis = d3.axisLeft(yLinear);
    axis.yAxisG = d3.select("#chart1")
      .append("g")
      .attr("transform", "translate(" + margin.paddingLeft + ", 0 )")
      .call(axis.yAxis);

    axis.yAxisTitle = d3.select("#chart1").append("text")
      .attr("class", "labelH")
      .attr("transform", "rotate(-90)")
      .attr("y", margin.paddingLeft / 2.5)
      .attr("x", -(margin.height - margin.paddingBottom) / 2)
      .style("text-anchor", "middle")
      .text("World Happiness Ranking");
      
  }
}