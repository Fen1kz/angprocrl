$(function(){ 
    var template = '<div class="class">'
    + '{{cls.name}}'
    + '</div>';

    data.classes.forEach(function(e){
        var processed = template.replace('{{cls.name}}', e.name);
        var $cls = $(processed)
            .attr('unselectable', 'on');
            
        $('#classCanvas').append($cls);
        
    });
    
    
    var layout = (function () {
        
        return this;
    })();
});