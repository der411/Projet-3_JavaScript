//--------------------------------------------------------Les functions---------------------------------------------------//

const uploadArea = document.querySelector(".upload-area");
const uploadIcon = uploadArea.querySelector(".upload-icon");
const addButton = uploadArea.querySelector("#button-upload-photo");
const fileTypeText = uploadArea.querySelector(".file-types");
const imagePreview = document.getElementById("image-preview");
const submitButton = document.getElementById("submit-photo");

let modal = document.querySelector(".js-modal");

// Fonction pour stopper la propagation des événements
function stopPropagation(e) {
  e.stopPropagation();
}

// Fonction pour ouvrir la modale
function openModal(e) {
  e.preventDefault();
  const target = document.querySelector(e.target.getAttribute("href"));
  target.style.display = null;
  modal = target;
  modal.addEventListener("click", closeModal);
  modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
  modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation);
}

if (modal) {
  document.getElementById("edit-link").addEventListener("click", openModal);
}

// Fonction pour fermer la modale
function closeModal(e) {
  console.log("Fermeture de la modale demandée");
  if (modal === null) return;
  e.preventDefault();
  modal.style.display = "none";
  modal.removeEventListener("click", closeModal);
  modal.querySelector(".js-modal-close").removeEventListener("click", closeModal);
  modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation);
  modal = null;
}

// Fonction pour afficher la vue d'ajout de photo
function showAddPhotoView() {
  document.getElementById("gallery-view").style.display = "none";
  document.getElementById("add-photo-view").style.display = "block";
  document.getElementById("button-back").style.visibility = "visible";

  document.getElementById("submit-photo").addEventListener("click", (e) => {
    e.preventDefault();
    addWork(e);
  });
}

// Fonction pour retourner à la vue de la galerie
function showGalleryView(e) {
  e.preventDefault();
  document.getElementById("add-photo-view").style.display = "none";
  document.getElementById("gallery-view").style.display = "block";
  document.getElementById("button-back").style.visibility = "hidden";
}

// Fonction asynchrone pour récupérer les catégories
async function getCategories() {
  try {
    const response = await fetch("http://localhost:5678/api/categories", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"), // Token d'autorisation
      },
    });

    const categories = await response.json(); // Parse la réponse en JSON

    if (response.ok) {
      console.log("Catégories récupérées avec succès", categories);
      const select = document.getElementById("photo-category");

      // Création d'une option vide par défaut
      const defaultOption = document.createElement("option");
      defaultOption.value = "";
      defaultOption.text = "";
      select.appendChild(defaultOption);

      // Ajout des catégories
      categories.forEach((category) => {
        const option = document.createElement("option");
        option.value = category.id;
        option.text = category.name;
        select.appendChild(option);
      });
    } else {
      console.error("Erreur lors de la récupération des catégories", categories);
    }
  } catch (error) {
    console.error("Erreur lors de la connexion à l'API", error);
  }
}
// Appel la fonction getCategories au chargement de la page
window.onload = getCategories;


// Fonction asynchrone pour ajouter un work
async function addWork(e) {
  e.preventDefault();

  const title = document.getElementById("photo-title").value;
  const fileInput = document.getElementById("file-upload");
  const imageFile = fileInput.files[0];
  const categoryId = document.getElementById("photo-category").value;

  // Vérifie que tous les champs sont remplis
  if (!title || !imageFile || !categoryId) {
    alert("Merci de compléter tous les champs");
    return;
  }

  let formData = new FormData();
  formData.append("title", title);
  formData.append("image", imageFile);
  formData.append("category", categoryId);

  try {
    const response = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"), // Token d'autorisation
      },
      body: formData,
    });

    const result = await response.json(); // Parse la réponse en JSON
    if (response.ok) {
      console.log("Réponse de l'API: Work ajouté avec succès", result);
      submitButton.style.backgroundColor = "#1d6154";

      // Change la couleur du bouton en gris après 2 secondes
      setTimeout(function () {
        submitButton.style.backgroundColor = "#a7a7a7";
      }, 2000);

      uploadIcon.style.display = "block";
      addButton.style.display = "block";
      fileTypeText.style.display = "block";

      getWorks();
    } else {
      console.error("Erreur lors de l'ajout du work", result);
    }
  } catch (error) {
    console.error("Erreur lors de la connexion à l'API", error);
  }

  // Réinitialise les champs de formulaire après l'envoi de la requête
  document.getElementById("photo-title").value = "";
  document.getElementById("file-upload").value = "";
  document.getElementById("photo-category").value = "";
  document.getElementById("image-preview").innerHTML = "";
}

//--------------------------------------- Gestionnaires d'événements pour les vues -----------------------------------//

//Affichage de la deuxième vue(ajout de photo) lors du clic sur le bouton "Ajouter une photo"
document.getElementById("button-add-photo").addEventListener("click", () => {
  showAddPhotoView();
}); 
//Affichage de la première vue(galerie) lors de l'ouverture de la modale
document.getElementById("close-modal").addEventListener("click", showGalleryView);
//Affichage de la première vue(galerie) lors du clic sur le bouton "Retour"
document.getElementById("button-back").addEventListener("click", showGalleryView);

//Remplace la zone upload-area par l'aperçu de l'image sélectionnée
document.getElementById("file-upload").addEventListener("change", function () {
  const file = this.files[0];

  // Nettoie le conteneur d'aperçu précédent
  imagePreview.innerHTML = "";

  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = function (e) {
      // Masque les éléments non nécessaires
      uploadIcon.style.display = "none";
      addButton.style.display = "none";
      fileTypeText.style.display = "none";

      // Crée et affiche l'aperçu de l'image
      const image = new Image();
      image.src = e.target.result;
      image.id = "image-preview";
      image.alt = "Aperçu de l'image";
      image.style.display = "block";
      imagePreview.appendChild(image);
    };
    reader.onerror = function (error) {
      console.error("Erreur lors de la lecture du fichier:", error);
    };
    reader.readAsDataURL(file);
  } else {
    // Si aucun fichier n'est sélectionné ou si le type n'est pas supporté, réafficher les éléments
    uploadIcon.style.display = "block";
    addButton.style.display = "block";
    fileTypeText.style.display = "block";
    console.error("Type de fichier non pris en charge ou aucun fichier sélectionné.");
  }
});
