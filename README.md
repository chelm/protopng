# protopng

A javascript module that converts pbf tiles to images via canvas

  ```javascript
  // render a png from a PBF
  protoPNG.render(pbf, renderer, options, function(err, pngStream){

    pngStream.on('data', function(chunk){
      out.write(chunk);
    });

    pngStream.on('end', function(){
      console.log('PNG is saved');
    });

  });
  ```
