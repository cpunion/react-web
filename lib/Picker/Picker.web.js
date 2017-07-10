





'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();

var _react=require('react');var _react2=_interopRequireDefault(_react);
var _propTypes=require('prop-types');var _propTypes2=_interopRequireDefault(_propTypes);
var _autobindDecorator=require('autobind-decorator');var _autobindDecorator2=_interopRequireDefault(_autobindDecorator);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var

Picker=function(_Component){_inherits(Picker,_Component);function Picker(){var _ref;var _temp,_this,_ret;_classCallCheck(this,Picker);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}return _ret=(_temp=(_this=_possibleConstructorReturn(this,(_ref=Picker.__proto__||Object.getPrototypeOf(Picker)).call.apply(_ref,[this].concat(args))),_this),_this.


















_captureRef=function(ref){
_this._ref=ref;
},_temp),_possibleConstructorReturn(_this,_ret);}_createClass(Picker,[{key:'_onChange',value:function _onChange(event){event.nativeEvent.newValue=this._ref.value;if(this.props.onChange){this.props.onChange(event);}if(this.props.onValueChange){this.props.onValueChange(event.nativeEvent.newValue);}}},{key:'render',value:function render()

{
return(
_react2.default.createElement('select',{
'aria-label':this.props.accessibilityLabel,
ref:this._captureRef,
value:this.props.selectedValue,
style:_extends({
margin:10,
color:'inherit',
font:'inherit'},
this.props.style),
onChange:this._onChange},

this.props.children));


}}]);return Picker;}(_react.Component);Picker.propTypes={onValueChange:_propTypes2.default.func,selectedValue:_propTypes2.default.any};
;var

Item=function(_Component2){_inherits(Item,_Component2);function Item(){_classCallCheck(this,Item);return _possibleConstructorReturn(this,(Item.__proto__||Object.getPrototypeOf(Item)).apply(this,arguments));}_createClass(Item,[{key:'render',value:function render()





{
return _react2.default.createElement('option',{value:this.props.value},this.props.label);
}}]);return Item;}(_react.Component);Item.propTypes={value:_propTypes2.default.any,label:_propTypes2.default.string};


Picker.Item=Item;

(0,_autobindDecorator2.default)(Picker);

Picker.isReactNativeComponent=true;exports.default=

Picker;