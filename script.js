const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
const body = document.querySelector('body');
const inputbox = document.querySelectorAll('input');
const tabicon = document.getElementById('favicon');

if(!isDarkMode){
    body.classList.add("light-theme");
    tabicon.href = 'light.png';
    inputbox.forEach(input => {
        input.style.border = "1px solid black";
    });
}else{
    body.classList.add("dark-theme");
     tabicon.href = 'dark.png';
}