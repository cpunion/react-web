




'use strict';

var _reactDom=require('react-dom');var _reactDom2=_interopRequireDefault(_reactDom);
var _unstableNativeDependencies=require('react-dom/unstable-native-dependencies');var _unstableNativeDependencies2=_interopRequireDefault(_unstableNativeDependencies);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var


EventPluginHub=
_reactDom2.default.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.EventPluginHub;var

ResponderEventPlugin=_unstableNativeDependencies2.default.ResponderEventPlugin,
ResponderTouchHistoryStore=_unstableNativeDependencies2.default.ResponderTouchHistoryStore;


var eventTypes=ResponderEventPlugin.eventTypes;
eventTypes.startShouldSetResponder.dependencies=[
'topTouchStart'];


eventTypes.scrollShouldSetResponder.dependencies=[
'topScroll'];


eventTypes.selectionChangeShouldSetResponder.dependencies=[
'topSelectionChange'];


eventTypes.moveShouldSetResponder.dependencies=[
'topTouchMove'];


['responderStart','responderMove','responderEnd','responderRelease',
'responderTerminationRequest','responderGrant','responderReject','responderTerminate'].forEach(function(type){
var dependencies=void 0;
if('ontouchstart'in window){
dependencies=[
'topTouchStart',
'topTouchCancel',
'topTouchEnd',
'topTouchMove'];

}else{

dependencies=[
'topMouseDown',
'topMouseUp'];

}

eventTypes[type].dependencies=dependencies;
});

function toArray(collection){
return collection&&Array.prototype.slice.call(collection)||[];
}

function fixIdentifier(identifier){

if(identifier>20){
return identifier%20;
}

return identifier;
}

var normalizeTouches=function normalizeTouches(touches,nativeEvent){
var timestamp=nativeEvent.timestamp||nativeEvent.timeStamp;

return toArray(touches).map(function(touch){

return{
clientX:touch.clientX,
clientY:touch.clientY,
force:touch.force,
pageX:touch.pageX,
pageY:touch.pageY,
radiusX:touch.radiusX,
radiusY:touch.radiusY,
rotationAngle:touch.rotationAngle,
screenX:touch.screenX,
screenY:touch.screenY,
target:touch.target,
timestamp:timestamp,
identifier:fixIdentifier(touch.identifier)};

});
};

var originRecordTouchTrack=ResponderTouchHistoryStore.recordTouchTrack;
ResponderTouchHistoryStore.recordTouchTrack=function(topLevelType,nativeEvent){

originRecordTouchTrack.call(ResponderTouchHistoryStore,topLevelType,{
changedTouches:normalizeTouches(nativeEvent.changedTouches,nativeEvent),
touches:normalizeTouches(nativeEvent.touches,nativeEvent)});

};

EventPluginHub.injection.injectEventPluginsByName({
ResponderEventPlugin:ResponderEventPlugin});