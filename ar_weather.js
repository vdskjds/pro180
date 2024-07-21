let coodinates={}

$(document).ready(function(){
    get_coordinates()
    render_elements()
})

function get_coordinates(){
    let searchParams = new URLSearchParams(window.location.sreach)
    if(sreachParams.has('source')&&sreachParams.has('destination')){
        let source=sreachParams.get('source')
        let destination=sreachParams.get('destination')
        coodinates.source_lat=source.split(";")[0]
        coodinates.source_lng=source.split(";")[1]
        coodinates.destination_lat=destination.split(";")[0]
        coodinates.destination_lng=destination.split(";")[1]
    }else{
        alert("Coordinates not selected!")
        window.history.back()
    }
}
function render_elements(){
    $.ajax({
        url:`http://api.openweathermap.org/data/2.5/weather?lat=${coordinates.destination_lat}&lon=${coordinates.destination_lon}&appid=94212e971d0ca977303f8ae892224bbd`,
        type:"get",
        success:function(response){
            let name = response.name
            let weather = response.weather[0].main
            $("#scene_container").append(
                `<a-entity gps-entity-pleace="latitude:${steps[i].maneuver.location[1]}; longitude:${steps[i].maneuver.location[0]};">
                   <a-entity>
                       <a-text height="50" value="Weather forcast is ${weather} at ${name}"></a-text>
                   </a-entity>
                   </a-entity>`
                )
        }

    })

}
function get_weather(){
    $.ajax({
        url:"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid"
    })
}
$(function(){
    $("#navigated-button").click(function(){
        window.location.href=`ar_weather.html?source=${latitude};${longitude}&destination=${destination[1]};${destination[0]}`
    })
})
