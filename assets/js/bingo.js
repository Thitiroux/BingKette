//Tableau des contenus des cases du bingo (qui ne sera pas altéré, il sert de base pour le reset)
const cellContents = [
  "\"C'est trop\"",
  "Accuse le jeu de buguer",
  "\"Les gars\"",
  "Fait cramer son appart",
  "\"QUOI ?!\"",
  "Ment",
  "Ne comprend rien au jeu",
  "Mange",
  "Lit le chat de travers",
  "\"J'avais pas vu\"",
  "Accuse les autres de tricher",
  "Oublie les commandes du jeu",
  "\"C'est (trop) grave\"",
  "\"Je vais péter mon crâne\"",
  "Massacre un mot / expression / chanson",
  "\"Allô ?\"",
  "Prend la confiance (et se foire)",
  "\"C'est une dinguerie\"",
  "\"J'suis trop nul\"",
  "\"J'en peux plus\"",
  "\"C'est quoi ce truc de fou\"",
  "Fait un résumé tout pété",
  "\"Laisse-moi tranquille\"",
  "Commence une phrase pas \"Non mais\""
];

//Tableau des cases du bingo
let bingoCells = document.querySelectorAll(".bingo-cell");

//Initialisation des cases du bingo
resetBingo();

//Réinitialisation du bingo au clic sur le bouton reset et fermeture de la modale
document.querySelector(".reset-button").addEventListener("click", () => {
  resetBingo();
  modal.style.display = "none";
});

//Fontionnement des cases du bingo
for (let cell of bingoCells) {
  cell.addEventListener("click", () => {
    /**
     * Cochage/décochage de la case
     * La case "no-check" est celle du milieu, elle ne peut pas être cochée
     */
    if (!cell.classList.contains("no-check")) {
      cell.classList.toggle("checked");
      //Changement de l'opacité du texte de la case pour que le check-mark soit visible
      cell.children[0].classList.toggle("bingo-cell-text-opacity");
      if (cell.classList.contains("checked")) {
        //Affichage du check-mark
        let img = document.createElement("img");
        img.src = "assets/img/check.png";
        img.classList.add("check-img");
        cell.appendChild(img);
      } else {
        //Suppression du check-mark
        cell.removeChild(cell.querySelector(".check-img"));
      }
    }

    /**
     * Vérification de la victoire
     * Quand je coche une case, je vérifie si la ligne, la colonne ou la diagonale correspondante est complète
     */
    for (let cellClass of cell.classList) {
      if (cellClass !== "bingo-cell" && cellClass !== "checked") {
        console.log(cellClass);
        if (check(cellClass)) {
          modal.style.display = "block";
          break;
        }
      }
    }
  })
}

/**
 * Vérifie la victoire sur une ligne, une colonne ou une diagonale.
 * Pour ça, je récupère les classes de la case (row-1, column-2, etc.) et je vérifie si 5 cases de cette classe sont cochées.
 * Si c'est le cas, j'affiche la modale de victoire.
 * Je casse la boucle pour éviter de vérifier plusieurs fois la même ligne/colonne/diagonale (la victoire est unique).
 * Si la ligne complétée est la diagonale, la colonne centrale ou la ligne centrale, je calcule le score sur 4 cases.
 * @param {string} cellClass 
 * @returns boolean
 */
function check(cellClass) {
  let score4 = ['diag-1', 'diag-2', 'column-3', 'row-3'];
  let score = 0;
  let cells = document.querySelectorAll("." + cellClass);
  for (let cell of cells) {
    if (cell.classList.contains("checked")) {
      score += 1;
    }
  }

  if ((score4.includes(cellClass) && score == 4) || score == 5) {
    return true;
  }
}

/**
 * La fonction resetBingo réinitialise les cases du bingo.
 * Pour ça, je copie le tableau des contenus des cases pour ne pas l'altérer (je veux pouvoir réinitialiser le bingo à l'infini et éviter de recharger la page pour regénérer le tableau).
 * Je parcours ensuite les cases du bingo et je leur attribue un contenu aléatoire du tableau copié en évitant de réattribuer un contenu à la case du milieu et en supprimant le contenu au fur et à mesure dans le tableau cellContentsCopy pour éviter d'attribuer le même texte à deux cases différentes.
 */
function resetBingo() {
  let cellContentsCopy = [...cellContents];
  for (let cell of bingoCells) {
    if (!cell.classList.contains("no-check")) {
      cell.classList.remove("checked");
      cell.innerHTML = "";
      let text = document.createElement("p");
      let randomIndex = Math.floor(Math.random() * cellContentsCopy.length);
      text.innerHTML = cellContentsCopy[randomIndex];
      cellContentsCopy.splice(randomIndex, 1);
      cell.appendChild(text);
    }
  }
}

// Modale de victoire
var modal = document.getElementById("modal");
var span = document.getElementsByClassName("close")[0];

//Fermeture de la modale
span.onclick = () => {
  modal.style.display = "none";
}

//Fermeture de la modale au clic en dehors de celle-ci
window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}