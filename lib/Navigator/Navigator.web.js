








'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();

var _react=require('react');var _react2=_interopRequireDefault(_react);
var _propTypes=require('prop-types');var _propTypes2=_interopRequireDefault(_propTypes);
var _ReactDimensions=require('../Dimensions/Dimensions.web');var _ReactDimensions2=_interopRequireDefault(_ReactDimensions);
var _ReactInteractionMixin=require('../Interaction/InteractionMixin.web');var _ReactInteractionMixin2=_interopRequireDefault(_ReactInteractionMixin);
var _map=require('core-js/library/fn/map');var _map2=_interopRequireDefault(_map);
var _ReactNavigationContext=require('./Navigation/NavigationContext');var _ReactNavigationContext2=_interopRequireDefault(_ReactNavigationContext);
var _ReactNavigatorBreadcrumbNavigationBar=require('./NavigatorBreadcrumbNavigationBar');var _ReactNavigatorBreadcrumbNavigationBar2=_interopRequireDefault(_ReactNavigatorBreadcrumbNavigationBar);
var _ReactNavigatorNavigationBar=require('./NavigatorNavigationBar');var _ReactNavigatorNavigationBar2=_interopRequireDefault(_ReactNavigatorNavigationBar);
var _ReactNavigatorSceneConfigs=require('./NavigatorSceneConfigs');var _ReactNavigatorSceneConfigs2=_interopRequireDefault(_ReactNavigatorSceneConfigs);
var _ReactPanResponder=require('../PanResponder/PanResponder.web');var _ReactPanResponder2=_interopRequireDefault(_ReactPanResponder);
var _ReactStyleSheet=require('../StyleSheet/StyleSheet.web');var _ReactStyleSheet2=_interopRequireDefault(_ReactStyleSheet);
var _Subscribable=require('./polyfills/Subscribable');var _Subscribable2=_interopRequireDefault(_Subscribable);
var _reactTimerMixin=require('react-timer-mixin');var _reactTimerMixin2=_interopRequireDefault(_reactTimerMixin);
var _reactMixin=require('react-mixin');var _reactMixin2=_interopRequireDefault(_reactMixin);
var _autobindDecorator=require('autobind-decorator');var _autobindDecorator2=_interopRequireDefault(_autobindDecorator);
var _ReactView=require('../View/View.web');var _ReactView2=_interopRequireDefault(_ReactView);
var _clamp=require('./polyfills/clamp');var _clamp2=_interopRequireDefault(_clamp);
var _ReactFlattenStyle=require('../StyleSheet/flattenStyle.web');var _ReactFlattenStyle2=_interopRequireDefault(_ReactFlattenStyle);
var _invariant=require('fbjs/lib/invariant');var _invariant2=_interopRequireDefault(_invariant);
var _rebound=require('rebound');var _rebound2=_interopRequireDefault(_rebound);
var _createHashHistory=require('history/lib/createHashHistory');var _createHashHistory2=_interopRequireDefault(_createHashHistory);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}

var history=(0,_createHashHistory2.default)();
var _unlisten=void 0;




var SCREEN_WIDTH=_ReactDimensions2.default.get('window').width;
var SCREEN_HEIGHT=_ReactDimensions2.default.get('window').height;
var SCENE_DISABLED_NATIVE_PROPS={
pointerEvents:'none',
style:{
top:SCREEN_HEIGHT,
bottom:-SCREEN_HEIGHT,
opacity:0}};



var __uid=0;
function getuid(){
return __uid++;
}

function getRouteID(route){
if(route===null||typeof route!=='object'){
return String(route);
}

var key='__navigatorRouteID';

if(!route.hasOwnProperty(key)){
Object.defineProperty(route,key,{
enumerable:false,
configurable:false,
writable:false,
value:getuid()});

}
return route[key];
}


var styles=_ReactStyleSheet2.default.create({
container:{
flex:1,
overflow:'hidden'},

defaultSceneStyle:{
position:'absolute',
left:0,
right:0,
bottom:0,
top:0},

baseScene:{
position:'absolute',
overflow:'hidden',
left:0,
right:0,
bottom:0,
top:0},

disabledScene:{
top:SCREEN_HEIGHT,
bottom:-SCREEN_HEIGHT},

transitioner:{
flex:1,
backgroundColor:'transparent',
overflow:'hidden'}});



var GESTURE_ACTIONS=[
'pop',
'jumpBack',
'jumpForward'];var





























































Navigator=function(_Component){_inherits(Navigator,_Component);


















































































function Navigator(props){_classCallCheck(this,Navigator);var _this=_possibleConstructorReturn(this,(Navigator.__proto__||Object.getPrototypeOf(Navigator)).call(this,
props));_this.
























































































































































































































































































































































































































































































































































































































































































































































































































_sceneRefs={};_this._renderedSceneMap=new _map2.default();var routeStack=props.initialRouteStack||[props.initialRoute];(0,_invariant2.default)(routeStack.length>=1,'Navigator requires props.initialRoute or props.initialRouteStack.');var initialRouteIndex=routeStack.length-1;if(props.initialRoute){initialRouteIndex=routeStack.indexOf(props.initialRoute);(0,_invariant2.default)(initialRouteIndex!==-1,'initialRoute is not in initialRouteStack.');}_this.state={sceneConfigStack:routeStack.map(function(route){return props.configureScene(route);}),routeStack:routeStack,presentedIndex:initialRouteIndex,transitionFromIndex:null,activeGesture:null,pendingGestureProgress:null,transitionQueue:[]};return _this;}_createClass(Navigator,[{key:'componentWillMount',value:function componentWillMount(){var _this2=this;this.__defineGetter__('navigationContext',this._getNavigationContext);this._subRouteFocus=[];this.parentNavigator=this.props.navigator;this._handlers={};this.springSystem=new _rebound2.default.SpringSystem();this.spring=this.springSystem.createSpring();this.spring.setRestSpeedThreshold(0.05);this.spring.setCurrentValue(0).setAtRest();this.spring.addListener({onSpringEndStateChange:function onSpringEndStateChange(){if(!_this2._interactionHandle){_this2._interactionHandle=_this2.createInteractionHandle();}},onSpringUpdate:function onSpringUpdate(){_this2._handleSpringUpdate();},onSpringAtRest:function onSpringAtRest(){_this2._completeTransition();}});this.panGesture=_ReactPanResponder2.default.create({onMoveShouldSetPanResponder:this._handleMoveShouldSetPanResponder,onPanResponderGrant:this._handlePanResponderGrant,onPanResponderRelease:this._handlePanResponderRelease,onPanResponderMove:this._handlePanResponderMove,onPanResponderTerminate:this._handlePanResponderTerminate});this._interactionHandle=null;this._emitWillFocus(this.state.routeStack[this.state.presentedIndex]);this.hashChanged=false;}},{key:'componentDidMount',value:function componentDidMount(){this._handleSpringUpdate();this._emitDidFocus(this.state.routeStack[this.state.presentedIndex]);_unlisten=history.listen(function(location){var destIndex=0;if(location.pathname.indexOf('/scene_')!=-1){destIndex=parseInt(location.pathname.replace('/scene_',''));}if(destIndex<this.state.routeStack.length&&destIndex!=this.state.routeStack.length){this.hashChanged=true;this._jumpN(destIndex-this.state.presentedIndex);this.hashChanged=false;}}.bind(this));}},{key:'componentWillUnmount',value:function componentWillUnmount(){if(this._navigationContext){this._navigationContext.dispose();this._navigationContext=null;}_unlisten();}},{key:'immediatelyResetRouteStack',value:function immediatelyResetRouteStack(nextRouteStack){var _this3=this;var destIndex=nextRouteStack.length-1;this.setState({routeStack:nextRouteStack,sceneConfigStack:nextRouteStack.map(this.props.configureScene),presentedIndex:destIndex,activeGesture:null,transitionFromIndex:null,transitionQueue:[]},function(){_this3._handleSpringUpdate();});}},{key:'_transitionTo',value:function _transitionTo(destIndex,velocity,jumpSpringTo,cb){if(destIndex===this.state.presentedIndex){return;}if(this.state.transitionFromIndex!==null){this.state.transitionQueue.push({destIndex:destIndex,velocity:velocity,cb:cb});return;}this.state.transitionFromIndex=this.state.presentedIndex;this.state.presentedIndex=destIndex;this.state.transitionCb=cb;this._onAnimationStart();var sceneConfig=this.state.sceneConfigStack[this.state.transitionFromIndex]||this.state.sceneConfigStack[this.state.presentedIndex];(0,_invariant2.default)(sceneConfig,'Cannot configure scene at index '+this.state.transitionFromIndex);if(jumpSpringTo!=null){this.spring.setCurrentValue(jumpSpringTo);}this.spring.setOvershootClampingEnabled(true);this.spring.getSpringConfig().friction=sceneConfig.springFriction;this.spring.getSpringConfig().tension=sceneConfig.springTension;this.spring.setVelocity(velocity||sceneConfig.defaultTransitionVelocity);this.spring.setEndValue(1);}},{key:'_handleSpringUpdate',value:function _handleSpringUpdate(){if(this.state.transitionFromIndex!=null){this._transitionBetween(this.state.transitionFromIndex,this.state.presentedIndex,this.spring.getCurrentValue());}else if(this.state.activeGesture!=null){var presentedToIndex=this.state.presentedIndex+this._deltaForGestureAction(this.state.activeGesture);this._transitionBetween(this.state.presentedIndex,presentedToIndex,this.spring.getCurrentValue());}}},{key:'_completeTransition',value:function _completeTransition(){if(this.spring.getCurrentValue()!==1&&this.spring.getCurrentValue()!==0){if(this.state.pendingGestureProgress){this.state.pendingGestureProgress=null;}return;}this._onAnimationEnd();var presentedIndex=this.state.presentedIndex;var didFocusRoute=this._subRouteFocus[presentedIndex]||this.state.routeStack[presentedIndex];this._emitDidFocus(didFocusRoute);this.state.transitionFromIndex=null;this.spring.setCurrentValue(0).setAtRest();this._hideScenes();if(this.state.transitionCb){this.state.transitionCb();this.state.transitionCb=null;}if(this._interactionHandle){this.clearInteractionHandle(this._interactionHandle);this._interactionHandle=null;}if(this.state.pendingGestureProgress){var gestureToIndex=this.state.presentedIndex+this._deltaForGestureAction(this.state.activeGesture);this._enableScene(gestureToIndex);this.spring.setEndValue(this.state.pendingGestureProgress);return;}if(this.state.transitionQueue.length){var queuedTransition=this.state.transitionQueue.shift();this._enableScene(queuedTransition.destIndex);this._emitWillFocus(this.state.routeStack[queuedTransition.destIndex]);this._transitionTo(queuedTransition.destIndex,queuedTransition.velocity,null,queuedTransition.cb);}}},{key:'_emitDidFocus',value:function _emitDidFocus(route){this.navigationContext.emit('didfocus',{route:route});if(this.props.onDidFocus){this.props.onDidFocus(route);}}},{key:'_emitWillFocus',value:function _emitWillFocus(route){this.navigationContext.emit('willfocus',{route:route});var navBar=this._navBar;if(navBar&&navBar.handleWillFocus){navBar.handleWillFocus(route);}if(this.props.onWillFocus){this.props.onWillFocus(route);}}},{key:'_hideScenes',value:function _hideScenes(){var gesturingToIndex=null;if(this.state.activeGesture){gesturingToIndex=this.state.presentedIndex+this._deltaForGestureAction(this.state.activeGesture);}for(var i=0;i<this.state.routeStack.length;i++){if(i===this.state.presentedIndex||i===this.state.transitionFromIndex||i===gesturingToIndex){continue;}this._disableScene(i);}}},{key:'_disableScene',value:function _disableScene(sceneIndex){this._sceneRefs[sceneIndex]&&this._sceneRefs[sceneIndex].setNativeProps(SCENE_DISABLED_NATIVE_PROPS);}},{key:'_enableScene',value:function _enableScene(sceneIndex){var sceneStyle=(0,_ReactFlattenStyle2.default)([styles.baseScene,this.props.sceneStyle]);var enabledSceneNativeProps={pointerEvents:'auto',style:{top:sceneStyle.top,bottom:sceneStyle.bottom}};if(sceneIndex!==this.state.transitionFromIndex&&sceneIndex!==this.state.presentedIndex){enabledSceneNativeProps.style.opacity=0;}this._sceneRefs[sceneIndex]&&this._sceneRefs[sceneIndex].setNativeProps(enabledSceneNativeProps);}},{key:'_onAnimationStart',value:function _onAnimationStart(){var fromIndex=this.state.presentedIndex;var toIndex=this.state.presentedIndex;if(this.state.transitionFromIndex!=null){fromIndex=this.state.transitionFromIndex;}else if(this.state.activeGesture){toIndex=this.state.presentedIndex+this._deltaForGestureAction(this.state.activeGesture);}this._setRenderSceneToHardwareTextureAndroid(fromIndex,true);this._setRenderSceneToHardwareTextureAndroid(toIndex,true);var navBar=this._navBar;if(navBar&&navBar.onAnimationStart){navBar.onAnimationStart(fromIndex,toIndex);}}},{key:'_onAnimationEnd',value:function _onAnimationEnd(){var max=this.state.routeStack.length-1;for(var index=0;index<=max;index++){this._setRenderSceneToHardwareTextureAndroid(index,false);}var navBar=this._navBar;if(navBar&&navBar.onAnimationEnd){navBar.onAnimationEnd();}}},{key:'_setRenderSceneToHardwareTextureAndroid',value:function _setRenderSceneToHardwareTextureAndroid(sceneIndex,shouldRenderToHardwareTexture){var viewAtIndex=this._sceneRefs[sceneIndex];if(viewAtIndex===null||viewAtIndex===undefined){return;}viewAtIndex.setNativeProps({renderToHardwareTextureAndroid:shouldRenderToHardwareTexture});}},{key:'_handleTouchStart',value:function _handleTouchStart(){this._eligibleGestures=GESTURE_ACTIONS;}},{key:'_handleMoveShouldSetPanResponder',value:function _handleMoveShouldSetPanResponder(e,gestureState){var sceneConfig=this.state.sceneConfigStack[this.state.presentedIndex];if(!sceneConfig){return false;}this._expectingGestureGrant=this._matchGestureAction(this._eligibleGestures,sceneConfig.gestures,gestureState);return!!this._expectingGestureGrant;}},{key:'_doesGestureOverswipe',value:function _doesGestureOverswipe(gestureName){var wouldOverswipeBack=this.state.presentedIndex<=0&&(gestureName==='pop'||gestureName==='jumpBack');var wouldOverswipeForward=this.state.presentedIndex>=this.state.routeStack.length-1&&gestureName==='jumpForward';return wouldOverswipeForward||wouldOverswipeBack;}},{key:'_handlePanResponderGrant',value:function _handlePanResponderGrant(e,gestureState){(0,_invariant2.default)(this._expectingGestureGrant,'Responder granted unexpectedly.');this._attachGesture(this._expectingGestureGrant);this._onAnimationStart();this._expectingGestureGrant=null;}},{key:'_deltaForGestureAction',value:function _deltaForGestureAction(gestureAction){switch(gestureAction){case'pop':case'jumpBack':return-1;case'jumpForward':return 1;default:(0,_invariant2.default)(false,'Unsupported gesture action '+gestureAction);return;}}},{key:'_handlePanResponderRelease',value:function _handlePanResponderRelease(e,gestureState){var _this4=this;var sceneConfig=this.state.sceneConfigStack[this.state.presentedIndex];var releaseGestureAction=this.state.activeGesture;if(!releaseGestureAction){return;}var releaseGesture=sceneConfig.gestures[releaseGestureAction];var destIndex=this.state.presentedIndex+this._deltaForGestureAction(this.state.activeGesture);if(this.spring.getCurrentValue()===0){this.spring.setCurrentValue(0).setAtRest();this._completeTransition();return;}var isTravelVertical=releaseGesture.direction==='top-to-bottom'||releaseGesture.direction==='bottom-to-top';var isTravelInverted=releaseGesture.direction==='right-to-left'||releaseGesture.direction==='bottom-to-top';var velocity=void 0,gestureDistance=void 0;if(isTravelVertical){velocity=isTravelInverted?-gestureState.vy:gestureState.vy;gestureDistance=isTravelInverted?-gestureState.dy:gestureState.dy;}else{velocity=isTravelInverted?-gestureState.vx:gestureState.vx;gestureDistance=isTravelInverted?-gestureState.dx:gestureState.dx;}var transitionVelocity=(0,_clamp2.default)(-10,velocity,10);if(Math.abs(velocity)<releaseGesture.notMoving){var hasGesturedEnoughToComplete=gestureDistance>releaseGesture.fullDistance*releaseGesture.stillCompletionRatio;transitionVelocity=hasGesturedEnoughToComplete?releaseGesture.snapVelocity:-releaseGesture.snapVelocity;}if(transitionVelocity<0||this._doesGestureOverswipe(releaseGestureAction)){if(this.state.transitionFromIndex==null){var transitionBackToPresentedIndex=this.state.presentedIndex;this.state.presentedIndex=destIndex;this._transitionTo(transitionBackToPresentedIndex,-transitionVelocity,1-this.spring.getCurrentValue());}}else{this._emitWillFocus(this.state.routeStack[destIndex]);this._transitionTo(destIndex,transitionVelocity,null,function(){if(releaseGestureAction==='pop'){_this4._cleanScenesPastIndex(destIndex);}});}this._detachGesture();}},{key:'_handlePanResponderTerminate',value:function _handlePanResponderTerminate(e,gestureState){if(this.state.activeGesture==null){return;}var destIndex=this.state.presentedIndex+this._deltaForGestureAction(this.state.activeGesture);this._detachGesture();var transitionBackToPresentedIndex=this.state.presentedIndex;this.state.presentedIndex=destIndex;this._transitionTo(transitionBackToPresentedIndex,null,1-this.spring.getCurrentValue());}},{key:'_attachGesture',value:function _attachGesture(gestureId){this.state.activeGesture=gestureId;var gesturingToIndex=this.state.presentedIndex+this._deltaForGestureAction(this.state.activeGesture);this._enableScene(gesturingToIndex);}},{key:'_detachGesture',value:function _detachGesture(){this.state.activeGesture=null;this.state.pendingGestureProgress=null;this._hideScenes();}},{key:'_handlePanResponderMove',value:function _handlePanResponderMove(e,gestureState){var sceneConfig=this.state.sceneConfigStack[this.state.presentedIndex];if(this.state.activeGesture){var gesture=sceneConfig.gestures[this.state.activeGesture];return this._moveAttachedGesture(gesture,gestureState);}var matchedGesture=this._matchGestureAction(GESTURE_ACTIONS,sceneConfig.gestures,gestureState);if(matchedGesture){this._attachGesture(matchedGesture);}}},{key:'_moveAttachedGesture',value:function _moveAttachedGesture(gesture,gestureState){var isTravelVertical=gesture.direction==='top-to-bottom'||gesture.direction==='bottom-to-top';var isTravelInverted=gesture.direction==='right-to-left'||gesture.direction==='bottom-to-top';var distance=isTravelVertical?gestureState.dy:gestureState.dx;distance=isTravelInverted?-distance:distance;var gestureDetectMovement=gesture.gestureDetectMovement;var nextProgress=(distance-gestureDetectMovement)/(gesture.fullDistance-gestureDetectMovement);if(nextProgress<0&&gesture.isDetachable){var gesturingToIndex=this.state.presentedIndex+this._deltaForGestureAction(this.state.activeGesture);this._transitionBetween(this.state.presentedIndex,gesturingToIndex,0);this._detachGesture();if(this.state.pendingGestureProgress!=null){this.spring.setCurrentValue(0);}return;}if(this._doesGestureOverswipe(this.state.activeGesture)){var frictionConstant=gesture.overswipe.frictionConstant;var frictionByDistance=gesture.overswipe.frictionByDistance;var frictionRatio=1/(frictionConstant+Math.abs(nextProgress)*frictionByDistance);nextProgress*=frictionRatio;}nextProgress=(0,_clamp2.default)(0,nextProgress,1);if(this.state.transitionFromIndex!=null){this.state.pendingGestureProgress=nextProgress;}else if(this.state.pendingGestureProgress){this.spring.setEndValue(nextProgress);}else{this.spring.setCurrentValue(nextProgress);}}},{key:'_matchGestureAction',value:function _matchGestureAction(eligibleGestures,gestures,gestureState){var _this5=this;if(!gestures){return null;}var matchedGesture=null;eligibleGestures.some(function(gestureName,gestureIndex){var gesture=gestures[gestureName];if(!gesture){return;}if(gesture.overswipe==null&&_this5._doesGestureOverswipe(gestureName)){return false;}var isTravelVertical=gesture.direction==='top-to-bottom'||gesture.direction==='bottom-to-top';var isTravelInverted=gesture.direction==='right-to-left'||gesture.direction==='bottom-to-top';var currentLoc=isTravelVertical?gestureState.moveY:gestureState.moveX;var travelDist=isTravelVertical?gestureState.dy:gestureState.dx;var oppositeAxisTravelDist=isTravelVertical?gestureState.dx:gestureState.dy;var edgeHitWidth=gesture.edgeHitWidth;if(isTravelInverted){currentLoc=-currentLoc;travelDist=-travelDist;oppositeAxisTravelDist=-oppositeAxisTravelDist;edgeHitWidth=isTravelVertical?-(SCREEN_HEIGHT-edgeHitWidth):-(SCREEN_WIDTH-edgeHitWidth);}var moveStartedInRegion=gesture.edgeHitWidth==null||currentLoc<edgeHitWidth;if(!moveStartedInRegion){return false;}var moveTravelledFarEnough=travelDist>=gesture.gestureDetectMovement;if(!moveTravelledFarEnough){return false;}var directionIsCorrect=Math.abs(travelDist)>Math.abs(oppositeAxisTravelDist)*gesture.directionRatio;if(directionIsCorrect){matchedGesture=gestureName;return true;}else{_this5._eligibleGestures=_this5._eligibleGestures.slice().splice(gestureIndex,1);}});return matchedGesture;}},{key:'_transitionSceneStyle',value:function _transitionSceneStyle(fromIndex,toIndex,progress,index){var viewAtIndex=this._sceneRefs[index];if(viewAtIndex===null||viewAtIndex===undefined){return;}var sceneConfigIndex=fromIndex<toIndex?toIndex:fromIndex;var sceneConfig=this.state.sceneConfigStack[sceneConfigIndex];if(!sceneConfig){sceneConfig=this.state.sceneConfigStack[sceneConfigIndex-1];}var styleToUse={};var useFn=index<fromIndex||index<toIndex?sceneConfig.animationInterpolators.out:sceneConfig.animationInterpolators.into;var directionAdjustedProgress=fromIndex<toIndex?progress:1-progress;var didChange=useFn(styleToUse,directionAdjustedProgress);if(didChange){viewAtIndex.setNativeProps({style:styleToUse});}}},{key:'_transitionBetween',value:function _transitionBetween(fromIndex,toIndex,progress){this._transitionSceneStyle(fromIndex,toIndex,progress,fromIndex);this._transitionSceneStyle(fromIndex,toIndex,progress,toIndex);var navBar=this._navBar;if(navBar&&navBar.updateProgress&&toIndex>=0&&fromIndex>=0){navBar.updateProgress(progress,fromIndex,toIndex);}}},{key:'_handleResponderTerminationRequest',value:function _handleResponderTerminationRequest(){return false;}},{key:'_getDestIndexWithinBounds',value:function _getDestIndexWithinBounds(n){var currentIndex=this.state.presentedIndex;var destIndex=currentIndex+n;(0,_invariant2.default)(destIndex>=0,'Cannot jump before the first route.');var maxIndex=this.state.routeStack.length-1;(0,_invariant2.default)(maxIndex>=destIndex,'Cannot jump past the last route.');return destIndex;}},{key:'_jumpN',value:function _jumpN(n){var destIndex=this._getDestIndexWithinBounds(n);this._enableScene(destIndex);this._emitWillFocus(this.state.routeStack[destIndex]);this._transitionTo(destIndex);if(!this.hashChanged){if(n>0){history.pushState({index:destIndex},'/scene_'+getRouteID(this.state.routeStack[destIndex]));}else{history.go(n);}return;}if(n<0){__uid=Math.max(__uid+n,0);}}},{key:'jumpTo',value:function jumpTo(route){var destIndex=this.state.routeStack.indexOf(route);(0,_invariant2.default)(destIndex!==-1,'Cannot jump to route that is not in the route stack');this._jumpN(destIndex-this.state.presentedIndex);}},{key:'jumpForward',value:function jumpForward(){this._jumpN(1);}},{key:'jumpBack',value:function jumpBack(){this._jumpN(-1);}},{key:'push',value:function push(route){var _this6=this;(0,_invariant2.default)(!!route,'Must supply route to push');var activeLength=this.state.presentedIndex+1;var activeStack=this.state.routeStack.slice(0,activeLength);var activeAnimationConfigStack=this.state.sceneConfigStack.slice(0,activeLength);var nextStack=activeStack.concat([route]);var destIndex=nextStack.length-1;var nextAnimationConfigStack=activeAnimationConfigStack.concat([this.props.configureScene(route)]);this._emitWillFocus(nextStack[destIndex]);this.setState({routeStack:nextStack,sceneConfigStack:nextAnimationConfigStack},function(){history.pushState({index:destIndex},'/scene_'+getRouteID(route));_this6._enableScene(destIndex);_this6._transitionTo(destIndex);});}},{key:'_popN',value:function _popN(n){var _this7=this;if(n===0){return;}(0,_invariant2.default)(this.state.presentedIndex-n>=0,'Cannot pop below zero');var popIndex=this.state.presentedIndex-n;this._enableScene(popIndex);this._emitWillFocus(this.state.routeStack[popIndex]);this._transitionTo(popIndex,null,null,function(){history.go(-n);_this7._cleanScenesPastIndex(popIndex);});}},{key:'pop',value:function pop(){if(this.state.transitionQueue.length){return;}if(this.state.presentedIndex>0){this._popN(1);}}},{key:'replaceAtIndex',value:function replaceAtIndex(route,index,cb){var _this8=this;(0,_invariant2.default)(!!route,'Must supply route to replace');if(index<0){index+=this.state.routeStack.length;}if(this.state.routeStack.length<=index){return;}var nextRouteStack=this.state.routeStack.slice();var nextAnimationModeStack=this.state.sceneConfigStack.slice();nextRouteStack[index]=route;nextAnimationModeStack[index]=this.props.configureScene(route);if(index===this.state.presentedIndex){this._emitWillFocus(route);}this.setState({routeStack:nextRouteStack,sceneConfigStack:nextAnimationModeStack},function(){if(index===_this8.state.presentedIndex){_this8._emitDidFocus(route);}cb&&cb();});}},{key:'replace',value:function replace(route){this.replaceAtIndex(route,this.state.presentedIndex);}},{key:'replacePrevious',value:function replacePrevious(route){this.replaceAtIndex(route,this.state.presentedIndex-1);}},{key:'popToTop',value:function popToTop(){this.popToRoute(this.state.routeStack[0]);}},{key:'popToRoute',value:function popToRoute(route){var indexOfRoute=this.state.routeStack.indexOf(route);(0,_invariant2.default)(indexOfRoute!==-1,'Calling popToRoute for a route that doesn\'t exist!');var numToPop=this.state.presentedIndex-indexOfRoute;this._popN(numToPop);}},{key:'replacePreviousAndPop',value:function replacePreviousAndPop(route){if(this.state.routeStack.length<2){return;}this.replacePrevious(route);this.pop();}},{key:'resetTo',value:function resetTo(route){var _this9=this;(0,_invariant2.default)(!!route,'Must supply route to push');this.replaceAtIndex(route,0,function(){if(_this9.state.presentedIndex>0){_this9._popN(_this9.state.presentedIndex);}});}},{key:'getCurrentRoutes',value:function getCurrentRoutes(){return this.state.routeStack.slice();}},{key:'_captureSceneRef',value:function _captureSceneRef(

index){var _this10=this;
return function(ref){
_this10._sceneRefs[index]=ref;
};
}},{key:'_cleanScenesPastIndex',value:function _cleanScenesPastIndex(

index){
var newStackLength=index+1;

if(newStackLength<this.state.routeStack.length){
this.setState({
sceneConfigStack:this.state.sceneConfigStack.slice(0,newStackLength),
routeStack:this.state.routeStack.slice(0,newStackLength)});

}
}},{key:'_renderScene',value:function _renderScene(

route,i){var _this11=this;
var disabledSceneStyle=null;
var disabledScenePointerEvents='auto';
if(i!==this.state.presentedIndex){
disabledSceneStyle=styles.disabledScene;
disabledScenePointerEvents='none';
}

return(
_react2.default.createElement(_ReactView2.default,{
key:'scene_'+getRouteID(route),
ref:this._captureSceneRef(i),
onStartShouldSetResponderCapture:function onStartShouldSetResponderCapture(){
return _this11.state.transitionFromIndex!=null||_this11.state.transitionFromIndex!=null;
},
pointerEvents:disabledScenePointerEvents,
style:[styles.baseScene,this.props.sceneStyle,disabledSceneStyle]},
this.props.renderScene(
route,
this)));



}},{key:'_renderNavigationBar',value:function _renderNavigationBar()

{var _this12=this;
if(!this.props.navigationBar){
return null;
}
return _react2.default.cloneElement(this.props.navigationBar,{
ref:function ref(navBar){
_this12._navBar=navBar;
},
navigator:this,
navState:this.state});

}},{key:'render',value:function render()

{var _this13=this;
var newRenderedSceneMap=new _map2.default();
var scenes=this.state.routeStack.map(function(route,index){
var renderedScene=void 0;
if(_this13._renderedSceneMap.has(route)&&
index!==_this13.state.presentedIndex){
renderedScene=_this13._renderedSceneMap.get(route);
}else{
renderedScene=_this13._renderScene(route,index);
}
newRenderedSceneMap.set(route,renderedScene);
return renderedScene;
});
this._renderedSceneMap=newRenderedSceneMap;
return(
_react2.default.createElement(_ReactView2.default,{style:[styles.container,this.props.style]},
_react2.default.createElement(_ReactView2.default,_extends({
style:styles.transitioner},
this.panGesture.panHandlers,{
onTouchStart:this._handleTouchStart,
onResponderTerminationRequest:
this._handleResponderTerminationRequest}),

scenes),

this._renderNavigationBar()));


}},{key:'_getNavigationContext',value:function _getNavigationContext()

{
if(!this._navigationContext){
this._navigationContext=new _ReactNavigationContext2.default();
}
return this._navigationContext;
}}]);return Navigator;}(_react.Component);Navigator.propTypes={configureScene:_propTypes2.default.func,renderScene:_propTypes2.default.func.isRequired,initialRoute:_propTypes2.default.object,initialRouteStack:_propTypes2.default.arrayOf(_propTypes2.default.object),onWillFocus:_propTypes2.default.func,onDidFocus:_propTypes2.default.func,navigationBar:_propTypes2.default.node,navigator:_propTypes2.default.object,sceneStyle:_ReactView2.default.propTypes.style};Navigator.BreadcrumbNavigationBar=_ReactNavigatorBreadcrumbNavigationBar2.default;Navigator.NavigationBar=_ReactNavigatorNavigationBar2.default;Navigator.SceneConfigs=_ReactNavigatorSceneConfigs2.default;Navigator.defaultProps={configureScene:function configureScene(){return _ReactNavigatorSceneConfigs2.default.PushFromRight;},sceneStyle:styles.defaultSceneStyle};


_reactMixin2.default.onClass(Navigator,_reactTimerMixin2.default);
_reactMixin2.default.onClass(Navigator,_ReactInteractionMixin2.default);
_reactMixin2.default.onClass(Navigator,_Subscribable2.default.Mixin);
(0,_autobindDecorator2.default)(Navigator);

Navigator.isReactNativeComponent=true;exports.default=

Navigator;