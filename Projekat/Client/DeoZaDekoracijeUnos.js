
import { Dekoracija } from "./Dekoracija.js";
import { Spoj } from "./Spoj.js";
import { removeAllChildNodes } from "./main.js";
import {nacrtajTabelu} from "./Tabele.js";
import { TabelaZaDek } from "./TabelaZaDek.js";
    export function crtajDeoZaDekoracijeUnos(naSta,tr)
    {
        let listaDekoracija=[];
        fetch("https://localhost:5001/Dekoracija/VratiTipoveBoje")
        .then(p=>{
            p.json().then(tipovi =>{
                tipovi.forEach(tipe => {
                   // console.log(tip);
                var dek = new Dekoracija(tipe.id,tipe.tip,tipe.boja,tipe.cena);
                console.log(dek);
                listaDekoracija.push(dek);
                    
                });
                iscrtajTipIdek(naSta,listaDekoracija,tr);
            })
       
        }) 
    }
    export function iscrtajTipIdek(naSta,listaDekoracija,tr)
    {
        let divZaTipIKol=document.createElement("div");
                divZaTipIKol.className="divZaTipIKol";
                naSta.appendChild(divZaTipIKol);

                let tipIDek = document.createElement("div");
                tipIDek.className="tipIDek";
                let labelica =document.createElement("label");
                labelica.innerHTML="Tipovi i boje :";
                tipIDek.appendChild(labelica);
                divZaTipIKol.appendChild(tipIDek);
        
                let se = document.createElement("select");
                tipIDek.appendChild(se);
        
                let op;
                listaDekoracija.forEach(p=>{
                   console.log(op);
                    op = document.createElement("option");
                    op.innerHTML=`Boja: ${p.boja}  Tip: ${p.tip}`;
                    op.value=p.id;
                    se.appendChild(op);
                 });

                let kolDivLab = document.createElement("div");
                let kolicinaLab= document.createElement("label");
                kolicinaLab.innerHTML="Zadata kolicina:  ";
                kolDivLab.appendChild(kolicinaLab);
                let kolicinaDiv=document.createElement("div");
                kolicinaDiv.className="kolicinaDiv";
                kolicinaDiv.appendChild(kolDivLab);
                let kolicinaInput=document.createElement("input");
                kolicinaInput.type="number";
                kolicinaInput.name="kolicina";
                kolicinaInput.id="kolicina";
                kolicinaInput.className="kolicina";
                kolicinaDiv.appendChild(kolicinaInput);
                // if(kolicinaInput.value<=0)
                // {
                //     alert("Nevalidna kolicina");
                //     return;
                // }
                console.log(tr.id);


                divZaTipIKol.appendChild(kolicinaDiv);
                iscrtajButtoneZaDodavanjeIListu(naSta,divZaTipIKol,tr);


    }
    export function iscrtajButtoneZaDodavanjeIListu(naSta,divZaTipIKol,tr)
    {
        let divZaDodajButton = document.createElement("div");
        let dodajDekBut= document.createElement("button");
        dodajDekBut.className="dodajDekBut";
        dodajDekBut.innerHTML="Dodaj";
        divZaDodajButton.appendChild(dodajDekBut);
        divZaTipIKol.appendChild(divZaDodajButton);
        let divZaListDekButton = document.createElement("div");
        let listDekBut= document.createElement("button");
        listDekBut.className="listDekBut";
        listDekBut.innerHTML="Lista dekoracija";
        divZaListDekButton.appendChild(listDekBut);
        divZaTipIKol.appendChild(divZaListDekButton);

        let tabelaDekDiv= document.createElement("div");

        tabelaDekDiv.classList.add("tabelaDekDiv");
        naSta.appendChild(tabelaDekDiv);


        let tabelaDekoracijeZaDogDiv = document.createElement("div");
        tabelaDekoracijeZaDogDiv.className="tabelaSpojDiv";//prebacila iz dela za TabelaZaDek
        // let rezz= document.querySelector(".tabelaDekoracijeDiv");
        naSta.appendChild(tabelaDekoracijeZaDogDiv);
        // this.radiNaClick(tabelaDekoracijeZaDogDiv,tr);
      //  divZaTipIKol.appendChild(tabelaDekoracijeZaDogDiv);


        dodajDekBut.addEventListener("click",() =>
        {
            radiNaDodaj(tr,tabelaDekDiv,tabelaDekoracijeZaDogDiv);
        }

        )
        listDekBut.addEventListener("click",() =>
        {
            removeAllChildNodes(tabelaDekoracijeZaDogDiv)
            radiNaListaDek(tr,tabelaDekDiv,tabelaDekoracijeZaDogDiv);
        }

        )
       

    }
    export function radiNaDodaj(tr,tabelaDekDiv,tabelaDekoracijeZaDogDiv)
    {

        let dogid = tr.id;
        let optionSelected = document.querySelector("select");
        var sel=optionSelected.options[optionSelected.selectedIndex].value;
        console.log(sel);
        console.log(optionSelected);
        console.log(dogid);
        let zadKol= document.querySelector(".kolicina");
        let zadKolVal= zadKol.value;
        if(zadKolVal<=0)
        {
            alert("Nevalidna kolicina");
            return;
        }
        console.log(zadKolVal);
        dodajSpoj(dogid,sel,zadKolVal,tabelaDekDiv,tabelaDekoracijeZaDogDiv);
        //treba da napravim novi spoj sa odrdjenim id dogadjaja i dekoracije i kol


    }
    export function radiNaListaDek(tr,tabelaDekDiv,tabelaDekoracijeZaDogDiv)
    {
        let zag =["Tip","Boja","Kolicina","Cena"];
        //let dogid = tr.id;
        // let tabelaDekDiv= document.createElement("div");

        // tabelaDekDiv.classList.add("tabelaDekDiv");
        // naSta.appendChild(tabelaDekDiv);
        // console.log(tr.id);
        let rezDiv = document.querySelector(".rezervacijeDiv");

        // let tabelaDekoracijeZaDogDiv = document.createElement("div");
        // tabelaDekoracijeZaDogDiv.className="tabelaSpojDiv";//prebacila iz dela za TabelaZaDek


        fetch("https://localhost:5001/Dekoracija/VratiDekoracije/"+ tr.id,
    {
         method:"GET"
    }).then(s=>
        {
            
            console.log(s.status);
            if (s.status ==200)
                    {

                        let teloTabele=nacrtajTabelu(zag, tabelaDekDiv,"TabelaDekoracija",".tabelaDekDiv","tabela2");
                        s.json().then(data =>{
                                   data.forEach(s=>{
                                       let tab = new TabelaZaDek(s.idSpoj,s.tip,s.boja,s.kolicina,s.cena);
                                      // let teloTabele=nacrtajTabelu(zag, tabelaDiv,"TabelaDekoracija");
                                     tab.nacrtajTabeluZaDek(teloTabele,rezDiv,"tabeladek",tabelaDekoracijeZaDogDiv);
                                   })
                           

                               })          
                    }
         else if(s.status == 202)
            {
                alert("Ne postoje dekoracije za taj dogadjaj");
                removeAllChildNodes(tabelaDekDiv);

            }
            else
            {
                alert("Greska prilikom prikaza liste");
            }
        })
        .catch(p => {
            console.log(p);
            alert ("Greška ");
        });

    }

    export function dodajSpoj(dogid,sel,zadKolVal,tabelaDekDiv,tabelaDekoracijeZaDogDiv)
    {
        let spojic = new Spoj(dogid,sel,zadKolVal);
        console.log(dogid);
        console.log(sel);
        console.log(zadKolVal);

        fetch("https://localhost:5001/Dogadjaj/DodajDekoraciju2/" + dogid +"/" + sel +"/" + zadKolVal ,
        {
            
            method: "POST"
   
             }).then( s=>
            {
                console.log(s.status);
                console.log(s);
                
               if (s.status ==200)
               {
                  alert("Uspesno dodata dekoracija!");
                  let dog=document.querySelector(".odabraniDog");
                  radiNaListaDek(dog,tabelaDekDiv,tabelaDekoracijeZaDogDiv);
               }
               else if (s.status == 202)
               {
                   alert("Postoji ova dekoracija , mozete je obrisati ili izmeniti velicinu");
                   let dog=document.querySelector(".odabraniDog");
                   radiNaListaDek(dog,tabelaDekDiv,tabelaDekoracijeZaDogDiv);
               }
               else
               {
                   alert("Greska prilikom dodavanja spoja");
               }
               
        })
        .catch(p => {
            console.log(p);
            alert ("Greška");
        });
 
    }


  //  }
