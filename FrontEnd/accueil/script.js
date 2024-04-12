/**
 * @param {number} categoryId - L'ID de la catégorie sélectionnée. Par défaut, c'est 0, ce qui signifie que toutes les works sont affichées.
 * @returns {Promise<void>} Une promesse qui se résout lorsque la liste des works est remplie.
 */

async function getWorks(categoryId = 0) {
  try {
    // Fait une requête HTTP pour récupérer la liste des works depuis l'API.
    const response = await fetch("http://localhost:5678/api/works");
    const data = await response.json();

    const gallery = document.querySelector(".gallery"); // Selectionne le premier élément avec la classe "gallery"
    gallery.innerHTML = ""; // Vide la galerie avant de la remplir avec les works filtrés

    // Filtrage des works basé sur l'ID de catégorie
    let DataFiltrees;

    if (categoryId === 0) {
      DataFiltrees = data;
    } else {
      DataFiltrees = data.filter((work) => work.categoryId === categoryId); // Si l'ID de catégorie est 0, affiche toutes les works, sinon, filtre les works par ID de catégorie.
    }
    
    // Parcours chaque work dans les données filtrées avec une boucle for traditionnelle.
    for (let i = 0; i < DataFiltrees.length; i++) {
      const work = DataFiltrees[i]; // Obtient le work actuel dans la boucle.

      // Crée un élément HTML "figure" pour chaque work.
      const figure = document.createElement("figure");

      // Ajoute un attribut "data-id" à l'élément "figure" avec la valeur de l'ID du work.
      figure.setAttribute("data-id", work.id);

      // Crée un élément HTML "img" pour chaque work.
      const img = document.createElement("img");

      // Ajoute un attribut "src" à l'élément "img" avec la valeur de l'URL de l'image du work.
      img.setAttribute("src", work.imageUrl);

      // Ajoute un attribut "alt" à l'élément "img" avec la valeur du titre du work.
      img.setAttribute("alt", work.title);

      // Crée un élément HTML "figcaption" pour chaque work.
      const figcaption = document.createElement("figcaption");

      // Ajoute le titre du work à l'élément "figcaption".
      figcaption.innerText = work.title;

      // Ajoute l'élément "img" à l'élément "figure".
      figure.appendChild(img);

      // Ajoute l'élément "figcaption" à l'élément "figure".
      figure.appendChild(figcaption);

      // Ajoute l'élément "figure" à la galerie.
      gallery.appendChild(figure);
    }
  } catch (error) {
    // Affiche un message d'erreur dans la console en cas d'échec.
    console.log(error);
  }
}

async function filterButtons() {
  try {
    // Récupère les catégories depuis l'API
    const response = await fetch("http://localhost:5678/api/categories");
    const categories = await response.json();

    // Création et affichage des boutons de filtrage
    const portfolioSection = document.getElementById("portfolio");
    const title = portfolioSection.querySelector("h2");
    const buttonsContainer = document.createElement("div");
    buttonsContainer.setAttribute("class", "filter-buttons");

    // Créé le bouton "Tous" avec un id de 0
    const allButton = document.createElement("button");
    allButton.innerText = "Tous";
    allButton.setAttribute("data-category-id", 0);
    allButton.addEventListener("click", function () {
      getWorks(0); // 0 pour afficher toutes les works sans filtrage
    });
    buttonsContainer.appendChild(allButton);

    for (let i = 0; i < categories.length; i++) {
      const category = categories[i]; // Obtient la catégorie actuelle dans la boucle

      // Crée un élément HTML "button" pour chaque catégorie.
      const button = document.createElement("button");
      button.innerText = category.name; // Définit le texte du bouton avec le nom de la catégorie
      button.setAttribute("data-category-id", category.id); // Définit un attribut "data-category-id" avec l'ID de la catégorie

      // Ajoute un gestionnaire d'événements "click" au bouton
      button.addEventListener("click", function () {
        getWorks(category.id); // Appelle getWorks avec l'ID de la catégorie lorsque le bouton est cliqué
      });

      // Ajoute le bouton créé au conteneur de boutons
      buttonsContainer.appendChild(button);
    }

    title.insertAdjacentElement("afterend", buttonsContainer);
  } catch (error) {
    console.error("Erreur lors du chargement des catégories:", error);
  }
}

filterButtons();
getWorks();
