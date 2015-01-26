

module.exports = function( feature, path, context, style ){
    var x = feature.geometry.coordinates[0][0][0];
    var y = feature.geometry.coordinates[0][0][1];
    x = x/4096*256;
    y = y/4096*256;
    //x *= (1/window.devicePixelRatio);
    //y *= (1/window.devicePixelRatio);
    context.lineWidth = style.symbol.outline.width;
    context.fillStyle = 'rgba('+style.symbol.color.join(',')+')';
    context.strokeStyle = 'rgba('+style.symbol.outline.color.join(',')+')';
    context.beginPath();
    context.arc(x, y, style.symbol.size, 0, 2 * Math.PI, true);
    context.fill();
    context.stroke();
    if (style.labelField && feature.properties[style.labelField]){
      context.font = "12px 'Open Sans'";
      context.fillStyle = '#555';
      context.fillText(feature.properties[style.labelField], x+5, y-1);
    }
    feature._drawn = true;
    return;
};
