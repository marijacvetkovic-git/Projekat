import { removeAllChildNodes } from "./main.js";
import {radiNaProveraDolaskaZvanicaButton} from "./TabelaZaDog.js"
export class TabelaGostiju
{
    constructor(ime,prezime,dosao,idPoz)
    {
        this.ime=ime;
        this.prezime=prezime;
        this.dosao=dosao;
        this.idPoz=idPoz;
    }
    nacrtajTabeluGostiju(host,trclassname)
    {
        var tr = document.createElement("tr");
        host.appendChild(tr);
        tr.classList.add(trclassname);
    
        tr.id=this.idPoz;
        tr.addEventListener("click",()=>
        {
            tr.classList.add("kliknuto");
            this.dosaoPozeleni();
        }
        )
        var el = document.createElement("td");
        el.innerHTML=this.ime;
        el.id = this.ime;
        tr.appendChild(el);

        el = document.createElement("td");
        el.innerHTML=this.prezime;
        el.id = this.prezime;
        tr.appendChild(el);

        el = document.createElement("td");
        el.innerHTML=this.dosao;
        el.id = this.dosao;
        tr.appendChild(el);
        if(this.dosao == true)
        {
            tr.classList.add("pozeleni");
        }

    }
    dosaoPozeleni()
    {
        let divZaButtonDosao= document.querySelector(".divZaButtonDosao");
        removeAllChildNodes(divZaButtonDosao);
        let dugmeDosao=document.createElement("button");
        dugmeDosao.innerHTML="Dosao";
        dugmeDosao.className="dugmeDosao";
        divZaButtonDosao.appendChild(dugmeDosao);
        dugmeDosao.addEventListener("click",()=>{
        let tr = document.querySelector(".kliknuto").id;
        //PromeniDosao

        fetch("https://localhost:5001/Pozivnica/PromeniDosao/"+ tr,
        {
             method:"PUT"
        }).then(s=>
            {
               
                console.log(s.status);
                if (s.status ==200)
                {
                    radiNaProveraDolaskaZvanicaButton();


                }
                else
                {
                    alert("Greska prilikom brisanja");
                }
            })
            .catch(p => {
                console.log(p);
                alert ("Greška ");
            });

            
        })





    }


}
export  function radiNaracunBut()
{
    let divZaPrikazRacuna= document.querySelector(".divZaPrikazRacuna");
    removeAllChildNodes(divZaPrikazRacuna);
    

    const span = document.createElement("span");
    span.className="close-btn";
    span.innerHTML="&times";
    span.onclick = (ev) => {
    divZaPrikazRacuna.style.display="none";
    }
    

    let divZaBeliRacun = document.createElement("div");
    divZaBeliRacun.className="divZaBeliRacun";
    divZaPrikazRacuna.appendChild(divZaBeliRacun);
    divZaBeliRacun.appendChild(span);

    let labelKC= document.createElement("label");
    // labelKC.innerHTML="Ukupna  cena:";
    labelKC.className="labelKC";
    let cenDek= document.createElement("label");
    // cenDek.innerHTML="Cena dekoracije:";
    cenDek.className="cenDek";
    let cenZaM = document.createElement("label");
    // cenZaM.innerHTML="Cena za mesta i meni:";
    cenZaM.className="cenZaM";

// let divZabutonPlaceno=document.createElement("div");

    // let butonPlaceno = document.createElement("button");
    // butonPlaceno.className="butonPlaceno";
    // butonPlaceno.innerHTML="Placeno";
    // divZabutonPlaceno.appendChild(butonPlaceno);




    divZaBeliRacun.appendChild(labelKC);
    divZaBeliRacun.appendChild(cenDek);
    divZaBeliRacun.appendChild(cenZaM);
    // divZaBeliRacun.appendChild(divZabutonPlaceno);
    let cenaDekoracije;
    let cenaMesta;
    let ukupnaCena;
    
    let dog=document.querySelector(".odabraniDog");


    fetch("https://localhost:5001/Dogadjaj/VratiSumu/"+dog.id,
        {
             method:"GET"
        }).then(s=>
            {
                if (s.status ==200)
                {
                    
                    s.json().then(data =>
                    {
                        cenaDekoracije=data.cenaDekoracije;
                        cenaMesta=data.cenaMesta;
                        ukupnaCena=cenaDekoracije+ cenaMesta;
                        labelKC.innerHTML="Ukupna  cena: "+ ukupnaCena;  
                        cenDek.innerHTML="Cena dekoracije: " +cenaDekoracije ;
                        cenZaM.innerHTML="Cena za mesta i meni: "+cenaMesta;
                       
                        
                    }); 
                    // butonPlaceno.addEventListener("click",()=>
                    // {
                    //     fetch("https://localhost:5001/Dogadjaj/IzbrisiDog/"+ dog.id ,
                    //     {
                    //          method:"DELETE"
                    //     }).then(s=>
                    //         {
                            
                    //             console.log(s.status);
                    //             if (s.status ==200)
                    //             {
                    //                 alert("Obrisan placen dogadjaj");
                                    
                    //             }
                                        
                    //             else
                    //             {
                    //                 alert("Greska prilikom brisanja");
                    //             }
                    //         })
                    //         .catch(p => {
                    //             console.log(p);
                    //             alert ("Greška ");
                    //         });  
               

                    // })  

                }
                else
                {
                    alert("Greska prilikom upisa");
                }
            })
            .catch(p => {
                console.log(p);
                alert ("Greška ");
            });





    
}
