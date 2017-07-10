








'use strict';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();

var _react=require('react');var _react2=_interopRequireDefault(_react);
var _propTypes=require('prop-types');var _propTypes2=_interopRequireDefault(_propTypes);
var _ReactNavigatorBreadcrumbNavigationBarStyles=require('./NavigatorBreadcrumbNavigationBarStyles.web');var _ReactNavigatorBreadcrumbNavigationBarStyles2=_interopRequireDefault(_ReactNavigatorBreadcrumbNavigationBarStyles);
var _ReactNavigatorNavigationBarStylesAndroid=require('./NavigatorNavigationBarStylesAndroid');var _ReactNavigatorNavigationBarStylesAndroid2=_interopRequireDefault(_ReactNavigatorNavigationBarStylesAndroid);
var _ReactNavigatorNavigationBarStylesIOS=require('./NavigatorNavigationBarStylesIOS');var _ReactNavigatorNavigationBarStylesIOS2=_interopRequireDefault(_ReactNavigatorNavigationBarStylesIOS);
var _ReactPlatform=require('../Platform/Platform.web');var _ReactPlatform2=_interopRequireDefault(_ReactPlatform);
var _ReactStyleSheet=require('../StyleSheet/StyleSheet.web');var _ReactStyleSheet2=_interopRequireDefault(_ReactStyleSheet);
var _ReactView=require('../View/View.web');var _ReactView2=_interopRequireDefault(_ReactView);
var _immutable=require('immutable');
var _invariant=require('fbjs/lib/invariant');var _invariant2=_interopRequireDefault(_invariant);
var _autobindDecorator=require('autobind-decorator');var _autobindDecorator2=_interopRequireDefault(_autobindDecorator);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}

var Interpolators=_ReactNavigatorBreadcrumbNavigationBarStyles2.default.Interpolators;
var NavigatorNavigationBarStyles=_ReactPlatform2.default.OS==='android'?_ReactNavigatorNavigationBarStylesAndroid2.default:_ReactNavigatorNavigationBarStylesIOS2.default;





var CRUMB_PROPS=Interpolators.map(function(){return{style:{}};});
var ICON_PROPS=Interpolators.map(function(){return{style:{}};});
var SEPARATOR_PROPS=Interpolators.map(function(){return{style:{}};});
var TITLE_PROPS=Interpolators.map(function(){return{style:{}};});
var RIGHT_BUTTON_PROPS=Interpolators.map(function(){return{style:{}};});


var navStatePresentedIndex=function navStatePresentedIndex(navState){
if(navState.presentedIndex!==undefined){
return navState.presentedIndex;
}

return navState.observedTopOfStack;
};









var initStyle=function initStyle(index,presentedIndex){
return index===presentedIndex?_ReactNavigatorBreadcrumbNavigationBarStyles2.default.Center[index]:
index<presentedIndex?_ReactNavigatorBreadcrumbNavigationBarStyles2.default.Left[index]:
_ReactNavigatorBreadcrumbNavigationBarStyles2.default.Right[index];
};var

NavigatorBreadcrumbNavigationBar=function(_Component){_inherits(NavigatorBreadcrumbNavigationBar,_Component);function NavigatorBreadcrumbNavigationBar(){var _ref;var _temp,_this,_ret;_classCallCheck(this,NavigatorBreadcrumbNavigationBar);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}return _ret=(_temp=(_this=_possibleConstructorReturn(this,(_ref=NavigatorBreadcrumbNavigationBar.__proto__||Object.getPrototypeOf(NavigatorBreadcrumbNavigationBar)).call.apply(_ref,[this].concat(args))),_this),_this.
























































































































_crumbRefs={},_this.
_iconRefs={},_this.
_separatorRefs={},_this.
_titleRefs={},_this.
_rightRefs={},_temp),_possibleConstructorReturn(_this,_ret);}_createClass(NavigatorBreadcrumbNavigationBar,[{key:'_updateIndexProgress',value:function _updateIndexProgress(progress,index,fromIndex,toIndex){var amount=toIndex>fromIndex?progress:1-progress;var oldDistToCenter=index-fromIndex;var newDistToCenter=index-toIndex;var interpolate;(0,_invariant2.default)(Interpolators[index],'Cannot find breadcrumb interpolators for '+index);if(oldDistToCenter>0&&newDistToCenter===0||newDistToCenter>0&&oldDistToCenter===0){interpolate=Interpolators[index].RightToCenter;}else if(oldDistToCenter<0&&newDistToCenter===0||newDistToCenter<0&&oldDistToCenter===0){interpolate=Interpolators[index].CenterToLeft;}else if(oldDistToCenter===newDistToCenter){interpolate=Interpolators[index].RightToCenter;}else{interpolate=Interpolators[index].RightToLeft;}if(interpolate.Crumb(CRUMB_PROPS[index].style,amount)){this._setPropsIfExists(this._crumbRefs[index],CRUMB_PROPS[index]);}if(interpolate.Icon(ICON_PROPS[index].style,amount)){this._setPropsIfExists(this._iconRefs[index],ICON_PROPS[index]);}if(interpolate.Separator(SEPARATOR_PROPS[index].style,amount)){this._setPropsIfExists(this._separatorRefs[index],SEPARATOR_PROPS[index]);}if(interpolate.Title(TITLE_PROPS[index].style,amount)){this._setPropsIfExists(this._titleRefs[index],TITLE_PROPS[index]);}var right=this._rightRefs[index];if(right&&interpolate.RightItem(RIGHT_BUTTON_PROPS[index].style,amount)){right.setNativeProps(RIGHT_BUTTON_PROPS[index]);}}},{key:'updateProgress',value:function updateProgress(progress,fromIndex,toIndex){var max=Math.max(fromIndex,toIndex);var min=Math.min(fromIndex,toIndex);for(var index=min;index<=max;index++){this._updateIndexProgress(progress,index,fromIndex,toIndex);}}},{key:'onAnimationStart',value:function onAnimationStart(fromIndex,toIndex){var max=Math.max(fromIndex,toIndex);var min=Math.min(fromIndex,toIndex);for(var index=min;index<=max;index++){this._setRenderViewsToHardwareTextureAndroid(index,true);}}},{key:'onAnimationEnd',value:function onAnimationEnd(){var max=this.props.navState.routeStack.length-1;for(var index=0;index<=max;index++){this._setRenderViewsToHardwareTextureAndroid(index,false);}}},{key:'_setRenderViewsToHardwareTextureAndroid',value:function _setRenderViewsToHardwareTextureAndroid(index,renderToHardwareTexture){var props={renderToHardwareTextureAndroid:renderToHardwareTexture};this._setPropsIfExists(this._iconRefs[index],props);this._setPropsIfExists(this._separatorRefs[index],props);this._setPropsIfExists(this._titleRefs[index],props);this._setPropsIfExists(this._rightRefs[index],props);}},{key:'componentWillMount',value:function componentWillMount(){this._descriptors={crumb:new _immutable.Map(),title:new _immutable.Map(),right:new _immutable.Map()};}},{key:'render',value:function render(){var navState=this.props.navState;var icons=navState&&navState.routeStack.map(this._getBreadcrumb);var titles=navState.routeStack.map(this._getTitle);var buttons=navState.routeStack.map(this._getRightButton);return _react2.default.createElement(_ReactView2.default,{style:[styles.breadCrumbContainer,this.props.style]},titles,icons,buttons);}},{key:'_captureCrumbRef',value:function _captureCrumbRef(

index){var _this2=this;
return function(ref){
_this2._crumbRefs[index]=ref;
};
}},{key:'_captureIconRef',value:function _captureIconRef(
index){var _this3=this;
return function(ref){
_this3._iconRefs[index]=ref;
};
}},{key:'_captureSeparatorRef',value:function _captureSeparatorRef(
index){var _this4=this;
return function(ref){
_this4._separatorRefs[index]=ref;
};
}},{key:'_captureTitleRef',value:function _captureTitleRef(
index){var _this5=this;
return function(ref){
_this5._titleRefs[index]=ref;
};
}},{key:'_captureRightRef',value:function _captureRightRef(
index){var _this6=this;
return function(ref){
_this6._rightRefs[index]=ref;
};
}},{key:'_getBreadcrumb',value:function _getBreadcrumb(

route,index){
if(this._descriptors.crumb.has(route)){
return this._descriptors.crumb.get(route);
}

var navBarRouteMapper=this.props.routeMapper;
var firstStyles=initStyle(index,navStatePresentedIndex(this.props.navState));

var breadcrumbDescriptor=
_react2.default.createElement(_ReactView2.default,{ref:this._captureCrumbRef(index),style:firstStyles.Crumb},
_react2.default.createElement(_ReactView2.default,{ref:this._captureIconRef(index),style:firstStyles.Icon},
navBarRouteMapper.iconForRoute(route,this.props.navigator)),

_react2.default.createElement(_ReactView2.default,{ref:this._captureSeparatorRef(index),style:firstStyles.Separator},
navBarRouteMapper.separatorForRoute(route,this.props.navigator)));




this._descriptors.crumb=this._descriptors.crumb.set(route,breadcrumbDescriptor);
return breadcrumbDescriptor;
}},{key:'_getTitle',value:function _getTitle(

route,index){
if(this._descriptors.title.has(route)){
return this._descriptors.title.get(route);
}

var titleContent=this.props.routeMapper.titleContentForRoute(
this.props.navState.routeStack[index],
this.props.navigator);

var firstStyles=initStyle(index,navStatePresentedIndex(this.props.navState));

var titleDescriptor=
_react2.default.createElement(_ReactView2.default,{ref:this._captureTitleRef(index),style:firstStyles.Title},
titleContent);


this._descriptors.title=this._descriptors.title.set(route,titleDescriptor);
return titleDescriptor;
}},{key:'_getRightButton',value:function _getRightButton(

route,index){
if(this._descriptors.right.has(route)){
return this._descriptors.right.get(route);
}
var rightContent=this.props.routeMapper.rightContentForRoute(
this.props.navState.routeStack[index],
this.props.navigator);

if(!rightContent){
this._descriptors.right=this._descriptors.right.set(route,null);
return null;
}
var firstStyles=initStyle(index,navStatePresentedIndex(this.props.navState));
var rightButtonDescriptor=
_react2.default.createElement(_ReactView2.default,{ref:this._captureRightRef(index),style:firstStyles.RightItem},
rightContent);


this._descriptors.right=this._descriptors.right.set(route,rightButtonDescriptor);
return rightButtonDescriptor;
}},{key:'_setPropsIfExists',value:function _setPropsIfExists(

ref,props){
ref&&ref.setNativeProps(props);
}}]);return NavigatorBreadcrumbNavigationBar;}(_react.Component);NavigatorBreadcrumbNavigationBar.propTypes={navigator:_propTypes2.default.shape({push:_propTypes2.default.func,pop:_propTypes2.default.func,replace:_propTypes2.default.func,popToRoute:_propTypes2.default.func,popToTop:_propTypes2.default.func}),routeMapper:_propTypes2.default.shape({rightContentForRoute:_propTypes2.default.func,titleContentForRoute:_propTypes2.default.func,iconForRoute:_propTypes2.default.func}),navState:_propTypes2.default.shape({routeStack:_propTypes2.default.arrayOf(_propTypes2.default.object),presentedIndex:_propTypes2.default.number}),style:_ReactView2.default.propTypes.style};NavigatorBreadcrumbNavigationBar.statics={Styles:_ReactNavigatorBreadcrumbNavigationBarStyles2.default};

;

var styles=_ReactStyleSheet2.default.create({
breadCrumbContainer:{
overflow:'hidden',
position:'absolute',
height:NavigatorNavigationBarStyles.General.TotalNavHeight,
top:0,
left:0,
right:0}});



(0,_autobindDecorator2.default)(NavigatorBreadcrumbNavigationBar);

module.exports=NavigatorBreadcrumbNavigationBar;