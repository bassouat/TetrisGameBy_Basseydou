
/*Définition des variables pour notre canvas ,nos buttons et notre modal pour manipuler le DOM
* utilisation des méthodes du DOM comme getElementById ou getElementByClassName
* */

const canvas = document.getElementById("tetris");
const ctx = canvas.getContext("2d");
const startButton = document.getElementById("start");
const resetButton = document.getElementById("reset");
const modal = document.getElementById("myModal");
const instructionsButton = document.getElementById("instructions");
const span = document.getElementsByClassName("close")[0];

ctx.scale(20, 20);

/*Utilisation de la méthode addEventListener() pour programmer nos boutons start, reset, instructions,
    et l'élément closing <button>
 */


startButton.addEventListener("click", () => {
    update();
    startButton.style.display = "none";
});

resetButton.addEventListener("click", () => {
    location.reload();
});

instructionsButton.addEventListener("click", () => {
    modal.style.display = "block";
});

span.addEventListener("click", () => {
    modal.style.display = "none";
});

window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

/*Création des pièces de la tétris*/

const piece = [
    [0, 0, 0],
    [0, 1, 1],          //Le chiffre 1 représente les céllules qui sont colorées
    [1, 1, 0],          //et les 0 complètent pour permettre la rotation
];                      //En fait on a 7 lettres à representées avec le tétris qui sont:
                        // I,L,J,T,O,S et Z

/*Création d'une Matrix(2D array) pour répresenter notre champ(field) qui sera remplie de
* chiffres de 1 à 7 */

function createMatrix(w, h) {
    const matrix = [];
    while (h--) {
        matrix.push(new Array(w).fill(0));
    }
    return matrix;
}

/*On crée une variable field à partir la fonction creatematrix() en lui passant les valeurs de 12 et 20*/

const field = createMatrix(12, 20);
console.log(field);
console.table(field);

/*On crée une variable player et on lui donne les coordonnées x:5 et y:-2*/

const player = {
    pos: { x: 5, y: -2 },
    piece: piece,
};

/*Methode drawPiece() pour déssiner la première pièce de tétris*/

function drawPiece(piece, offset) {
    piece.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                ctx.fillStyle = "blue";
                ctx.fillRect(x + offset.x, y + offset.y, 1, 1);
            }
        });
    });
}

/*Méthode draw() pour déssiner de façon répetitive*/

function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawPiece(field, { x: 0, y: 0 });
    drawPiece(player.piece, player.pos);
}

/*Fonction update() pour mettre à jour le code*/

let dCounter = 0;
let dropInterval = 500;
let lastTime = 0;
function update(time = 0) {
    const deltaTime = time - lastTime;
    lastTime = time;
    dCounter += deltaTime;
    if (dCounter > dropInterval) {
        player.pos.y++;
        if (collide(field, player)) {
            player.pos.y--;
            join(field, player);
            player.pos.y = 0;
        }
        dCounter = 0;
    }
    draw();
    requestAnimationFrame(update); // on l'utilise pour laisser tomber les pièces(drop)
}

/*fonction join() pour renseigner la position du player dans le field*/

function join(field, player) {
    player.piece.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                field[y + player.pos.y][x + player.pos.x] = value;
            }
        });
    });
}

/*Fonction collide() pour vérifier si les carrés du champ ne sont pas des zéros*/

function collide(field, player) {
    const b = player.piece;
    const o = player.pos;
    for (let y = 0; y < b.length; y++) {
        for (let x = 0; x < b[y].length; x++) {
            if (b[y][x] !== 0 && (field[y + o.y] && field[y + o.y][x + o.x]) !== 0) {
                return true;
            }
        }
    }
    return false;
}

/*Rotation de la pièce*/

function rotate(piece, control) {
    for (let y = 0; y < piece.length; y++) {
        for (let x = 0; x < y; x++) {
            [piece[x][y], piece[y][x]] = [piece[y][x], piece[x][y]];
        }
    }
    if (control > 0) {
        piece.forEach((row) => row.reverse());
    } else {
        piece.reverse();
    }
}




