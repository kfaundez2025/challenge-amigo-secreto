// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.
//Crea array para almacenar los nombres de amigos
let listaAmigos = [];
let inputNuevoAmigo = document.getElementById("amigo");
let parrafoResultado = document.getElementById("resultado");
let ul= document.getElementById("listaAmigos");
let  indiceResaltado=null;
let ruletaActiva = false;

function agregarAmigo(){
    let nombreAmigo = document.getElementById('amigo').value;

    if(nombreAmigo==""){
        alert(`Debes ingresar el nombre de un amigo`);
    }
    else{
        //agregamos el nombre del amigo a la lista
        listaAmigos.push(nombreAmigo);
        //alert(`Amigo ingresado correctamente`);
        
        //limpiamos caja de texto
        document.getElementById('amigo').value='';
        indiceResaltado=null;
        console.log(listaAmigos);
        mostrarAmigos();
    }
    
}

function mostrarAmigos(){
    ul.innerHTML="";
    parrafoResultado.textContent="";
    listaAmigos.forEach((amigo, index) => {
        let li = document.createElement("li");
        // Si es el amigo elegido, resaltar
        if (index === indiceResaltado) {
            li.classList.add("resaltado");
          }
          let nombreTexto = document.createTextNode(amigo);
         // Crear botón eliminar
         let btnEliminar = document.createElement("button");
         btnEliminar.textContent = "X";
         btnEliminar.classList.add("btn-eliminar");
         btnEliminar.onclick = () => {
           eliminarAmigo(index);
         };
                 
         li.appendChild(nombreTexto);
         li.appendChild(btnEliminar);
         ul.appendChild(li);
      });
    
}

// Función para eliminar un amigo por índice
function eliminarAmigo(index) {
    let amigo = listaAmigos[index];
    const confirmar = confirm(`¿Estás seguro de que quieres eliminar a "${amigo}" de la lista?`);
    if (confirmar) {
        listaAmigos.splice(index, 1); // Eliminar del arreglo
        indiceResaltado=null;
        mostrarAmigos(); // Volver a renderizar
        console.log(listaAmigos);
    }
  }

function reiniciar(){
    let ul= document.getElementById("listaAmigos");
    ul.innerHTML="";
    listaAmigos=[];
    parrafoResultado.textContent="";
    console.log("Eliminando...");
    console.log(listaAmigos);
}

function sortearAmigo(){
   
    if (ruletaActiva || listaAmigos.length === 0) {
        if (listaAmigos.length === 0) {
            parrafoResultado.textContent = "No hay amigos en la lista.";
            indiceResaltado=null;
        }
        return;
      }
      ruletaActiva=true;
      let vueltas = 20 + Math.floor(Math.random() * 10); // cuántas veces gira
        let actual = 0;

        let intervalo = setInterval(() => {
            indiceResaltado = actual % listaAmigos.length;
            mostrarAmigos();
            actual++;

        if (actual > vueltas) {
            clearInterval(intervalo);
            const amigoElegido = listaAmigos[indiceResaltado];
            parrafoResultado.textContent = "🎉 El Amigo Secreto es: " + amigoElegido;
            ruletaActiva = false;
        }
        }, 200); // velocidad del giro

}
// Detectar Enter en el input
inputNuevoAmigo.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      agregarAmigo();
    }
  });