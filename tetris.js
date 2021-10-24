
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
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

