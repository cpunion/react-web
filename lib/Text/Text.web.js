







'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();

var _react=require('react');var _react2=_interopRequireDefault(_react);
var _propTypes=require('prop-types');var _propTypes2=_interopRequireDefault(_propTypes);
var _reactMixin=require('react-mixin');var _reactMixin2=_interopRequireDefault(_reactMixin);
var _ReactTouchable=require('../Touchable/Touchable');
var _ReactLayoutMixin=require('../Utilties/LayoutMixin');
var _NativeMethodsMixin=require('../Utilties/NativeMethodsMixin.web');
var _autobindDecorator=require('autobind-decorator');var _autobindDecorator2=_interopRequireDefault(_autobindDecorator);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var


































Text=function(_Component){_inherits(Text,_Component);






































function Text(props){_classCallCheck(this,Text);var _this=_possibleConstructorReturn(this,(Text.__proto__||Object.getPrototypeOf(Text)).call(this,
props));
_this.state=_extends({},
_this.touchableGetInitialState(),{
isHighlighted:false});return _this;

}_createClass(Text,[{key:'onStartShouldSetResponder',value:function onStartShouldSetResponder()









{
var shouldSetFromProps=this.props.onStartShouldSetResponder&&
this.props.onStartShouldSetResponder();
return shouldSetFromProps||!!this.props.onPress;
}},{key:'handleResponderTerminationRequest',value:function handleResponderTerminationRequest()




{


var allowTermination=this.touchableHandleResponderTerminationRequest();
if(allowTermination&&this.props.onResponderTerminationRequest){
allowTermination=this.props.onResponderTerminationRequest();
}
return allowTermination;
}},{key:'handleResponderGrant',value:function handleResponderGrant(

e,dispatchID){
this.touchableHandleResponderGrant(e,dispatchID);
this.props.onResponderGrant&&
this.props.onResponderGrant.apply(this,arguments);
}},{key:'handleResponderMove',value:function handleResponderMove(

e){
this.touchableHandleResponderMove(e);
this.props.onResponderMove&&
this.props.onResponderMove.apply(this,arguments);
}},{key:'handleResponderRelease',value:function handleResponderRelease(

e){
this.touchableHandleResponderRelease(e);
this.props.onResponderRelease&&
this.props.onResponderRelease.apply(this,arguments);
}},{key:'handleResponderTerminate',value:function handleResponderTerminate(

e){
this.touchableHandleResponderTerminate(e);
this.props.onResponderTerminate&&
this.props.onResponderTerminate.apply(this,arguments);
}},{key:'touchableHandleActivePressIn',value:function touchableHandleActivePressIn()

{
if(this.props.suppressHighlighting||!this.props.onPress){
return;
}
this.setState({
isHighlighted:true});

}},{key:'touchableHandleActivePressOut',value:function touchableHandleActivePressOut()

{
if(this.props.suppressHighlighting||!this.props.onPress){
return;
}
this.setState({
isHighlighted:false});

}},{key:'touchableHandlePress',value:function touchableHandlePress()

{
this.props.onPress&&this.props.onPress();
}},{key:'touchableGetPressRectOffset',value:function touchableGetPressRectOffset()

{
return PRESS_RECT_OFFSET;
}},{key:'getChildContext',value:function getChildContext()

{
return{isInAParentText:true};
}},{key:'render',value:function render()









{
var props=_extends({},
this.props,{
'aria-label':this.props.accessibilityLabel});


if(props.accessible!==false){
props.accessible=true;
}
props.isHighlighted=this.state.isHighlighted;
props.onStartShouldSetResponder=this.onStartShouldSetResponder;
props.onResponderTerminationRequest=
this.handleResponderTerminationRequest;
props.onResponderGrant=this.handleResponderGrant;
props.onResponderMove=this.handleResponderMove;
props.onResponderRelease=this.handleResponderRelease;
props.onResponderTerminate=this.handleResponderTerminate;var


numberOfLines=

props.numberOfLines,style=props.style;

style=_extends({},props.style);

if(typeof style.lineHeight=='number'){
style.lineHeight+='px';
}


var lineHeight=style.lineHeight||(style.fontSize||16)*1.2;
if(typeof lineHeight=='number'){
lineHeight+='px';
}
style.lineHeight=lineHeight;

if(style.textDecorationLine){
style.textDecoration=style.textDecorationLine;
}

if(!props.children){

}

return(
_react2.default.createElement('span',_extends({},props,{
style:_extends(
{
display:this.context.isInAParentText?'inline':'inline-block',
margin:0,
padding:0,
wordWrap:'break-word',
fontFamily:'Helvetica Neue, STHeiTi, sans-serif'},

style,
numberOfLines&&{
overflow:'hidden',
textOverflow:'ellipsis',
wordWrap:'break-word',
display:'-webkit-box',
WebkitLineClamp:numberOfLines,
WebkitBoxOrient:'vertical',
maxHeight:parseFloat(lineHeight)*numberOfLines})})));



}}]);return Text;}(_react.Component);Text.propTypes={numberOfLines:_propTypes2.default.number,onLayout:_propTypes2.default.func,onPress:_propTypes2.default.func,suppressHighlighting:_propTypes2.default.bool,testID:_propTypes2.default.string,allowFontScaling:_propTypes2.default.bool};Text.defaultProps={allowFontScaling:true};Text.contextTypes={isInAParentText:_propTypes2.default.bool};Text.childContextTypes={isInAParentText:_propTypes2.default.bool};









var PRESS_RECT_OFFSET={top:20,left:20,right:20,bottom:30};

_reactMixin2.default.onClass(Text,_ReactLayoutMixin.Mixin);
_reactMixin2.default.onClass(Text,_ReactTouchable.Mixin);
_reactMixin2.default.onClass(Text,_NativeMethodsMixin.Mixin);
(0,_autobindDecorator2.default)(Text);

Text.isReactNativeComponent=true;exports.default=

Text;