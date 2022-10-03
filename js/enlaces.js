/* const act1=document.querySelector("#act1");
const act2=document.querySelector("#act2");
const act3=document.querySelector("#act3");
const act4=document.querySelector("#act4");

// Mandar cada pagina al div main de la plataforma
act1.onclick = function() {
    $('#plataforma').load('act1.html');
}
act2.onclick = function() {
    $('#plataforma').load('act2.html');
}
act3.onclick = function() {
    $('#plataforma').load('act3.html');
}
act4.onclick = function() {
    $('#plataforma').load('act4.html');
} */

// Automatización de los enlaces
let activs=$('.acts'); // crea un arreglo de los objetos que tienen esa clase, de los botones
/*
//location.reload();
$('.acts').click(function () {
    location.reload();
    windows.onload = function () {
        $('#plataforma').load(this.id + '.html');
    }
});
*/
for (let i = 0; i < activs.length; i++) {
    //activs[i].addEventListener('mousedown',function () { location.reload(); });
    activs[i].addEventListener('click',function () { $('#plataforma').load(this.id + '.html'); });
}
