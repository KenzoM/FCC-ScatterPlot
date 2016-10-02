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
    const svg = d3.select("body")
                  .append("svg")
                  .attr("id","chart")
                  .attr("width", w)
                  .attr("height", h)
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
