

module.exports = function(feature, path, context, style){
    context.strokeStyle = 'rgba('+style.symbol.color.join(',')+')';
    context.lineWidth = style.symbol.width;
    if (style.symbol.style && style.symbol.style == 'esriSLSDashed'){
      context.setLineDash([5]);
    } else {
      context.setLineDash([0]);
    }
    context.beginPath();
    path(feature);
    context.stroke();
    return;
}
