
const tgl = document.getElementById('cb2');
const body = document.body;
const logo = document.getElementById('logo');

let darkmode = localStorage.getItem('darkmode');

checkLocalStorage();

tgl.onchange = function() {
    darkmode = localStorage.getItem('')
    if(body.classList.contains('light')){
        darkToggle();
        return;    
    } 
    if(body.classList.contains('dark')){
        lightToggle();
        return;    
    } 

};

function checkLocalStorage() {
    if (darkmode === 'on') {
        //set theme to dark
        darkToggle();
        tgl.checked = true;
    } else {
        //set theme to light
        lightToggle();
        tgl.checked = false;
    }
}

function lightToggle() {
    body.classList.replace('dark', 'light');
    logo.src ='/img/logo.svg';
    localStorage.setItem('darkmode', 'off');
}

function darkToggle() {
    body.classList.replace('light', 'dark');
    logo.src ='/img/logo-white.svg';
    localStorage.setItem('darkmode', 'on');
}
