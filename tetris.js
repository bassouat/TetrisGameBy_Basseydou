
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

