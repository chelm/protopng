module.exports = {
  'walmarts':{
    'minZoom': 4,
    'maxZoom': 6,
    'renderer':{
      type: "simple",
      symbol: {
        type: "esriSMS",
        style: "esriSMSCircle",
        size: 3,
        color: [ 4,152,104, 0.5 ],
        outline: {
          type: "esriSLS",
          style: "esriSLSSolid",
          color: [255,255,255,0.5],
          width: .5
        }
      }
    }
  }
};
