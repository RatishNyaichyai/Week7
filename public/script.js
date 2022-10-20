const drawingBoard = document.querySelector('.drawing-board');

for (i = 0; i < (250 * 250); i++) {
    const pixels = document.createElement('div');
    pixels.style = `
    // background-color: aqua;
    heigth: 2px;
    width: 2px; 
    display:inline-block;
    background-color: white;
    `
    pixels.setAttribute('id', 'pixels' + i);
    pixels.setAttribute('class', 'pixels');
    drawingBoard.appendChild(pixels)
}

let trigger = false;
let colorSelect = null;

const colorOptions = document.querySelector('.color-options');
let colors = ['red', 'black', 'purple', 'yellow', 'green', 'pink', 'orange'];

colors.forEach(element => {
    let OptionsA = document.createElement('div');
    OptionsA.style = `
        width: 37px;
        height: 37px;
        border-radius: 50%;
        margin:20px;
        margin-top: 15px;
        background-color:${element};
    `;

    colorOptions.appendChild(OptionsA);
    OptionsA.addEventListener('click', (e) => {
        colorSelect = e.target.style.backgroundColor;
    })
})


const keyOptions = document.querySelector('.key-options');
for (i = 1; i <= 7; i++) {
    const OptionsB = document.createElement('div');
    OptionsB.style = `
        box-sizing: border-box;
        width: 37px;
        height: 37px;
        border: 1px solid #000000;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 5px;
        margin: 20px;
        text-align: center`
    OptionsB.innerText = i;
    keyOptions.appendChild(OptionsB)
}


const options = document.querySelector('.options');

const saveButton = document.createElement('button');
saveButton.innerText = 'Save';
saveButton.setAttribute('class', 'save-button');
options.appendChild(saveButton);


const cancelButton = document.createElement('button');
cancelButton.innerText = 'Cancel';
cancelButton.setAttribute('class', 'cancel-button');
options.appendChild(cancelButton);

cancelButton.addEventListener("click", (e) => {
    let clear = document.querySelectorAll(".pixels")
    clear.forEach((element) => {
        element.style.backgroundColor = "white"
    })
})

saveButton.addEventListener('click', (e) => {
    let allSquare = document.querySelectorAll('.pixels');
    console.log(allSquare)
    let count = 0;
    let a = [];
    for (i = 0; i < 250 * 250; i++) {
        let color = allSquare[count].style.backgroundColor;
        if (color != 'white') {
            let div = {};
            div.divId = allSquare[count].id;
            div.color = color
            a.push(div)
        }
        count++;
    }
    console.log('value of a', a);

    const data = { data: a };

    fetch('/drawingBoard', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log("Sucess: ", data)
        })
        .catch((err) => {
            console.log(`Error: ${err}`)
        })
})
drawingBoard.addEventListener("mouseup", () => {
    trigger = false
});

drawingBoard.addEventListener('mousedown', (e) => {
    trigger = true

    let element = e.target;
    if (element !== '') {
        let colorDiv = element;
        console.log(colorDiv)
    }
    else {
        console.log("An element without an id was clicked.");
    }
});


drawingBoard.addEventListener("mouseover", function (e) {
    if (trigger == true) {
        let element = e.target;

        if (element !== '') {
            let colorDiv = element;
            console.log(colorDiv)
            colorDiv.style.backgroundColor = colorSelect
        }
        else {
            console.log("An element without an id was clicked.");
        }
    }
});

document.body.addEventListener("keydown", (e) => {
    if (e.key > 0 && e.key < colors.length + 1) {
        console.log("Key Pressed: ", e.key)
        console.log("Color Selected: ", colors[e.key - 1])
        colorSelect = colors[e.key - 1]
    }
    else {
        alert(`Please select appropriate number from 1 to ${colors.length}`);
    }
})