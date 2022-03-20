import { removeAllChildNodes } from "./main.js";
import {crtajDeoZaDekoracijeUnos} from "./DeoZaDekoracijeUnos.js";
import{ vratiDogadjajeFetch }from "./Sala.js";
import {TabelaGostiju} from "./TabelaGostiju.js";
import {nacrtajTabelu} from "./Tabele.js";
import {radiNaracunBut} from "./TabelaGostiju.js"


export class TabelaZaDog
{
    constructor(naziv,datum,brojT,idDog)
    {
        this.naziv=naziv;
        this.datum=datum;
        this.brojT=brojT;
        this.idDog=idDog;
    }
    nacrtajTabeluZaDog(host,rezDiv,trclassname,imeZaDivTabele)
    {
        
        var tr = document.createElement("tr");
        host.appendChild(tr);
        tr.classList.add(trclassname);
        
        tr.id=this.idDog;
        // let tabelaDekoracijeDiv = document.createElement("div");
        // tabelaDekoracijeDiv.className=imeZaDivTabele;
        // rezDiv.appendChild(tabelaDekoracijeDiv);
        let tabelaDekoracijeDiv = document.querySelector(".zvaniceDiv");
      

        tr.addEventListener("click",() =>
        {
            tr.classList.add("odabraniDog");
            console.log(tr.id)
            this.radiNaClick(tabelaDekoracijeDiv,tr,rezDiv);
        })
        // tr.addEventListener("dblclick",()=>
        // {
        //     tr.classList.add("odabraniDog");//dodato
        //     this.radiNaDupliClick();

        // })
       var el = document.createElement("td");
        el.innerHTML=this.naziv;
        el.id = this.naziv;
        tr.appendChild(el);

        el = document.createElement("td");
        el.innerHTML=this.datum;
        el.id = this.datum;
        tr.appendChild(el);

        el = document.createElement("td");
        el.innerHTML=this.brojT;
        el.id = this.brojT;
        tr.appendChild(el);
        // return tabelaDekoracijeDiv;

    }
    radiNaClick(tabelaDekoracijeDiv,tr,rezDiv)
    {
        removeAllChildNodes(tabelaDekoracijeDiv);
        let  divZaDeleteDek=document.querySelector(".divZaDeleteDek");
        console.log(divZaDeleteDek);
       removeAllChildNodes(divZaDeleteDek);
        // let zvDiv = document.querySelector(".zvaniceDiv");
        // removeAllChildNodes(zvDiv);


        let dekoracijeBut=document.createElement("button");
        dekoracijeBut.innerHTML="Dekoracije";
        dekoracijeBut.className="dekoracijeBut";
        divZaDeleteDek.appendChild(dekoracijeBut);
        let otkaziBut=document.createElement("button");
        otkaziBut.innerHTML="Otkaži rezervaciju";
        otkaziBut.className="otkaziBut";
        divZaDeleteDek.appendChild(otkaziBut);

        let zvaniceBut=document.createElement("button");
        zvaniceBut.innerHTML="Uredi zvanice";
        zvaniceBut.className="zvaniceBut";
        divZaDeleteDek.appendChild(zvaniceBut);

        dekoracijeBut.addEventListener("click",()=>
        {
            removeAllChildNodes(tabelaDekoracijeDiv);
            // let zvaniceDiv = document.querySelector(".zvaniceDiv");
            // removeAllChildNodes(zvaniceDiv);
             let izaberiteTipIKol = document.createElement("label");
             izaberiteTipIKol.innerHTML="Dekoracije";
             let izaberiteTipIKoltxt = document.createElement("div");
             izaberiteTipIKoltxt.className="izaberiteTipIKoltxt";
             izaberiteTipIKoltxt.appendChild(izaberiteTipIKol);
             tabelaDekoracijeDiv.appendChild(izaberiteTipIKoltxt);
             console.log(tr.id);
             crtajDeoZaDekoracijeUnos(tabelaDekoracijeDiv,tr);
          

        })
        otkaziBut.addEventListener("click",()=>
        {
           
           this. radiNaIzbrisi(tabelaDekoracijeDiv,rezDiv);
        }
        )

        zvaniceBut.addEventListener("click",()=>
        {
            removeAllChildNodes(tabelaDekoracijeDiv);
           this. radiNaZvaniceButt(tabelaDekoracijeDiv,rezDiv);
        }
        )
    }
    radiNaIzbrisi(tabelaDekoracijeDiv,rezDiv)
    {
        let tabelaDiv =document.querySelector(".tabelaDiv");
        let zag =["Naziv","Datum","Broj"];
        let inp = document.querySelector(".Br");
        removeAllChildNodes(tabelaDekoracijeDiv);
        let zvaniceDiv = document.querySelector(".zvaniceDiv");
        removeAllChildNodes(zvaniceDiv);
        let dog=document.querySelector(".odabraniDog");
        let salicaid=null;
        fetch("https://localhost:5001/Dogadjaj/VratiIdSaleZaDog/"+dog.id,
        {
             method:"GET"
        }).then(s=>
            {
                if (s.status ==200)
                {
                    
                    s.json().then(data =>
                    {
                        salicaid=data;
                        console.log(salicaid);
                    })   
                     fetch("https://localhost:5001/Dogadjaj/IzbrisiDog/"+ dog.id ,
                            {
                                 method:"DELETE"
                            }).then(s=>
                                {
                                
                                    console.log(s.status);
                                    if (s.status ==200)
                                    {
                                        alert("Uspesno otkazana rezeravcija!")  ;
                                        vratiDogadjajeFetch(zag,tabelaDiv,inp,rezDiv,salicaid);
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

    radiNaZvaniceButt(tabelaDekoracijeDiv,rezDiv)
    {
        let zvaniceDiv = document.querySelector(".zvaniceDiv");
        removeAllChildNodes(zvaniceDiv);
        let z=document.createElement("div");
        z.classList.add("zvanice");
        zvaniceDiv.appendChild(z);
        let zvanicaLabel=document.createElement("label");
        zvanicaLabel.classList.add("zvanicatxt");
        zvanicaLabel.innerHTML=" Uredi spisak zvanica";
        z.appendChild(zvanicaLabel);

        let divZButtoneZaGoste=document.createElement("div");
        divZButtoneZaGoste.className="divZButtoneZaGoste";
        let dodajGosteButton = document.createElement("button");
        dodajGosteButton.className="dodajGosteButton";
        dodajGosteButton.innerHTML="Dodaj goste";
        let proveraDolaskaZvanicaButton = document.createElement("button");
        proveraDolaskaZvanicaButton.className="proveraDolaskaZvanicaButton";
        proveraDolaskaZvanicaButton.innerHTML="Provera dolaska";

        zvaniceDiv.appendChild(divZButtoneZaGoste);
        divZButtoneZaGoste.appendChild(dodajGosteButton);
        divZButtoneZaGoste.appendChild(proveraDolaskaZvanicaButton);

        let divZaDodavanje=document.createElement("div");
        divZaDodavanje.className="divZaDodavanje";
        zvaniceDiv.appendChild(divZaDodavanje);


        
        dodajGosteButton.addEventListener("click",()=>
        {
           this. radiNadodajGosteButton(tabelaDekoracijeDiv,rezDiv);
        })
        proveraDolaskaZvanicaButton.addEventListener("click",()=>
        {
          radiNaProveraDolaskaZvanicaButton();
        })


    }
    radiNadodajGosteButton(tabelaDekoracijeDiv,rezDiv)
    {
        let divZaDodavanje =document.querySelector(".divZaDodavanje");
        removeAllChildNodes(divZaDodavanje);

        let divZaUnos =document.createElement("div");
        divZaUnos.className="divZaUnos";
        divZaDodavanje.appendChild(divZaUnos);
        let labelaImeGosta=document.createElement("label");
        labelaImeGosta.innerHTML="Ime gosta  :    ";
        let labelaPrezimeGosta=document.createElement("label");
        labelaPrezimeGosta.innerHTML="Prezime gosta:";

        let imeGInput=document.createElement("input");
        imeGInput.type="text";
        imeGInput.name="imegosta";
        imeGInput.className="imegosta";

        let lg = document.createElement("div");
        lg.appendChild(labelaImeGosta);
        lg.className="imegostaLabDiv";

        let lp = document.createElement("div");
        lp.appendChild(labelaPrezimeGosta);
        lp.className="prezimegostaLabDiv";
        
        

        let prezimeGInput=document.createElement("input");
        prezimeGInput.type="text";
        prezimeGInput.name="prezimegosta";
        prezimeGInput.className="prezimegosta";


        let imeGDiv=document.createElement("div");
        imeGDiv.className="imeGDiv";
        let prezimeGDiv=document.createElement("div");
        prezimeGDiv.className="imeGDiv";

        imeGDiv.appendChild(lg);
        imeGDiv.appendChild(imeGInput);

        prezimeGDiv.appendChild(lp);
        prezimeGDiv.appendChild(prezimeGInput);

        divZaUnos.appendChild(imeGDiv);
        divZaUnos.appendChild(prezimeGDiv);

        let dodajGB = document.createElement("button");
        dodajGB.innerHTML="Dodaj";
        dodajGB.className="dodajGB";
        divZaUnos.appendChild(dodajGB);

        dodajGB.addEventListener("click",()=>
        {
            this.radiNadodajGB();
        })
    }
    radiNadodajGB()
    {
        let i= document.querySelector(".imegosta").value;
        let p= document.querySelector(".prezimegosta").value;
        let dog=document.querySelector(".odabraniDog");
        if(i=="" || i.length >20)
        {
            alert("Nevalidno ime");
            return;
        }
        if(p=="" || p.length >20)
        {
            alert("Nevalidno prezime");
            return;
        }

        fetch("https://localhost:5001/Pozivnica/DodajGosta/"+dog.id,
        {
            
            method: "POST",
            headers: {
           "Content-Type": "application/json",
           },
           body: JSON.stringify({
            ime : i,
            prezime : p
            
        })
             }).then( s=>
            {
                console.log(s.status);
                console.log(s);
                
               if (s.status ==200)
               {
                  alert("Uspesno dodat gost!");
               }
               else if (s.status==202)
               {
                   alert("Postoji osoba sa istim imenom i prezimenom, ako postoje dve osobe sa istim imenom unesite nadimak nakon imena ")
               }
               else
               {
                   alert("Greska prilikom upisa");
               }
               
        })
        .catch(p => {
            console.log(p);
            alert ("Greška");
        });





    }


}

export  function radiNaProveraDolaskaZvanicaButton()
{
    let dog=document.querySelector(".odabraniDog");
    let divZaDodavanje =document.querySelector(".divZaDodavanje");
    removeAllChildNodes(divZaDodavanje);
    let divZaTabeluGostiju =document.createElement("div");
    divZaTabeluGostiju.className="divZaTabeluGostiju";
    // let tabelaGostiju = document.createElement("div");
    // tabelaGostiju.className="tabelaGostiju";
    // divZaTabeluGostiju.appendChild(tabelaGostiju);
    divZaDodavanje.appendChild(divZaTabeluGostiju);
    let zag = ["Ime","Prezime","Dosao"];

    fetch("https://localhost:5001/Pozivnica/VratiGoste/"+dog.id,
{
 method:"GET"
}).then(s=>
{
    if (s.status ==200)
    {
        
        s.json().then(data =>{
        let tabelaGostiju = document.createElement("div");
        tabelaGostiju.className="tabelaGostiju";
        divZaTabeluGostiju.appendChild(tabelaGostiju);
     //   let nalepiNaTabelaDiv= document.querySelector(".tabelaDiv");
       // console.log(nalepiNaTabelaDiv);
        let teloTabele=nacrtajTabelu(zag, divZaTabeluGostiju,"TabelaGostiju",".divZaTabeluGostiju","tabelaGostiju");

                   data.forEach(s=>{
                    let tab = new TabelaGostiju(s.ime,s.prezime,s.dosao,s.id); 

                    tab.nacrtajTabeluGostiju(teloTabele,"tabelagostiju");

                   })
                let divZaButtonDosao = document.createElement("div");
                divZaButtonDosao.className="divZaButtonDosao";
                divZaTabeluGostiju.appendChild(divZaButtonDosao);
                let racunBut= document.createElement("button");
                let divZaPrikazRacuna = document.createElement("div");
                divZaPrikazRacuna.className="divZaPrikazRacuna";

                racunBut.className="racunBut";
                racunBut.innerHTML="Racun";
                divZaDodavanje .appendChild(racunBut);
                divZaDodavanje.appendChild(divZaPrikazRacuna);
                racunBut.addEventListener("click",()=>
                {
                    
                    divZaPrikazRacuna.style.display="block";
                    radiNaracunBut();
                    
                

                })




               }) 
        // let divZaButtonDosao = document.createElement("div");
        // divZaButtonDosao.className="divZaButtonDosao";
        // divZaTabeluGostiju.appendChild(divZaButtonDosao);



    }
 else if(s.status == 202)
    {
        alert("Niste dodali goste!");

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
