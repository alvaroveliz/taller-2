$(document).ready(function(){

  var addEvento = function(mensaje, autor, autorUrl, foto)
  {
    htmlEvento = '\
          <div id="event-1" class="event span12">\
            <div class="event-thumbnail span4">\
              <img src="'+ foto +'" width="200" class="img-polaroid">\
            </div>\
            <div class="event-info span8">\
              <p>'+ mensaje +'</p>\
              <p><strong>Autor</strong>: <a href="'+ autorUrl +'">'+ autor +'</a></p>\
              <hr>\
              <div class="event-buttons pull-right">\
                <a href="" class="btn-link"><span class="icon-heart"></span> Me gusta</a>\
                <a href="" class="btn-link"><span class="icon-plus"></span> Ver más</a>\
              </div>\
            </div>\
          </div>';

    $('#events').prepend(htmlEvento).fadeIn('slow');
  }

  // FOR EACH
  $.each(db.eventos, function(key, evento){
    addEvento(evento.mensaje, evento.autor.nombre, evento.autor.url, evento.foto.url)
  });

  localDB = JSON.parse(localStorage['app.db']);
  $.each(localDB, function(key, evento){
    addEvento(evento.texto, evento.autor, evento.autorUrl, evento.imagen);
  });


  $('#compartir').click(function(){

    if ($('#compartir-texto').val() != '') {
      texto = $('#compartir-texto').val();
      fecha = new Date().getTime();
      imagen = 'bootstrap/img/nino_mama.jpg';

      evento = {
        'texto' : texto,
        'fecha' : fecha,
        'imagen' : imagen,
        'autor' : 'Cotelo',
        'autorUrl' : 'http://google.cl'
      };

      if ( ! localStorage['app.db']) {
        localStorage['app.db'] = '[]';
      }
      appDB = JSON.parse(localStorage['app.db']);
      appDB.push(evento);

      localStorage['app.db'] = JSON.stringify(appDB);

      $('#compartir-texto').val('');

      addEvento(evento.texto, evento.autor, evento.autorUrl, evento.imagen);
    }

  });


});