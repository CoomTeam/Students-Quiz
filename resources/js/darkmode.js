console.log('i work');

const tgl = document.getElementById('cb2');
const body = document.body;

const theme = localStorage.getItem('theme');


tgl.onchange = function() {
    if(body.classList.contains('light')){
        
        body.classList.replace('light', 'dark');    

        return;    
    } 

    if(body.classList.contains('dark')){

        body.classList.replace('dark', 'light');        
        
        return;    
    } 

};
