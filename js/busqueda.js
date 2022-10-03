const form1 = document.getElementById('form1');
const boton1 = document.getElementById('boton1');

boton1.addEventListener('click',function(){
    if (form1.value.toLowerCase()==='suma') {
    
    } else if (form1.value.toLowerCase()=='resta') {
    
    } else if (form1.value.toLowerCase()=='multiplicacion') {

    } else if (form1.value.toLowerCase()=='division') {

    } else {
        alert('No es posible realizar esa busqueda intente: suma, resta, multiplicaci[on y division');
    }
});