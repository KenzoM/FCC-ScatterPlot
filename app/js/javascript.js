$(document).ready(function(){
  const w = 800;
  const h = 450;
  const margin = {
    top: 50,
    bottom: 50,
    left: 50,
    right: 50
  }
  function render(data){
    const width = w - (margin.left + margin.right);
    const height = h - (margin.top + margin.bottom);
    const svg = d3.select("body")
                  .append("svg")
                  .attr("id","chart")
                  .attr("width", w)
                  .attr("height", h)

    const chart = svg.append("g")
                .classed("display", true)
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const x = d3.scaleLinear()
                .domain(d3.extent(data,function(d){
                  return d.Seconds
                }))
                .range([width, 0])

    const y = d3.scaleLinear()
                .domain(d3.extent(data,function(d){
                  return d.Place
                }))
                .range([0, height])

    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);

    function drawAxis(params){
      if(params.initialize){
        //draw x axis
        this.append("g")
            .call(params.axis.x)
            .classed("x axis",true)
            .attr("transform","translate(0,"+ height +")")
        //draw y axis
        this.append("g")
            .call(params.axis.y)
            .classed("y axis", true)
            .attr("transform","translate(0,0)")
      }
    }

    function plot(params){
      drawAxis.call(this,params)
      const self = this;
      //enter
      this.selectAll(".point")
          .data(params.data)
          .enter()
          .append("circle")
          .classed("point", true)
      //update
      this.selectAll(".point")
          .attr("r",2)
          .attr("cx", function(d,i){
            return x(d.Seconds)
          })
          .attr("cy", function(d,i){
            return y(d.Place)
          })
      //exit
      this.selectAll(".point")
          .data(params.data)
          .exit()
          .remove()
    }

    plot.call(chart,{
      data:data,
      axis:{
        x: xAxis,
        y: yAxis
      },
      initialize: true
    })
  }
  const url = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json';
  $.ajax({
    type: "GET",
    dataType: "json",
    url: url,
    beforeSend: ()=> {

    },
    complete: () => {

    },
    success: (data) =>{
      render(data)
    }
  })
})
