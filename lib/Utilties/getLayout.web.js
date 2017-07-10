





'use strict';


function getCumulativeOffset(obj){
var left,top;
left=obj.offsetLeft;
top=obj.offsetTop;
return{
x:left,
y:top};

}


function getLayout(element){
var rect=getCumulativeOffset(element);
return{
x:rect.x,
y:rect.y,
width:element.offsetWidth,
height:element.offsetHeight};

}

module.exports=getLayout;