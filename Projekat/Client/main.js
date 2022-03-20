import { Sala } from "./Sala.js";

//kreiram div za celu stranu
let glstrana= document.createElement("div");
glstrana.className="glstrana";
document.body.appendChild(glstrana);
//kreiram div za naslov
let naslov=document.createElement("div");
naslov.className="naslov";
glstrana.appendChild(naslov);
//kreiram labelu za naslov
// let naslovTxt=document.createElement("label");
// naslovTxt.innerHTML="~ Sale za svaku priliku ~";
// naslov.appendChild(naslovTxt);
//kreiram div za sale
let salice=document.createElement("div");
salice.classList.add("salicediv");
glstrana.appendChild(salice);

var listaSala=[];

let najveciDiv = document.createElement("div");
       najveciDiv.classList.add("najveciDiv");
       glstrana.appendChild(najveciDiv);
       
//preuzimam sale
fetch("https://localhost:5001/Sala/VratiSale")
.then(p => {
    p.json().then(sale=>{
        sale.forEach(sala =>{
            var s= new Sala(sala.id,sala.naziv,sala.brojMesta);
         //  console.log(s);
            s.iscrtajButtons(salice,najveciDiv/*glstrana */);

           listaSala.push(s);

        })
      
        
    })
})

 
export  function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
