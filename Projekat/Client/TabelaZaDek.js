
import { Dekoracija } from "./Dekoracija.js";
import { Spoj } from "./Spoj.js";
import { removeAllChildNodes } from "./main.js";
import {nacrtajTabelu} from "./Tabele.js";
import {radiNaListaDek} from "./DeoZaDekoracijeUnos.js"
export class TabelaZaDek
{
    constructor(idSpoj,tip,boja,kolicina,cena)
    {
        this.idSpoj=idSpoj;
        this.tip=tip;
        this.boja=boja;
        this.kolicina=kolicina;
        this.cena=cena;
    }
    nacrtajTabeluZaDek(host,rezDiv,trclassname,tabelaDekoracijeZaDogDiv)
    {
        console.log("Usao u nacrtajTabeluzadek");
        var tr = document.createElement("tr");
        host.appendChild(tr);
        tr.className=trclassname;
        
        tr.id=this.idSpoj;
        // let tabelaDekoracijeZaDogDiv = document.createElement("div");
        // tabelaDekoracijeZaDogDiv.className=imeZaDivTabele;
        tr.addEventListener("click",() =>
        {
           // console.log(tr.id);
           removeAllChildNodes(tabelaDekoracijeZaDogDiv);


            // let tabelaDekoracijeZaDogDiv = document.createElement("div");
            // tabelaDekoracijeZaDogDiv.className=imeZaDivTabele;//tabelaspojdiv
            // rezDiv.appendChild(tabelaDekoracijeZaDogDiv);
            this.radiNaClick(tabelaDekoracijeZaDogDiv,tr);
        })
       var el = document.createElement("td");
        el.innerHTML=this.tip;
        el.id = this.tip;
        tr.appendChild(el);

        el = document.createElement("td");
        el.innerHTML=this.boja;
        el.id = this.boja;
        tr.appendChild(el);

        el = document.createElement("td");
        el.innerHTML=this.kolicina;
        el.id = this.kolicina;
        tr.appendChild(el);
        el = document.createElement("td");
        el.innerHTML=this.cena;
        el.id = this.cena;
        tr.appendChild(el);

    }
    radiNaClick(tabelaDekoracijeZaDogDiv,tr)
    {
        removeAllChildNodes(tabelaDekoracijeZaDogDiv);
       // let divZaIzmeniButton=document.createElement("div");
        let izmeniButton = document.createElement("button");
        let izmenjenaKol= document.createElement("input");
        izmenjenaKol.type ="number" ;
        izmenjenaKol.name="izmenjenaKol";
        izmenjenaKol.id="izmenjenaKol";
  


        let izmenjenaKolLab=document.createElement("label");
        let izmenjenaKolDiv = document.createElement("div");
        izmeniButton.className="izmeniButton";
        izmeniButton.innerHTML="Izmeni količinu";

        izmenjenaKolDiv.appendChild(izmeniButton);
        izmenjenaKolDiv.appendChild(izmenjenaKolLab);
        izmenjenaKolDiv.appendChild(izmenjenaKol);
       

        tabelaDekoracijeZaDogDiv.appendChild(izmenjenaKolDiv);
       // tabelaDekoracijeZaDogDiv.appendChild(izmeniButton);
        
        let izbrisiButton=document.createElement("button");
        izbrisiButton.className="izbrisiButton";
        izbrisiButton.innerHTML="Izbriši";
        tabelaDekoracijeZaDogDiv.appendChild(izbrisiButton);


        izbrisiButton.addEventListener("click",()=>
        {
            console.log(tr.id);
            
            let tabelaDek = document.querySelector(".tabelaDekDiv");
            this.izbrisiDekoracijuZaDogadjaj(tr,tabelaDekoracijeZaDogDiv,tabelaDek);
            // let t = document.querySelector(".tabelaSpojDiv");
            // removeAllChildNodes(t);
        }
        )
        izmeniButton.addEventListener("click",()=>
        {
            let tabelaDek = document.querySelector(".tabelaDekDiv");
           this.izmeniKolicinuDekoracije(izmenjenaKol,tr,tabelaDekoracijeZaDogDiv,tabelaDek);
        //    let t = document.querySelector(".tabelaSpojDiv");
        //    removeAllChildNodes(t);
        }
        )
    }
    izbrisiDekoracijuZaDogadjaj(tr,tabelaDekoracijeZaDogDiv,tabelaDek)
    {
        let t = document.querySelector(".tabelaSpojDiv");
        removeAllChildNodes(t);
        
      //  treba da izbrisem spoj sa odredjenim idDogadjaj i id dek i idjem spoja ofc
        fetch("https://localhost:5001/Dekoracija/IzbrisiDekoracijuZaDogadjaj/"+ tr.id,
        {
             method:"DELETE"
        }).then(s=>
            {
               
                console.log(s.status);
                if (s.status ==200)
                        {
                          alert("Uspesno izbrisana dekoracija")  ;
                          
                          let dog=document.querySelector(".odabraniDog");
                          radiNaListaDek(dog,tabelaDek,tabelaDekoracijeZaDogDiv);
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
    
    }
    izmeniKolicinuDekoracije(izmenjenaKol,tr,tabelaDekoracijeZaDogDiv,tabelaDek)
    {
        let t = document.querySelector(".tabelaSpojDiv");
        removeAllChildNodes(t);
        if(izmenjenaKol.value==0)
        {
            alert("Broj mora biti veci od 0!");
            return;
        }


        //terba mi fja za update...nalazi spoj sa zadatim id i postavlja kolicinu na zadatu

        fetch("https://localhost:5001/Dekoracija/IzmeniKolicinu/"+ tr.id + "/"+ izmenjenaKol.value,
        {
             method:"PUT"
        }).then(s=>
            {
               
                console.log(s.status);
                if (s.status ==200)
                        {
                          alert("Uspesno izmenjena kolicina")  ;
                         
                          let dog=document.querySelector(".odabraniDog");
                          radiNaListaDek(dog,tabelaDek,tabelaDekoracijeZaDogDiv);
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
    //     radiNaListaDek(tr,tabelaDek,tabelaDekoracijeZaDogDiv);
    //      let zag =["Tip","Boja","Kolicina","Cena"];
    //      let dogid=document.querySelector(".odabraniDog").id;
    //   //   let dogid = tr.id;
    //      let rezDiv = document.querySelector(".rezervacijeDiv");
    //      fetch("https://localhost:5001/Dekoracija/VratiDekoracije/"+ dogid,
    //  {
    //       method:"GET"
    //  }).then(s=>
    //      {
    //          console.log(dogid);
    //          console.log(s.status);
    //          if (s.status ==200)
    //                  {
    //                      console.log("Usao u status 200");
 
    //                      let teloTabele=nacrtajTabelu(zag, tabelaDek,"TabelaDekoracija",".tabelaDekDiv","tabela2");
    //                      s.json().then(data =>{
    //                          console.log(data);
    //                                 data.forEach(s=>{
    //                                    console.log("Usao u foreach pre kreiranja");

    //                                     let tab = new TabelaZaDek(s.idSpoj,s.tip,s.boja,s.kolicina,s.cena);
    
    //                                    // let teloTabele=nacrtajTabelu(zag, tabelaDiv,"TabelaDekoracija");
    //                                   tab.nacrtajTabeluZaDek(teloTabele,rezDiv,"tabeladek",tabelaDekoracijeZaDogDiv);
    //                                 })
    //                             })          
    //                  }
    //       else if(s.status == 202)
    //          {
    //              alert("Ne postoje dekoracije za taj dogadjaj");
 
    //          }
    //          else
    //          {
    //              alert("LOSE");
    //          }
    //      })
    //      .catch(p => {
    //          console.log(p);
    //          alert ("Greška ");
    //      });
    //tabelaDekDiv
 

    }

}