const body = document.body;
const logo = document.getElementById('logo');
const toggleImage = document.getElementById('darkmodeIcon');

toggleImage.addEventListener('click', () => {
	if (body.classList.contains('light')) {
		setDarkMode();
		return;
	}

	if (body.classList.contains('dark')) {
		setLightMode();
		return;
	}
});

function checkLocalStorage() {
	const mode = localStorage.getItem('darkmode');

	if (mode === 'on') {
        setDarkMode();
    } else {
        setLightMode();
    }
}

function setLightMode() {
	localStorage.setItem('darkmode', 'off');
    body.classList.replace('dark', 'light');
    logo.src ='/img/logo.svg';
	toggleImage.src = '/img/moon.png'
}

function setDarkMode() {
    localStorage.setItem('darkmode', 'on');
    body.classList.replace('light', 'dark');
    logo.src ='/img/logo-white.svg';
	toggleImage.src = '/img/sun.png'
}

checkLocalStorage();
