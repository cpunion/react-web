







'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();

var _react=require('react');var _react2=_interopRequireDefault(_react);
var _propTypes=require('prop-types');var _propTypes2=_interopRequireDefault(_propTypes);
var _ReactStyleSheet=require('../StyleSheet/StyleSheet.web');var _ReactStyleSheet2=_interopRequireDefault(_ReactStyleSheet);
var _reactMixin=require('react-mixin');var _reactMixin2=_interopRequireDefault(_reactMixin);
var _ReactLayoutMixin=require('../Utilties/LayoutMixin');
var _NativeMethodsMixin=require('../Utilties/NativeMethodsMixin.web');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var

View=function(_Component){_inherits(View,_Component);function View(){_classCallCheck(this,View);return _possibleConstructorReturn(this,(View.__proto__||Object.getPrototypeOf(View)).apply(this,arguments));}_createClass(View,[{key:'render',value:function render()













































































{var

pointerEvents=
this.props.pointerEvents;
var mergedProps=this.props;
if(pointerEvents){
mergedProps=_extends({},this.props,{style:_extends({},mergedProps.style,{pointerEvents:pointerEvents})});
}

return(
_react2.default.createElement('div',_extends({className:_ReactStyleSheet2.default.viewClassName},mergedProps,{'aria-label':mergedProps.accessibilityLabel}),
this.props.children));


}}]);return View;}(_react.Component);View.propTypes={testID:_propTypes2.default.string,onMoveShouldSetResponder:_propTypes2.default.func,onResponderGrant:_propTypes2.default.func,onResponderMove:_propTypes2.default.func,onResponderReject:_propTypes2.default.func,onResponderRelease:_propTypes2.default.func,onResponderTerminate:_propTypes2.default.func,onResponderTerminationRequest:_propTypes2.default.func,onStartShouldSetResponder:_propTypes2.default.func,onStartShouldSetResponderCapture:_propTypes2.default.func,onLayout:_propTypes2.default.func,pointerEvents:_propTypes2.default.oneOf(['box-none','none','box-only','auto']),style:_propTypes2.default.oneOfType([_propTypes2.default.object,_propTypes2.default.array])};


_reactMixin2.default.onClass(View,_ReactLayoutMixin.Mixin);
_reactMixin2.default.onClass(View,_NativeMethodsMixin.Mixin);

View.isReactNativeComponent=true;exports.default=

View;