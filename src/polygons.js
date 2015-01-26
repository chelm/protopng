
module.exports = function( feature, path, context, style ){
    context.fillStyle = 'rgba('+style.symbol.color.join(',')+')';
    if (style.symbol.outline.width){
      context.strokeStyle = 'rgba('+style.symbol.outline.color.join(',')+')';
      context.lineWidth = style.symbol.outline.width;
    }
    context.beginPath();
    path(feature);
    context.fill();
    if (style.symbol.outline.width) {
      context.stroke();
    }
//    feature._drawn = true;
    return;
};
