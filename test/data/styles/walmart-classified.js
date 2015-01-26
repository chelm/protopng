module.exports = { 
  'walmarts': {
    'renderer': {
      "type": "classBreaks",
      "field": "geo_score",
      "classificationMethod": "esriClassifyManual",
      "classBreakInfos": [{
        "classMinValue": 0,
        "classMaxValue": 0.4,
        "symbol": {
          "color": [157,231,61, .5],
          "outline": {
            "color": [255, 255, 255, .5],
            "width": 1,
            "type": "esriSLS",
            "style": "esriSLSSolid"
          },
          "size": 2, 
          "type": "esriSMS",
          "style": "esriSFSSolid"
        }
      },{
        "classMinValue": 0.4,
        "classMaxValue": 0.5,
        "symbol": {
          "color": [157,231,61, .5],
          "outline": {
            "color": [255, 255, 255, .5],
            "width": 1,
            "type": "esriSLS",
            "style": "esriSLSSolid"
          },
          "size": 3, 
          "type": "esriSMS",
          "style": "esriSFSSolid"
        }
      },{
        "classMinValue": 0.5,
        "classMaxValue": 0.6,
        "symbol": {
          "color": [157,231,61, .5],
          "outline": {
            "color": [255, 255, 255, .5],
            "width": 1,
            "type": "esriSLS",
            "style": "esriSLSSolid"
          },
          "size": 4, 
          "type": "esriSMS",
          "style": "esriSFSSolid"
        }
      },{
        "classMinValue": 0.6,
        "classMaxValue": 0.7,
        "symbol": {
          "color": [157,231,61, .5],
          "outline": {
            "color": [255, 255, 255, .5],
            "width": .5,
            "type": "esriSLS",
            "style": "esriSLSSolid"
          },
          "size": 4, 
          "type": "esriSMS",
          "style": "esriSFSSolid"
        }
      },{
        "classMinValue": 0.7,
        "classMaxValue": 0.75,
        "symbol": {
          "color": [157,231,61, .5],
          "outline": {
            "color": [255, 255, 255, .5],
            "width": 1,
            "type": "esriSLS",
            "style": "esriSLSSolid"
          },
          "size": 3, 
          "type": "esriSMS",
          "style": "esriSFSSolid"
        }
      },{
        "classMinValue": 0.75,
        "classMaxValue": 0.9,
        "symbol": {
          "color": [157,231,61, .5],
          "outline": {
            "color": [255, 255, 255, .5],
            "width": 1,
            "type": "esriSLS",
            "style": "esriSLSSolid"
          },
          "size": 10, 
          "type": "esriSMS",
          "style": "esriSFSSolid"
        }
      },{
        "classMinValue": 0.9,
        "classMaxValue": 1,
        "symbol": {
          "color": [157,231,61,.5],
          "outline": {
            "color": [255, 255, 255, .5],
            "width": 1,
            "type": "esriSLS",
            "style": "esriSLSSolid"
          },
          "size": 2, 
          "type": "esriSMS",
          "style": "esriSFSSolid"
        }
      
      }]
    }
  }
};
