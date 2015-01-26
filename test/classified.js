var tape = require('tape');
var fs = require('fs');

var protoPNG = require(__dirname + '/../');

var pbf = fs.readFileSync(__dirname + '/data/walmart-points.pbf');

tape('draw classified points', function (t) {
    t.plan(1);

    // load the renderer 
    var renderer = require(__dirname + '/data/styles/walmart-classified.js');
    var options = {};

    // the file to be saved
    var out = fs.createWriteStream( __dirname + '/results/walmart-classified.png');

    // render a png from the PBF
    protoPNG.render(pbf, renderer, options, function(err, pngStream){

      pngStream.on('data', function(chunk){
        out.write(chunk);
      });

      pngStream.on('end', function(){
        t.ok(true, 'callback is called, PNG is saved');
      });

    });
});



