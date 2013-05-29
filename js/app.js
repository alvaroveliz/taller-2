var map;

          function initialize() 
          {
            
            var mapOptions = {
              zoom: 18,
              mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            map = new google.maps.Map(document.getElementById('map-canvas'),
                mapOptions);

            // Try HTML5 geolocation

            if (localStorage['kuaizi.location']) {
              console.log('SACANDO INFORMACION DE LOCAL STORAGE')

              _location = JSON.parse(localStorage['kuaizi.location']);
              var pos = new google.maps.LatLng(_location.latitude, _location.longitude);

              var infowindow = new google.maps.InfoWindow({
                map: map,
                position: pos,
                content: 'Encontramos la posicion usando HTML5 Geolocation'
              });

              map.setCenter(pos);

                $.each(db.restaurantes, function(key, restaurant){

                if (restaurant.address.geolocation.latitude && restaurant.address.geolocation.longitude) {
                  markerLatLong = new google.maps.LatLng(restaurant.address.geolocation.latitude, restaurant.address.geolocation.longitude);

                  markerTitle = restaurant.name;

                  var marker = new google.maps.Marker({
                      position: markerLatLong,
                      map: map,
                      title: markerTitle,
                      content: markerTitle
                  });
                }
              });
            } else {
              if (navigator.geolocation) {

                console.log('SACANDO INFORMACION DE GEOLOCATION')

                navigator.geolocation.getCurrentPosition(function(data) {

                  date = new Date();
                  infoDate = date.getTime();
                  locationInfo = {
                    'longitude' : data.coords.longitude,
                    'latitude' : data.coords.latitude,
                    'date' : infoDate
                  };

                  locationInfo = { 'longitude' : data.coords.longitude, 'latitude' : data.coords.latitude };
                  locationInfoString = JSON.stringify(locationInfo);
                  localStorage['kuaizi.location'] = locationInfoString;

                  var pos = new google.maps.LatLng(data.coords.latitude,
                                                   data.coords.longitude);

                  var infowindow = new google.maps.InfoWindow({
                    map: map,
                    position: pos,
                    content: 'Encontramos la posicion usando HTML5 Geolocation',
                  });
                  console.log('Mostrando la ubicación encontrada');

                  navigator.geolocation.getCurrentPosition(function(data) {

                  date = new Date();
                  infoDate = date.getTime();
                  locationInfo = {
                    'longitude' : data.coords.longitude,
                    'latitude' : data.coords.latitude,
                    'date' : infoDate
                  };

                  locationInfoString = JSON.stringify(locationInfo);
                  localStorage['demoapp.location'] = locationInfoString;

                  var pos = new google.maps.LatLng(data.coords.latitude,
                                                   data.coords.longitude);

                  var infowindow = new google.maps.InfoWindow({
                    map: map,
                    position: pos,
                    content: 'Encontramos la posicion usando HTML5 Geolocation'
                  });

                  map.setCenter(pos);

                }, function() {
                  handleNoGeolocation(true);
                });
              } 
              )} else {
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





