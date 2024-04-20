var currPart;
var end;
var turnsCounter = 0;


/* ///////////////////////////////////////////////// */
let logo = document.createElement("img");
logo.src = "images/logo.png";
logo.classList.add("logo");
document.body.appendChild(logo);



/* ///////////////////////////////////////////////// */
let box = document.createElement("div");
box.classList.add("box");

let imagesindex = [7,2,5,3,4,8,6,1,9];
imagesindex.sort(() => Math.random() > 0.5 ? 1 : -1);
imagesindex.forEach(part => {
    let img = document.createElement("img");
    img.classList.add(`${part}`);
    img.src = `images/${part}.jpg`;
    box.appendChild(img);
});

document.body.appendChild(box);

var boxImages = Array.from(box.children);


let imagesArray = document.querySelectorAll(".box img");

imagesArray.forEach((image) => {

    image.addEventListener(('dragstart'), ()=> {
        currPart = image;
    });
    
    image.addEventListener(('dragover'), (event)=> {
        event.preventDefault();
    });

    image.addEventListener(('drop'), (event)=> {
        end = image;
    });
    
    image.addEventListener(('dragend'), (event)=> {
        if (currPart.src === end.src) {
            console.log("error");

        }else {

            var boxClassNames = boxImages.map(image => image.className);
            numOfTurns.textContent = ++turnsCounter;

            endSrc = end.className;
    
            end.src = `images/${currPart.className}.jpg`;
            end.className = '';
            end.classList.add(currPart.className);
            boxClassNames[boxClassNames.indexOf(end.className)] = currPart.className;
    
            currPart.src = `images/${endSrc}.jpg`;
            currPart.className = '';
            currPart.classList.add(endSrc);
            boxClassNames[boxClassNames.indexOf(currPart.className)] = endSrc;

            boxClassNames = boxImages.map(image => image.className);
        }

        if (turnsCounter == 10) {
            result("fail");
        }else if (isSorted(boxClassNames)) {
            result("success");
            console.log("succcccccess");
        }
    });
});

/* ///////////////////////////////////////////////// */
let turns = document.createElement("h2");
let numOfTurns = document.createElement("span");

turns.textContent = `Turns: `;
numOfTurns.textContent = turnsCounter;

turns.appendChild(numOfTurns);
document.body.appendChild(turns);




/* ///////////////////////////////////////////////// */
function result (resultcontent) {
            result = document.createElement("div");
            result.classList.add("result");

            resultText = document.createElement("p");

            reload = document.createElement("button");
            reload.textContent = "reload";
            reload.addEventListener('click', function() {
                location.reload();
            });

            box.style.display = "none";
            turns.style.display = "none";

            if (resultcontent === "fail") {
                resultText.style.color = "red";
                resultText.textContent = "Game Over !!";
            }else if (resultcontent === "success"){
                resultText.style.color = "green";
                resultText.textContent = "Win !!";
            }

            result.appendChild(resultText);
            result.appendChild(reload);
            document.body.appendChild(result);
}


function isSorted(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            return false;
        }
    }
    return true;
}