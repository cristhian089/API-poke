//URL API

const API = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";

//obtener los resultados de la api
const getData = (api) => {
  return fetch(api)
    .then((response) => response.json())
    .then((json) => {
     // llenarDatos(json.results);
     // paginacion(json);
      pokeData(json.results),paginacion(json);
    })
    .catch((error) => {
      console.log("Error :", error);
    });
};

//const pokedata

const pokeData=(data)=>{
   let html="";
   document.getElementById("datosPersonajes").innerHTML ="";
   data.forEach((pj) => {
     const URL =pj.url;
     return fetch(URL)
      .then((response) => response.json())
      .then((json) =>{
        llenarDatos(json,html);
      })
      .catch((error) =>{
        console.log("Error :" ,error);
      });
   });

};

//dibujar carda de personajes
const llenarDatos = (data,html) => {
  
 

    html += '<div class="col mt-5">';
    html += `<div class="card" style="width: 18rem;">`;
    html += `<img class="card-img-top" src="${data.sprites.other.dream_world.front_default}" alt="${data.name}">`;
    html +=`<div class="card-body">`;
    html +=`<h5 class="card-title">${data.name}</h5>`;
    html +=`<p class="card-text">${data.weight}</p>`;
    html +=`<p class="card-text">${data.height}</p>`;
    html +=` </div>`;
    html +=` </div>`;
    html += "</div>";
 
  
  document.getElementById("datosPersonajes").innerHTML += html;
};

//paginacion
const paginacion = (data) => {
    let prevDisabled ="";
    let nextDisabled="";
    
    data.previous === null ? prevDisabled = "disabled" : prevDisabled = "";
    data.next === null ? nextDisabled = "disabled" : nextDisabled="";
    let html =`<li class="page-item ${prevDisabled}">
    <a class="page-link" onclick='getData("${data.previous}")' >Previous</a>
  </li> <li class="page-item ${nextDisabled}"> <a class="page-link" onclick='getData("${data.next}")' >Next</a></li>`;

  
    document.getElementById("paginacion").innerHTML =html;
    
};

//Se ejecuta la api
getData(API);
