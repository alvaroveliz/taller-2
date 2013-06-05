var map;

function addToList(text, icon)
{
	$('#map-results ul').append('<li><a href=""><img src="'+icon+'" width="24"> '+text+'</a></li>')
}

function loadMarkers()
{

	// Cargar farmacias
	$.each(db.farmacias, function(key, farmacia){
		addToList(farmacia.nombre, 'http://pueblojoseignacio.com/wp-content/uploads/leaflet-maps-marker-icons/drugstore.png');

		position = new google.maps.LatLng(farmacia.coordenadas.latitud, farmacia.coordenadas.longitud);

		var marker = new google.maps.Marker({
	  	clickable: true,
	  	position: position,
	  	map: map,
	  	title: farmacia.nombre,
	  	icon : "http://pueblojoseignacio.com/wp-content/uploads/leaflet-maps-marker-icons/drugstore.png"
	  });

    // Marcadores
    marker.info = new google.maps.InfoWindow({
      content:
      '<h2>' + farmacia.nombre + '</h2>'
      + '<br>'
      + '<em>' + farmacia.direccion + '</em>'
    });


		google.maps.event.addListener(marker, 'click', function() {
	    marker.info.open(map, marker);
	  });
	});

	$.each(db.hospitales, function(key, hospital){
		addToList(hospital.nombre, 'http://www.patientpak.com/gfx/icons/icon-hospital.gif');

		position = new google.maps.LatLng(hospital.coordenadas.latitud, hospital.coordenadas.longitud);

		type = 'hospital';
		iconType = (type == 'hospital') ? 'http://www.patientpak.com/gfx/icons/icon-hospital.gif' : 'otra foto';

		var marker = new google.maps.Marker({
	  	clickable: true,
	  	position: position,
	  	map: map,
	  	title: hospital.nombre,
	  	icon : iconType
	  });

    // Marcadores
    marker.info = new google.maps.InfoWindow({
      content:
      '<h2>' + hospital.nombre + '</h2>'
      + '<br>'
      + '<em>' + hospital.direccion + '</em>'
    });


		google.maps.event.addListener(marker, 'click', function() {
	    marker.info.open(map, marker);
	  });
	});

}

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
		
		_location = JSON.parse(localStorage['demoapp.location']);
		var pos = new google.maps.LatLng(_location.latitude, _location.longitude);

		map.setCenter(pos);

		// cargamos los marcadores
		loadMarkers();
	}
	else {
		if (navigator.geolocation) {

			navigator.geolocation.getCurrentPosition(function(data) {

				locationInfo = { 'longitude' : data.coords.longitude, 'latitude' : data.coords.latitude };
				locationInfoString = JSON.stringify(locationInfo);
				localStorage['demoapp.location'] = locationInfoString;

				var pos = new google.maps.LatLng(data.coords.latitude,
																				 data.coords.longitude);

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