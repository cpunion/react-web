





'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();

var _react=require('react');var _react2=_interopRequireDefault(_react);
var _propTypes=require('prop-types');var _propTypes2=_interopRequireDefault(_propTypes);
var _ReactView=require('../View/View.web');var _ReactView2=_interopRequireDefault(_ReactView);
var _TabBarItem=require('./TabBarItem.web');var _TabBarItem2=_interopRequireDefault(_TabBarItem);
var _TabBarContents=require('./TabBarContents.web');var _TabBarContents2=_interopRequireDefault(_TabBarContents);
var _objectAssign=require('object-assign');var _objectAssign2=_interopRequireDefault(_objectAssign);
var _ReactStyleSheet=require('../StyleSheet/StyleSheet.web');var _ReactStyleSheet2=_interopRequireDefault(_ReactStyleSheet);
var _autobindDecorator=require('autobind-decorator');var _autobindDecorator2=_interopRequireDefault(_autobindDecorator);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var

TabBar=function(_Component){_inherits(TabBar,_Component);function TabBar(){var _ref;var _temp,_this,_ret;_classCallCheck(this,TabBar);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}return _ret=(_temp=(_this=_possibleConstructorReturn(this,(_ref=TabBar.__proto__||Object.getPrototypeOf(TabBar)).call.apply(_ref,[this].concat(args))),_this),_this.
state={
selectedIndex:0},_temp),_possibleConstructorReturn(_this,_ret);}_createClass(TabBar,[{key:'getStyles',value:function getStyles()


















{
return _ReactStyleSheet2.default.create({
container:{
width:'100%',
height:this.props.clientHeight||document.documentElement.clientHeight,
position:'relative',
overflow:'hidden'},

content:{
width:'100%',
height:'100%'},

bar:{
width:'100%',
position:'absolute',
padding:0,
margin:0,
listStyle:'none',
left:0,
bottom:0,

backgroundColor:'rgba(250,250,250,.96)',
display:'table'}});


}},{key:'handleTouchTap',value:function handleTouchTap(

index){
this.setState({
selectedIndex:index});

}},{key:'render',value:function render()

{
var self=this;
var styles=self.getStyles();
var barStyle=(0,_objectAssign2.default)(styles.bar,this.props.style||{},this.props.barTintColor?{
backgroundColor:this.props.barTintColor}:
{});

var tabContent=[];

var tabs=_react2.default.Children.map(this.props.children,function(tab,
index){
if(tab.type.displayName==='TabBarItem'){
if(tab.props.children){
tabContent.push(_react2.default.createElement(_TabBarContents2.default,{
key:index,
selected:self.state.selectedIndex===index},
tab.props.children));
}else{
tabContent.push(undefined);
}

return _react2.default.cloneElement(tab,{
index:index,
selected:self.state.selectedIndex===index,
selectedColor:self.props.tintColor,
handleTouchTap:self.handleTouchTap});


}else{
var type=tab.type.displayName||tab.type;
throw'Tabbar only accepts TabBar.Item Components as children. Found '+type+' as child number '+(index+1)+' of Tabbar';
}
});

return(
_react2.default.createElement(_ReactView2.default,{style:styles.container},
_react2.default.createElement(_ReactView2.default,{style:styles.content},tabContent),
_react2.default.createElement('ul',{style:barStyle},
tabs)));



}}]);return TabBar;}(_react.Component);TabBar.Item=_TabBarItem2.default;TabBar.propTypes={style:_propTypes2.default.object,tintColor:_propTypes2.default.string,barTintColor:_propTypes2.default.string,clientHeight:_propTypes2.default.number};


TabBar.isReactNativeComponent=true;

(0,_autobindDecorator2.default)(TabBar);exports.default=

TabBar;