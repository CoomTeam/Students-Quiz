// const tgl = document.getElementById('cb2');
const body = document.body;
const logo = document.getElementById('logo');
const toggleImage = document.getElementById("darkmodeIcon");

let darkmode = localStorage.getItem('darkmode');

checkLocalStorage();

toggleImage.onclick = function () {
	darkmode = localStorage.getItem('');
	if(body.classList.contains('light')){
		toggleImage.src = "img/sun.png";
		darkToggle();
		return;
	}
	if(body.classList.contains('dark')){
		toggleImage.src = "img/moon.png";
		lightToggle();
		return;
	}
}

function checkLocalStorage () {
	// console.log("clicked");
	if (darkmode === 'on') {
        darkToggle();
        toggleImage.src = "img/sun.png"
    } else {
        lightToggle();
        toggleImage.src = "img/moon.png"
    }
}
// tgl.onchange = function() {
//     darkmode = localStorage.getItem('')
//     if(body.classList.contains('light')){
//         darkToggle();
//         return;
//     }
//     if(body.classList.contains('dark')){
//         lightToggle();
//         return;
//     }
//
// };

// function checkLocalStorage() {
//     if (darkmode === 'on') {
//         //set theme to dark
//         darkToggle();
//         tgl.checked = true;
//     } else {
//         //set theme to light
//         lightToggle();
//         tgl.checked = false;
//     }
// }



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
