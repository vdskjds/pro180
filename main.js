let latitude,logitude,destination

$(document).ready(function(){
    alert("please allow the device to know your location!!")
    initGeolocation()
})
$(function(){
    $("#navigate-button").click(function() {
        window.location.href=`ar_weather.html?source=${latitude};${longitude}&destination=${destination[1]};${destination[0]}`
    })
})
function initGeolocation(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success);
    }
    else{
        alert("Sorry,your brower does not support geolocation services. ")
    }
}
function success(position) {
    latitude = position.coords.latitude
    logitude = position.coords.longitude
    mapboxgl.accessToken = 'pk.eyJ1Ijoic2FtYW5nYSIsImEiOiJjbGdxbWk4a2EwZmtuM3Ntczl6c3NrOWl5In0.q5hoAME72bwjEBkaOnAhEw'

    var map=new mapboxgl.Map({
        container:'map',
        style:'mapbox://styles/mapbox/streets-v11',
        center:[logitude,latitude],
        zoom:4
    })
    var img1= document.querySelector("#amber")
    var marker1=new mapboxgl.Marker({
        element:img1
    })
    .setLngLat([75.85133,26.98547])
    .addTo(map)
    map.addControl(
        new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl:mapboxgl
        })
    )
    map.addControl(
        new MapboxDirections({
            accessToken: mapboxgl.accessToken,
        }),
        'top-left'
    )
    map.on('click', function(e) {
        destination=e.lnglat;
    })
    map.addControl(
        new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl:mapboxgl
        }).on('result',function(e){
            destination=e.result.center
        })
    )
    map.addControl(
        new mapboxgl.GeolocateControl({
            positionOptions:{
                enableHighAccuracy: true
            },
            trackUserLocation: true
        })
    )
    setTimeout(function(){
        $(".mapboxgl-ctrl-icon").click()
    },3000)
    map.addControl(
        new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl:mapboxgl
        }).on('result',function(e){
            destination = e.result.center
        })
    )
}