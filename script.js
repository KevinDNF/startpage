'use strict'


const search_engine = "https://www.duckduckgo.com";
const websites = {
  "facebook" : "https://www.facebook.com",
  "instagram" : "https://www.instagram.com",
  "youtube" : "https://www.youtube.com",
  "twitter" : "https://www.twitter.com",
  "github" : "https://www.github.com",
  "gmail" : "https://www.gmail.com",
  "protonmail" : "https://www.protonmail.com",
  "portaisociety" : "https://www.portaisociety.com",
  "kevindnf" : "https://kevindnf.com",
  "drive" : "https://www.drive.google.com",
  "teamdrive" : "https://www.drive.google.com",
  "drive.google" : "https://www.drive.google.com",
  "mega" : "https://www.mega.nz",
  "icloud" : "https://www.icloud.com",
  "papes" : "https://www.wallhaven.cc",
  "unixporn" : "https://www.reddit.com/r/unixporn",
  "startpages" : "https://www.reddit.com/r/startpages",
  "ekkomains" : "https://www.reddit.com/r/ekkomains",
  "u.gg" : "https://u.gg",
  "localhost" : "//localhost:8080",
  "moodle" : "https://moodle.port.ac.uk",
  "myport" : "https://myport.ac.uk",
};
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
