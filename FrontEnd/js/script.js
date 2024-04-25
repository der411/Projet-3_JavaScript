/**
 * @param {number} categoryId - L'ID de la catégorie sélectionnée. Par défaut, c'est 0, ce qui signifie que toutes les works sont affichées.
 * @returns {Promise<void>} Une promesse qui se résout lorsque la liste des works est remplie.
 */

//Fonction pour récupérer et filtrer les works
async function getWorks(categoryId = 0) {
  try {
    // Fait une requête HTTP pour récupérer la liste des works depuis l'API.
    const response = await fetch("http://localhost:5678/api/works");
    const data = await response.json();

    const gallery = document.querySelector(".gallery");
    const galleryModal = document.querySelector(".gallery-modal");

    if (!gallery || !galleryModal) {
      return; // S'arrête ici si l'une des galeries n'existe pas
    }

    gallery.innerHTML = ""; // Vide la galerie avant de la remplir avec les works filtrés
    galleryModal.innerHTML = ""; // Vide également la galerie modal

    // Filtrage des works basé sur l'ID de catégorie
    let dataFiltrees =
      categoryId === 0 ? data : data.filter((work) => work.categoryId === categoryId);

    // Parcours chaque work dans les données filtrées
    for (let i = 0; i < dataFiltrees.length; i++) {
      const work = dataFiltrees[i]; // Obtient le work actuel dans la boucle.

      // Crée un élément HTML "figure" pour chaque work pour la galerie principale.
      const figure = document.createElement("figure");
      figure.setAttribute("data-id", work.id);

      const img = document.createElement("img");
      img.setAttribute("src", work.imageUrl);
      img.setAttribute("alt", work.title);

      const figcaption = document.createElement("figcaption");
      figcaption.innerText = work.title;

      figure.appendChild(img);
      figure.appendChild(figcaption);
      gallery.appendChild(figure);

      // Création et ajout à la galerie modal sans légende
      const figureModal = document.createElement("figure");
      figureModal.setAttribute("data-id", work.id);

      const imgModal = document.createElement("img");
      imgModal.setAttribute("src", work.imageUrl);
      imgModal.setAttribute("alt", work.title);

      // Création du bouton qui contiendra l'icône
      const deleteButton = document.createElement("button");
      deleteButton.setAttribute("type", "button");
      deleteButton.classList.add("btn", "delete-button", "js-modal-stop");
      deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';

      deleteButton.onclick = function (event) {
        event.preventDefault();
        event.stopPropagation();
        deleteWork(work.id);
        console.log("Clic sur l’icône de suppression traité pour workId:", work.id);
      };

      figureModal.appendChild(imgModal);
      figureModal.appendChild(deleteButton);
      galleryModal.appendChild(figureModal);
    }
  } catch (error) {
    console.error("Une erreur est survenue :", error);
  }
}

//Fonction pour la suppression des works
async function deleteWork(workId) {
  try {
    const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    if (response.ok) {
      console.log("Supprimé avec succès");
      const elementToRemove = document.querySelector(`figure[data-id="${workId}"]`);
      if (elementToRemove) {
        elementToRemove.remove(); // Retire l'élément du DOM.
      }
    } else {
      console.error("Erreur lors de la suppression");
    }
  } catch (error) {
    console.error("Erreur au cours du processus de suppression", error);
  }
}

//Fonction pour afficher les boutons de filtrage
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

getWorks();
