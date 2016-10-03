$(document).ready(function(){
  const w = 900;
  const h = 600;
  const margin = {
    top: 50,
    bottom: 90,
    left: 80,
    right: 100
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

    //bestTime is use for offset in x-scale units
    const bestTime = d3.min(data,function(d){
      return d.Seconds
    })

    //formatTime is use for converting the parsed delta time for
    //x-axis units

    const formatTime = d3.timeFormat("%M:%S");
    const formatSeconds = function(seconds) {
      return formatTime(new Date(2014, 0, 1, 0, 0, seconds))
    };

    const x = d3.scaleLinear()
                .domain([d3.max(data,function(d){
                  return d.Seconds - bestTime + 10
                }),0])
                .range([0,width])

    const y = d3.scaleLinear()
                .domain(d3.extent(data,function(d){
                  return d.Place + 2
                }))
                .range([0, height])

    const xAxis = d3.axisBottom(x)
                    .tickFormat(formatSeconds)
                    .ticks(7);

    const yAxis = d3.axisLeft(y);

    //add tooltip for user's interaction
    const tooltip = d3.select("#chart")
                .append("div")
                  .classed("tooltip", true)
                  .style("opacity",0)


    //drawAxis purpose is to render the axis and its label once
    function drawAxis(params){
      if(params.initialize){
        //draw x axis units
        this.append("g")
            .call(params.axis.x)
            .classed("x axis",true)
            .attr("transform","translate(0,"+ height +")")
        //draw y axis units
        this.append("g")
            .call(params.axis.y)
            .classed("y axis", true)
            .attr("transform","translate(0,0)")
        //draw x axis label
        this.select(".x.axis")
            .append("text")
            .classed("x axis-label",true)
            .attr("transform","translate("+ width/2 +",60)")
            .text("Minutes Behind Fastest Time")
        //draw y axis label
        this.select(".y.axis")
            .append("text")
            .classed("y axis-label", true)
            .attr("transform", "translate(-40,"+ height/2 +") rotate(-90)")
            .text("Rank")
      }
    }

    function plot(params){
      //render axis and its labels
      drawAxis.call(this,params)
      const self = this;
      //enter() phase
      this.selectAll(".point")
          .data(params.data)
          .enter()
          .append("circle")
          .classed("point", true)

      this.selectAll(".bikers-name")
          .data(params.data)
          .enter()
          .append("text")
          .classed("bikers-name",true)

      //update phase
      this.selectAll(".point")
          .attr("r",6)
          .attr("cx", function(d,i){
            return x(d.Seconds - bestTime)
          })
          .attr("cy", function(d,i){
            return y(d.Place)
          })
          .style("fill",function(d,i){
            return d.Doping === "" ? "66CDFF" : "FF6680"
          })
          .on("mouseover",function(d,i){
            d3.select(this)
              .style("r",8)
          })
          .on("mouseout",function(d,i){
            d3.select(this)
              .style("r",6)
          })

      this.selectAll(".bikers-name")
        .attr("x",function(d,i){
          return x(d.Seconds - bestTime) + 9
        })
        .attr("y",function(d,i){
          return y(d.Place) + 5
        })
        .text(function(d,i){
          return d.Name
        })

      //exit phase
      this.selectAll(".point")
          .data(params.data)
          .exit()
          .remove()

      this.selectAll(".bikers-name")
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
