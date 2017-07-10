














'use strict';

var TextInputState={





currentlyFocusedField:function currentlyFocusedField(){
var focused=document.activeElement;
if(!focused||focused==document.body){
return null;
}else if(document.querySelector){
focused=document.querySelector(":focus");
}

if(!focused){
return null;
}

if(focused.tagName==='INPUT'&&focused.type==='text'||
focused.tagName==='TEXTAREA'){
return focused;
}
return null;
},






focusTextInput:function focusTextInput(textFieldID){
if(textFieldID){
textFieldID.focus();
}
},






blurTextInput:function blurTextInput(textFieldID){
if(textFieldID){
textFieldID.blur();
}
}};


module.exports=TextInputState;