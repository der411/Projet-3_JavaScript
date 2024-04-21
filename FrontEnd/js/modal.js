document.addEventListener("DOMContentLoaded", function () {
  // Fonction pour ouvrir la modale
  const openModal = function (e) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute("href"));
    target.style.display = null;
    target.removeAttribute("aria-hidden");
    target.setAttribute("aria-modal", "true");
    modal = target;
    modal.addEventListener("click", closeModal);
    modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
    modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation);
  };

  // Fonction pour fermer la modale
  const closeModal = function (e) {
    if (modal === null) return;
    e.preventDefault();
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal");
    modal.removeEventListener("click", closeModal);
    modal.querySelector(".js-modal-close").removeEventListener("click", closeModal);
    modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation);
    modal = null;
  };

  // Fonction pour empêcher la propagation des événements
  const stopPropagation = function (e) {
    e.stopPropagation();
  };

  let modal = document.querySelector(".js-modal");

  if (modal) {
    modal.addEventListener("click", openModal);
  }

  // Fonction pour changer à la vue d'ajout de photo
  function showAddPhotoView() {
    document.getElementById("gallery-view").style.display = "none";
    document.getElementById("add-photo-view").style.display = "block";
    document.getElementById("button-back").style.visibility = "visible";
  }

  // Fonction pour revenir à la vue de la galerie
  function showGalleryView() {
    document.getElementById("add-photo-view").style.display = "none";
    document.getElementById("gallery-view").style.display = "block";
    document.getElementById("button-back").style.visibility = "hidden";
  }

  // Ajout des gestionnaires d'événements
  document.getElementById("button-add-photo").addEventListener("click", showAddPhotoView);
  document.getElementById("close-modal").addEventListener("click", showGalleryView);

  // Ajout de l'écouteur d'événements pour le bouton de retour
  let backButton = document.getElementById("button-back");
  if (backButton) {
    backButton.addEventListener("click", function () {
      // Fonction pour revenir à la première page de la modale
      showGalleryView();
    });
  }
});
