'use strict'


const input = window.search;
const inputbox = window.searchbox;
let autoValue = "";

document.addEventListener("load", (e) => {
  input.focus();
})

document.addEventListener("click", (e) => {
  input.focus();
})

document.addEventListener("keydown", (e)=>{
  if (e.key === "Enter"){
    handleSubmit();
  }else if (e.key === "Tab"){
    e.preventDefault();
    if (autoValue !== ""){
      handleSubmit();
    }
  }
  input.focus();
})

input.addEventListener("keyup", (e) => {
  autoValue = autocomplete(input.value);
  document.documentElement.style.setProperty("--autocompleteContent", `'${autoValue.toUpperCase()}'`);
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
