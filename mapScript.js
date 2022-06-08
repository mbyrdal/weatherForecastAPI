function initMap(latitude, longitude) {
    let location = {lat: latitude, lng: longitude};
    let map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: location
    });
    let marker = new google.maps.Marker({
        position: location,
        map: map
    });
}
// Google API key: AIzaSyC6uGdoZVZB4UcmljFutiTTHPA2tpYY7Cw