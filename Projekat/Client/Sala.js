import { Dogadjaj } from "./Dogadjaj.js";
import { removeAllChildNodes } from "./main.js";
import { TabelaZaDog } from "./TabelaZaDog.js";
import {nacrtajTabelu} from "./Tabele.js";

export class Sala{

    constructor(id,naziv,brojMesta){
        this.id=id;
        this.naziv=naziv;
        this.kontejner=null;
        this.brojMesta=brojMesta;
    }
    iscrtajButtons(host,host2)
    {
        let but=document.createElement("button");
        but.classList.add("sala1");
        but.innerHTML="Sala " + this.naziv;
        host.appendChild(but);
        this.kontejner=but;
        but.onclick=(ev)=>{
//izbrisi
         //   if(host2.classList.contains())
            this.prikaziStranu(host2);
        }
    }
    crtajRed(host){
        let red = document.createElement("div");
        red.className="red";
        host.appendChild(red);
        return red;
    }
    
    prikaziStranu(host2)
    {
       removeAllChildNodes(host2);   
        let izabranaSalaDiv =document.createElement("div");
        izabranaSalaDiv.classList.add("izabranaSalaDiv");
        host2.appendChild(izabranaSalaDiv);
        let izabranaSala = document.createElement("label");
        izabranaSala.innerHTML="~ Sala " + this.naziv + " ~";
        izabranaSalaDiv.appendChild(izabranaSala);
        let velikiDiv = document.createElement("div");
        velikiDiv.classList.add("velikiDiv");
        // velikiDiv.classList.add(this.naziv);
        host2.appendChild(velikiDiv);
        //na veliki div stavjamo div za rez i za spisak

        //za rez
        let rezervacijeDiv = document.createElement("div");
        //ubaci u fju za crtanje rez
        rezervacijeDiv.classList.add("rezervacijeDiv");
        velikiDiv.appendChild(rezervacijeDiv);
        // let r=document.createElement("div");
        // r.classList.add("rez");
        // rezervacijeDiv.appendChild(r);
        // let rezervacijaLabel=document.createElement("label");
        // rezervacijaLabel.classList.add("reztxt");
        // rezervacijaLabel.innerHTML=" Rezervacije";
        // r.appendChild(rezervacijaLabel);



        //za zvanice
        let zvaniceDiv = document.createElement("div");
        zvaniceDiv.classList.add("zvaniceDiv");
        velikiDiv.appendChild(zvaniceDiv);
        // let z=document.createElement("div");
        // z.classList.add("zvanice");
        // zvaniceDiv.appendChild(z);
        // let zvanicaLabel=document.createElement("label");
        // zvanicaLabel.classList.add("zvanicatxt");
        // zvanicaLabel.innerHTML=" Uredi spisak zvanica";
        // z.appendChild(zvanicaLabel);

        //div za unos dogadjaja

        let nizLabela =["Ime", "Prezime", "Broj telefona", "Datum", "Dogadjaj","Broj gostiju"];
        let nizTipova=["text", "text","text", "date", "text","number"];


        
        let divZaUnosiButton= document.createElement("div");
        divZaUnosiButton.className="divZaUnosiButton";
        rezervacijeDiv.appendChild(divZaUnosiButton);
        let r=document.createElement("div");
        r.classList.add("rez");
        divZaUnosiButton.appendChild(r);
        let rezervacijaLabel=document.createElement("label");
        rezervacijaLabel.classList.add("reztxt");
        rezervacijaLabel.innerHTML=" Rezervacije";
        r.appendChild(rezervacijaLabel);
        nizLabela.forEach((element,index) => {
       // let divic=document.createElement("div");
       // divic.className=element;
        let red = this.crtajRed(divZaUnosiButton);
        let l = document.createElement("label");
        l.innerHTML=element;
        let m = document.createElement("div");
        m.appendChild(l);
        red.appendChild(m);
        let se = document.createElement("input");
        se.type= nizTipova[index];
        se.name=element;
        se.id=element;
        se.className=element;
        red.appendChild(se);
            
        });
        let imeK;
        let prezimeK;
        let brTel;
        let datum;
        let dogadjaj;
        let brGostiju;
        let dugme = document.createElement("button");
        dugme.className ="dugmeZaRez";
        dugme.innerHTML = "Rezervisi";
       // rezervacijeDiv.appendChild(dugme);
       divZaUnosiButton.appendChild(dugme);
        dugme.onclick = (ev) =>{
       
                let imeInput = document.getElementById("Ime");
                let imeString = imeInput.value;
                console.log(imeString);
                if(imeString==="" || imeString.length > 50)
                {
                    alert("Nevalidno ime");
                    return;
                }
                else
                {
                     imeK=imeString;
                }

                let prezimeInput = document.getElementById("Prezime");
                let prezimeString = prezimeInput.value;
                if(prezimeString==="" || prezimeString.length > 50)
                {
                    alert("Nevalidno prezime");
                    return;
                }
                else
                {
                    prezimeK=prezimeString;
                }
              
                let brojInput = document.getElementById("Broj telefona");
                let brojString = brojInput.value;
                    if(isNaN(brojString))  
                    {
                        alert("Nije cifra");
                        return;
                    }
                    if(brojString==="" || brojString.length > 13 )//treba i provera da li su sve cifre
                    {
                        alert("Nevalidan broj telefona!")
                        return;
                    }
                    brTel=brojString;

                let dogadjajInput = document.getElementById("Dogadjaj");
                let dogadjajString = dogadjajInput.value;
             
                if(dogadjajString==="")//treba i provera da li su sve cifre
                {
                    alert("Niste popunili polje dogadjaj!")
                    return;
                }
                dogadjaj=dogadjajString;
                let gostiInput = document.getElementById("Broj gostiju");
                let gostiString = gostiInput.value;
                    if(gostiString<=0 || gostiString=="")
                    {
                        alert("Niste popunili polje broj gostiju")
                        return;
                    }
                    if(gostiString>  this.brojMesta )
                    {
                        alert("Nema toliko mesta u sali");
                        return;

                    }
                    brGostiju=gostiString;
              //  }
           
            
           // let dogadjajj = new Dogadjaj();
           
           let datumInput = document.getElementById("Datum");
           let datumString = datumInput.value;
           const today = new Date();
           var neki = new Date(datumString);
           console.log(today);
           console.log(neki);
           if( neki <= today)
           {
               alert("Datum u proslosti!");
               return;
           } 
           if(datumString=="")
           {
               alert("Niste popunili polje za datum");
               return;
           }
           //provera da li je vec rezervisana sala za taj datum
           fetch("https://localhost:5001/Dogadjaj/ProveraDatuma/"+datumString +"/"+ this.id,
           {
                method:"GET"
           }).then(s=>
               {
                   if (s.status ==200)
                   {
                     datum=datumString;  
                     fetch("https://localhost:5001/Dogadjaj/ZakaziDogadjaj/"+this.id+"/"+imeK+"/"+prezimeK+"/"+brTel,
                     {
                         
                         method: "POST",
                         headers: {
                        "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                         naziv : dogadjaj,
                         datum : datum,
                         brojGostiju : brGostiju,
                         
                     })
                          }).then( s=>
                         {
                             console.log(s.status);
                             console.log(s);
                             
                            if (s.status ==200)
                            {
                               alert("Uspesno rezervisan dogadjaj!");
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
                else if(s.status == 202)
                   {
                       alert("Postoji zakazan dogadjaj za taj datum, molimo Vas izaberite novi datum!");
                       return;
       
                   }
                   else
                   {
                       alert("Greska prilikom upisa");
                        return;
                   }
               })
               .catch(p => {
                   console.log(p);
                   alert ("Greška ");
               });
        }
        // sad ide deo za dekoraciju

       this.crtajDeoZaDodajIIzmeniDekoracije(rezervacijeDiv)
      
    }
    crtajDeoZaDodajIIzmeniDekoracije(rezDiv)
    {
        let dodajIIzmeniDek = document.createElement("div");
        dodajIIzmeniDek.classList.add("dodajIIzmeniDek");
        rezDiv.appendChild(dodajIIzmeniDek);

        let deoZaUnosTelIDogadjaja = document.createElement("div");
        deoZaUnosTelIDogadjaja.classList.add("deoZaUnosTelIDogadjaja");
        dodajIIzmeniDek.appendChild(deoZaUnosTelIDogadjaja);

        let d = document.createElement("div");
        let dodajIz= document.createElement("label");
        dodajIz.innerHTML="Dodajte i izmenite dekoracije";
        d.appendChild(dodajIz);
        d.classList.add("d");
        deoZaUnosTelIDogadjaja.appendChild(d);

        let nn =document.createElement("div");
        let brT=document.createElement("label");
        brT.className="bR";
        brT.innerHTML="Broj telefona";
        let divzabrT=document.createElement("div");
        divzabrT.appendChild(brT);
        nn.appendChild( divzabrT);
        let inp = document.createElement("input");
        inp.type="text";
        inp.name="Br";
        inp.id= "Br";
        inp.className="Br";
        nn.appendChild(inp);
        deoZaUnosTelIDogadjaja.appendChild(nn);
        let mojiDogadjaji = document.createElement("button");
        mojiDogadjaji.innerHTML="Moji događaji";
        mojiDogadjaji.classList.add("mojiDogadjaji");
        deoZaUnosTelIDogadjaja.appendChild(mojiDogadjaji);
      
        let tabelaDiv =document.createElement("div");
        tabelaDiv.classList.add("tabelaDiv");
        dodajIIzmeniDek.appendChild(tabelaDiv);
        
        mojiDogadjaji.onclick= (ev) =>{ 
        let zag =["Naziv","Datum","Broj"];
        // let tabelaDekoracijeDiv = document.createElement("div");
        // tabelaDekoracijeDiv.className="tabelaDekoracijeDiv";
        // rezDiv.appendChild(tabelaDekoracijeDiv);

        


        vratiDogadjajeFetch(zag,tabelaDiv,inp,rezDiv,this.id);         
        }
     
    }
}

 export function vratiDogadjajeFetch(zag,tabelaDiv,inp,rezDiv,salaId)
{
    let brojStringic = inp.value;
    if(isNaN(brojStringic))  
    {
        alert("Nije cifra");
        return;
    }
    if(brojStringic==="" || brojStringic.length > 13)//treba i provera da li su sve cifre
    {
        alert("0 cifara ili preko 13");
        return;
    }
fetch("https://localhost:5001/Dogadjaj/VratiDogadjaje/"+brojStringic+"/"+salaId,
{
     method:"GET"
}).then(s=>
    {
        if (s.status ==200)
        {
            
            s.json().then(data =>
            {
            let divZaDeleteDek=document.createElement("div");
            divZaDeleteDek.className="divZaDeleteDek";
            let nalepiNaTabelaDiv= document.querySelector(".tabelaDiv");
            console.log(nalepiNaTabelaDiv);

            // let tabelaDekoracijeDiv = document.querySelector(".tabelaDekoracijeDiv");
            // removeAllChildNodes(tabelaDekoracijeDiv);

            let zvaniceDiv = document.querySelector(".zvaniceDiv");
            removeAllChildNodes(zvaniceDiv);

            let teloTabele=nacrtajTabelu(zag, tabelaDiv,"TabelaDogadjaji",".tabelaDiv","tabela1");
            nalepiNaTabelaDiv.append(divZaDeleteDek);
            data.forEach(s=>
            {
                let tab = new TabelaZaDog(s.naziv,s.datum,s.brojT,s.id); 
                // tab.nacrtajTabeluZaDog(teloTabele,rezDiv,"tabeladog","tabelaDekoracijeDiv");
                tab.nacrtajTabeluZaDog(teloTabele,rezDiv,"tabeladog","zvaniceDiv");

            })
        })          
        }
     else if(s.status == 202)
        {
            alert("Ne postoje dogadjaji za klijenta sa tim brojem");
            let tabelaa= document.querySelector(".tabelaDiv");
            if(tabelaa!= null)
                removeAllChildNodes(tabelaa);

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