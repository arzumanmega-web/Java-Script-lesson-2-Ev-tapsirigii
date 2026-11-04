const gameTable = document.getElementById("gameTable");
const kartElement=document.getElementById("qalanKart");
const gameCube = 4;
const gameSize = 16;
function GetRandomNum(num) {
    return Math.floor(Math.random() * num);
}

let zoneImageArr;
function RandomZone() {
    zoneImageArr = new Array(16);
    let count = gameSize;
    let countIndex = 0;
    for (let i = 0; i < gameSize / 2; i++) {
        for (let k = 0; k < 2; k++) {
            while (count > 0) {
                let zoneIndex = GetRandomNum(gameSize)
                if (zoneImageArr[zoneIndex] == null) {
                    zoneImageArr[zoneIndex] = `<td id="${gameSize + countIndex}"><img id="${countIndex}" onclick="Yoxla(${countIndex},${(i + 1)},${gameSize + countIndex})" src="sekils\\sekil${i + 1}.jpg"></td>`;
                    count--;
                    countIndex++;
                    break;
                }
            }
        }
    }
}

function StartGame() {
    RandomZone();
    let count = 0;
    let content = '';
    for (let i = 0; i < gameCube; i++) {
        content += '<tr>';
        for (let k = 0; k < gameCube; k++) {

            content += `${zoneImageArr[count]}`;
            ++count;
        }
        content += '</tr>';
    }
    gameTable.innerHTML = content;
    kartElement.innerText=`Qalan kart sayi: ${gameSize}`;

}

start = document.getElementById("start");
stop1 = document.getElementById("restart");
stop1.disabled = true;
function Start() {
    start.disabled = true;
    stop1.disabled = false;
    StartGame();
}




let FotoIndex = "";
let ButtonIndex = "";
let TdIndex = "";
let isChecking = false;
let nextCount=0;
let kartSize=gameSize;
function Yoxla(buttonIndex, fotoIndex, tdIndex) {

    if (isChecking) return;

    const imgElement = document.getElementById(buttonIndex);
    const tdElement = document.getElementById(tdIndex);
    if (imgElement.style.opacity === "1"||tdElement.style.backgroundColor == "white") return;

    imgElement.style.opacity = "1";
    imgElement.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    imgElement.style.transform = "rotateY(0deg)";

    if (ButtonIndex === "") {
        ButtonIndex = buttonIndex;
        FotoIndex = fotoIndex;
        TdIndex = tdIndex;
    }

    else {
        if (fotoIndex === FotoIndex && buttonIndex !== ButtonIndex) {
            const imgElement2 = document.getElementById(ButtonIndex);
            const tdElement2 = document.getElementById(TdIndex);
            setTimeout(() => {
                kartElement.innerText=`Qalan kart sayi: ${kartSize-2}`;
                kartSize-=2;
                tdElement.style.backgroundColor = "white";
                tdElement.style.transition = "background-color 3s ease, color 3s ease";
                imgElement.style.opacity = "0";
                imgElement.style.transform = "rotateY(180deg)";

                tdElement2.style.backgroundColor = "white";
                tdElement2.style.transition = "background-color 3s ease, color 3s ease";
                imgElement2.style.opacity = "0";
                imgElement2.style.transform = "rotateY(180deg)";
                nextCount++;
                if(nextCount==8){
                    gameTable.innerHTML="<h1>Tebrikler butun kartlari acdiniz...</h1>";
                    nextCount=0;
                    kartSize=gameSize;
                }
            }, 1000);

            ButtonIndex = "";
            FotoIndex = "";
        } else {

            let birinciKartID = ButtonIndex;

            ButtonIndex = "";
            FotoIndex = "";

            setTimeout(() => {
                let kart1 = document.getElementById(birinciKartID);
                if (kart1) {
                    kart1.style.opacity = "0";
                    kart1.style.transform = "rotateY(180deg)";
                }

                imgElement.style.opacity = "0";
                imgElement.style.transform = "rotateY(180deg)";

                isChecking = false;
            }, 800);
        }
    }
}