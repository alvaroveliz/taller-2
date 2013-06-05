var map;

function initialize() 
{
	
	var mapOptions = {
		zoom: 15,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	map = new google.maps.Map(document.getElementById('map-canvas'),
			mapOptions);

	// Try HTML5 geolocation

	if (localStorage['demoapp.location']) {
		console.log('SACANDO INFORMACION DE LOCAL STORAGE')

		_location = JSON.parse(localStorage['demoapp.location']);
		var pos = new google.maps.LatLng(_location.latitude, _location.longitude);

		var infowindow = new google.maps.InfoWindow({
			map: map,
			position: pos,
			content: 'Encontramos la posicion (POR 2DA O MÁS VECES) usando HTML5 Geolocation'
		});

		map.setCenter(pos);
	}
	else {
		if (navigator.geolocation) {

			console.log('SACANDO INFORMACION DE GEOLOCATION')

			navigator.geolocation.getCurrentPosition(function(data) {

				locationInfo = { 'longitude' : data.coords.longitude, 'latitude' : data.coords.latitude };
				locationInfoString = JSON.stringify(locationInfo);
				localStorage['demoapp.location'] = locationInfoString;

				var pos = new google.maps.LatLng(data.coords.latitude,
																				 data.coords.longitude);

				var infowindow = new google.maps.InfoWindow({
					map: map,
					position: pos,
					content: 'Encontramos la posicion (POR 1ERA VEZ) usando HTML5 Geolocation'
				});

				map.setCenter(pos);

			}, function() {
				handleNoGeolocation(true);
			});
		} 
		else {
			// Browser doesn't support Geolocation
			handleNoGeolocation(false);
		}
	}
}

function handleNoGeolocation(errorFlag) 
{
	if (errorFlag) {
		var content = 'Error: The Geolocation service failed.';
	} else {
		var content = 'Error: Your browser doesn\'t support geolocation.';
	}

	var options = {
		map: map,
		position: new google.maps.LatLng(60, 105),
		content: content
	};

	var infowindow = new google.maps.InfoWindow(options);
	map.setCenter(options.position);
}

google.maps.event.addDomListener(window, 'load', initialize);