































'use strict';var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();

var _react=require('react');var _react2=_interopRequireDefault(_react);
var _ReactView=require('../View/View.web');var _ReactView2=_interopRequireDefault(_ReactView);
var _ReactVirtualizedList=require('./VirtualizedList');var _ReactVirtualizedList2=_interopRequireDefault(_ReactVirtualizedList);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}

var invariant=require('fbjs/lib/invariant');
var warning=require('fbjs/lib/warning');var

































































































VirtualizedSectionList=function(_React$PureComponent){_inherits(VirtualizedSectionList,_React$PureComponent);_createClass(VirtualizedSectionList,[{key:'_subExtractor',value:function _subExtractor(

















index)




{
var itemIndex=index;
var defaultKeyExtractor=this.props.keyExtractor;
for(var ii=0;ii<this.props.sections.length;ii++){
var _section=this.props.sections[ii];
var _key=_section.key;
warning(
_key!=null,
'VirtualizedSectionList: A `section` you supplied is missing the `key` property.');

itemIndex-=1;
if(itemIndex>=_section.data.length){
itemIndex-=_section.data.length;
}else if(itemIndex===-1){
return{section:_section,key:_key,index:null};
}else{
var _keyExtractor=_section.keyExtractor||defaultKeyExtractor;
return{
section:_section,
key:_key+':'+_keyExtractor(_section.data[itemIndex],itemIndex),
index:itemIndex};

}
}
}},{key:'_getSeparatorComponent',value:function _getSeparatorComponent(





















































index,info){
info=info||this._subExtractor(index);
if(!info){
return null;
}
var SeparatorComponent=info.section.SeparatorComponent||this.props.ItemSeparatorComponent;var
SectionSeparatorComponent=this.props.SectionSeparatorComponent;
var isLastItemInList=index===this.state.childProps.getItemCount()-1;
var isLastItemInSection=info.index===info.section.data.length-1;
if(SectionSeparatorComponent&&isLastItemInSection&&!isLastItemInList){
return SectionSeparatorComponent;
}
if(SeparatorComponent&&!isLastItemInSection&&!isLastItemInList){
return SeparatorComponent;
}
return null;
}},{key:'_computeState',value:function _computeState(









props){
var itemCount=props.sections.reduce(function(v,section){return v+section.data.length+1;},0);
return{
childProps:_extends({},
props,{
renderItem:this._renderItem,
ItemSeparatorComponent:undefined,
data:props.sections,
getItemCount:function getItemCount(){return itemCount;},
getItem:getItem,
isItemSticky:this._isItemSticky,
keyExtractor:this._keyExtractor,
onViewableItemsChanged:
props.onViewableItemsChanged?this._onViewableItemsChanged:undefined,
shouldItemUpdate:this._shouldItemUpdate})};


}}]);

function VirtualizedSectionList(props,context){_classCallCheck(this,VirtualizedSectionList);var _this=_possibleConstructorReturn(this,(VirtualizedSectionList.__proto__||Object.getPrototypeOf(VirtualizedSectionList)).call(this,
props,context));_this._keyExtractor=function(item,index){var info=_this._subExtractor(index);return info&&info.key||String(index);};_this._convertViewable=function(viewable){invariant(viewable.index!=null,'Received a broken ViewToken');var info=_this._subExtractor(viewable.index);if(!info){return null;}var keyExtractor=info.section.keyExtractor||_this.props.keyExtractor;return _extends({},viewable,{index:info.index,key:keyExtractor(viewable.item,info.index),section:info.section});};_this._onViewableItemsChanged=function(_ref){var viewableItems=_ref.viewableItems,changed=_ref.changed;if(_this.props.onViewableItemsChanged){_this.props.onViewableItemsChanged({viewableItems:viewableItems.map(_this._convertViewable,_this).filter(Boolean),changed:changed.map(_this._convertViewable,_this).filter(Boolean)});}};_this._isItemSticky=function(item,index){var info=_this._subExtractor(index);return info&&info.index==null;};_this._renderItem=function(_ref2){var item=_ref2.item,index=_ref2.index;var info=_this._subExtractor(index);if(!info){return null;}else if(info.index==null){var _renderSectionHeader=_this.props.renderSectionHeader;return _renderSectionHeader?_renderSectionHeader({section:info.section}):null;}else{var _renderItem=info.section.renderItem||_this.props.renderItem;var _SeparatorComponent=_this._getSeparatorComponent(index,info);invariant(_renderItem,'no renderItem!');return _react2.default.createElement(_ReactView2.default,null,_renderItem({item:item,index:info.index||0}),_SeparatorComponent&&_react2.default.createElement(_SeparatorComponent,null));}};_this._shouldItemUpdate=function(prev,next){var shouldItemUpdate=_this.props.shouldItemUpdate;if(!shouldItemUpdate||shouldItemUpdate(prev,next)){return true;}return _this._getSeparatorComponent(prev.index)!==_this._getSeparatorComponent(next.index);};
warning(
!props.stickySectionHeadersEnabled,
'VirtualizedSectionList: Sticky headers only supported with legacyImplementation for now.');

_this.state=_this._computeState(props);return _this;
}_createClass(VirtualizedSectionList,[{key:'componentWillReceiveProps',value:function componentWillReceiveProps(

nextProps){
this.setState(this._computeState(nextProps));
}},{key:'render',value:function render()

{
return _react2.default.createElement(_ReactVirtualizedList2.default,this.state.childProps);
}}]);return VirtualizedSectionList;}(_react2.default.PureComponent);VirtualizedSectionList.defaultProps=_extends({},_ReactVirtualizedList2.default.defaultProps,{data:[]});


function getItem(sections,index){
if(!sections){
return null;
}
var itemIdx=index-1;
for(var ii=0;ii<sections.length;ii++){
if(itemIdx===-1){
return sections[ii];
}else if(itemIdx<sections[ii].data.length){
return sections[ii].data[itemIdx];
}else{
itemIdx-=sections[ii].data.length+1;
}
}
return null;
}

module.exports=VirtualizedSectionList;