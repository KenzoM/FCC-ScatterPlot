$(document).ready(function(){
  const w = 800;
  const h = 450;
  const margin = {
    top: 50,
    bottom: 50,
    left: 50,
    right: 50
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
      console.log(data)
    }
  })
})
