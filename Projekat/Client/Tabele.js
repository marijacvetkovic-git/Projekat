import { removeAllChildNodes } from "./main.js";
export function nacrtajTabelu(zag,naSta,klasName,qstableklas,tabelaklasname)

{
    var telo = document.querySelector(qstableklas);
    console.log(qstableklas);

    // var roditelj = telo.parentNode;
    removeAllChildNodes(telo);
 
    let tabela = document.createElement("table");
    tabela.className=tabelaklasname;
    tabela.id=tabelaklasname;
    naSta.appendChild(tabela);

    var tabelahead= document.createElement("thead");
    tabela.appendChild(tabelahead);

    let tr = document.createElement("tr");
    tr.className="zaglavlje";

    tabelahead.appendChild(tr);

    var tabelaBody = document.createElement("tbody");
    tabelaBody.className=/*"TabelaDogadjaji"*/klasName;
    tabela.appendChild(tabelaBody);

    let th;
    zag.forEach(el=>{
        th = document.createElement("th");
        th.innerHTML=el;
        tr.appendChild(th);
    })
    return tabelaBody;
   
}

