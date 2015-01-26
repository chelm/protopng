var VectorTile = require('vector-tile').VectorTile,
  VectorTileFeature = require('vector-tile').VectorTileFeature,
  Protobuf = require('pbf'),
  Canvas = require('canvas'),
  d3 = require('d3');

// Esri specific rendering type: esriSMS, esriSFS, esriSLS
var renderTypes = require('./src/types');


var protoPNG = function(){

  var tile, canvas, context;

  // helper function that creates a single GeoJSON feature
  var toGeoJSON = function( feature ){
    var geojson = {
        type: 'Feature',
        geometry: {},
        properties: {}
    };

    for (var k=0; k < feature._keys.length; k++) {
        var key = feature._keys[k];
        geojson.properties[key] = feature._values[k-1];
    }

    geojson.geometry.coordinates = feature.loadGeometry();
    for (var r=0; r < geojson.geometry.coordinates.length; r++) {
        var ring = geojson.geometry.coordinates[r];
        for (var c=0; c < ring.length; c++) {
            ring[c] = [
                ring[c].x,
                ring[c].y
            ];
        }
    }

    if (feature._type == VectorTileFeature.Point) {
        geojson.geometry.type = 'Point';
    }
    else if (feature._type == VectorTileFeature.LineString) {
        if (geojson.geometry.coordinates.length == 1) {
            geojson.geometry.coordinates = geojson.geometry.coordinates[0];
            geojson.geometry.type = 'LineString';
        }
        else {
            geojson.geometry.type = 'MultiLineString';
        }
    }
    else if (feature._type == VectorTileFeature.Polygon) {
        geojson.geometry.type = 'Polygon';
    }

    return geojson;

  };


  // Renders a PBF to a Canvas based on an Esri Renderer JSON object
  var render = function(pbf, renderer, options, callback){
    tile = new VectorTile( new Protobuf(pbf) );

    // a new canvas on which we draw things 
    canvas = new Canvas( options.width || 256, 
        options.height || 256);
    var context = canvas.getContext('2d');

    // Create a series fo GeoJSON objects to render 
    var layers = {};
    for (var key in tile.layers) {
      var geojson = {
        type: 'FeatureCollection',
        features: []
      };

      for (var f=0; f < tile.layers[ key ].length; f++) {
        var feature = tile.layers[ key ].feature(f);
        geojson.features.push( toGeoJSON( feature ) );
      }

      layers[key] = geojson;
    }

    // render each layer
    
    for (var name in renderer){
      if (tile.layers && tile.layers[name]){
        var proj = d3.geo.transform({
          point: function(x, y) {
            x = x/tile.layers[name].extent*canvas.width;
            y = y/tile.layers[name].extent*canvas.height;
            //x *= (1/window.devicePixelRatio);
            //y *= (1/window.devicePixelRatio);
            this.stream.point(x, y);
          }
        });

        var path = d3.geo.path()
          .projection(proj)
          .context(context);

        //width *= (1/window.devicePixelRatio);
        //height *= (1/window.devicePixelRatio);

        var features = layers[name].features;
        if (features && features.length){
          _applyStyle(renderer[name], features, context, path);
        }
      }
    }

    callback(null, canvas.pngStream());
  };


  // Actually applys the style to the canvas
  // uses D3 to project the data and apply the logic for different rendering types 
  var _applyStyle = function(style, features, context, path){
    var self = this;

    var renderer = style.renderer;

    if (renderer.type == 'simple'){
        features.forEach(function(feature){
          renderTypes[ renderer.symbol.type ](feature, path, context, renderer);
        });
    } else if (renderer.type == 'uniqueValue'){
        var field = renderer.field1;
        features.forEach(function( feature ){
          renderer.uniqueValueInfos.forEach( function(uniqStyle ){
            if (feature.properties[field] && ( (Array.isArray(uniqStyle.value) && uniqStyle.value.indexOf(feature.properties[field]) != -1) || feature.properties[field] == uniqStyle.value)){
              renderTypes[ uniqStyle.symbol.type ](feature, path, context, uniqStyle);
            } else {
              // apply default symbol
              if (!feature._drawn && renderer.defaultSymbol){
                renderTypes[ renderer.defaultSymbol.type ](feature, path, context, renderer.defaultSymbol);
              }
            }
          });
        });
    } else if (renderer.type == 'classBreaks'){
        var field = renderer.field;
        features.forEach(function( feature ){
          renderer.classBreakInfos.forEach( function( classStyle ){
            if (feature.properties[field] <= classStyle.classMaxValue && !feature._drawn ){
              renderTypes[classStyle.symbol.type](feature, path, context, classStyle);
            }
          });
        });
    }

  }; 

  var pp = { render: render };
  return pp;

}


module.exports = new protoPNG()
