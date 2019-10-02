"use strict";

betolt("KutyaFajtak.csv", myFunction_KF);
betolt("KutyaNevek.csv", myFunction_KN);
betolt("Kutyak.csv", myFunction_K);

let kutyafajták = "";
let kutyanevek = "";

function betolt(url, myFunction){
    /*Létrehozok egy HMLLhttpRequest dokumetumpot, aminek segítségével tudunk adak lekérni
    a szerverről(localhost) Jalen esetben a 3 csv file*/
    let xhttp = new XMLHttpRequest();
    /*Mi történnyen a szerverről betöltődő adatokkal*/
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            /*Ha jött vissza ada, akkro hajtsa ezt a hügvényt */
            myFunction(this);
        }
    }
    /*Összeköttetés a szerverrel, true miatt lesz aszinkron a lekérdezés*/
    xhttp.open("GET", url, true);
    xhttp.send();
}


function myFunction_KF(that){
    let szoveg = that.responseText;
    kutyafajták = szoveg.split("\n");
}

function myFunction_KN(that){
    let szoveg = that.responseText;
    kutyanevek = szoveg.split("\n");
}

function myFunction_K(that){
    //.csv, .doc, .txt stb esetén a respnseText tulajdonságot hívom meg, . xml estén responseXML tulajdonság*
    let szoveg = that.responseText;

    let sorok = szoveg.split('\n');
    let txt = "";
    for(let i = 1; i < sorok.length; i++){
        let tomb = sorok[i].split(';');
        txt += "<div>";
        txt += `${i}. kutya adatai <br />`;
        for(let j  = 0; j < kutyanevek.length; j++){
            let belso = kutyanevek[j].split(';')
            if(tomb[2] == belso[0]){
                txt += `A kutya neve: ${belso[1]} <br />`;
            }
        }
        for(let j = 0; j < kutyafajták.length; j++){
            let belso = kutyafajták[j].split(';');
            if(tomb[1] == belso[0]){
                txt += `A kutya fajtája: ${belso[1]} <br />`;
                txt += `A kutya eredeti fajtája: ${belso[2]} <br />`;
            }
        }
        txt += `A kutya életkora: ${tomb[3]} <br />`;
        txt += `Az utolsó kezelés dátuma: ${tomb[4]}`;
        txt += "</div>";
    }
    
    document.body.innerHTML = txt;
}