'use strict'


const input = window.search;
const inputbox = window.searchbox;
let autoValue = "";
let computedOutput = "";

document.addEventListener("load", (e) => {
  input.focus();
})

document.addEventListener("click", (e) => {
  input.focus();
})

document.addEventListener("keydown", (e)=>{

  const value = input.value;
  switch(value.charAt(0)){
    case "!":
      if (e.key === "Enter"){
        addExpression(value);
      }
      break;

    default:
      if (e.key === "Enter"){
        handleSubmit();
      }else if (e.key === "Tab"){
        e.preventDefault();
        if (autoValue !== ""){
          handleSubmit();
        }
      }
      input.focus();
      break;
  }
})

input.addEventListener("keyup", (e) => {
  const value = input.value;

  switch(value.charAt(0)){
    case "!":
       const out = handleExpression(value);
       document.documentElement.style.setProperty("--outputContent",
        `'${out} ${computedOutput}'`);
       return
      break;

    default:
      autoValue = autocomplete(value);
      document.documentElement.style.setProperty("--autocompleteContent", 
        `'${autoValue.toUpperCase()}'`);
  }
})

function handleSubmit(){
  if (autoValue !== ""){
    window.location.replace(websites[autoValue]);
  }else{
    //not found so search the web
    const redirect = new URL(search_engine);
    redirect.search = `q=${input.value}`;
    window.location.replace(redirect);
  }
}

function autocomplete(value){
  if (value !== ""){
    for (const website in websites){
      if (website.startsWith(value.toLowerCase())){
        return website
      }
    }
  }
  return ""
}

//not safe but... its your own machine, do whatever you feel like doing.
function handleExpression(value){
  try{
    const out = eval(value.substring(1));
    if(out !== undefined){
      return out
    }
  }catch(e){}
  return ""
}

function addExpression(value){
  const out = handleExpression(value);
  if (out !== undefined && out !== ""){
    computedOutput = `\\A ${value.substring(1)} = ${out} ${computedOutput}`
  }
}
