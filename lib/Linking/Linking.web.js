






'use strict';

var emptyFunction=function emptyFunction(){};

var Linking={
addEventListener:emptyFunction,
removeEventListener:emptyFunction,
openURL:function openURL(url){
if(window){
window.open(url);
}
},
canOpenURL:function canOpenURL(url){
return true;
},
getInitialURL:function getInitialURL(){return Promise.resolve();}};


module.exports=Linking;