document.addEventListener('DOMContentLoaded', () => {
  let modal = document.querySelector('.js-modal');

  // Fonction pour stopper la propagation des événements
  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  // Fonction pour fermer la modale
  const closeModal = (e) => {
    console.log('Fermeture de la modale demandée');
    if (modal === null) return;
    e.preventDefault();
    e.stopPropagation();
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    modal.removeAttribute('aria-modal');
    modal.removeEventListener('click', closeModal);
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal);
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation);
    modal = null;
  };

  // Fonction pour ouvrir la modale
  const openModal = (e) => {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute('href'));
    target.style.display = null;
    target.removeAttribute('aria-hidden');
    target.setAttribute('aria-modal', 'true');
    modal = target;
    modal.addEventListener('click', closeModal);
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal);
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation);
  };

  if (modal) {
    document.getElementById('edit-link').addEventListener('click', openModal);
  }

  // Fonction pour afficher la vue d'ajout de photo
  const showAddPhotoView = () => {
    document.getElementById('gallery-view').style.display = 'none';
    document.getElementById('add-photo-view').style.display = 'block';
    document.getElementById('button-back').style.visibility = 'visible';
    document.getElementById('submit-photo').addEventListener('click', (e) => {
      e.preventDefault();
      addWork();
    });
  };

  // Fonction pour retourner à la vue de la galerie
  const showGalleryView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.trace('Trace pour deleteWork');
    document.getElementById('add-photo-view').style.display = 'none';
    document.getElementById('gallery-view').style.display = 'block';
    document.getElementById('button-back').style.visibility = 'hidden';
  };

  // Ajout des gestionnaires d'événements pour la gestion des vues
  document.getElementById('button-add-photo').addEventListener('click', () => {
    console.log('Ajouter photo cliqué');
    showAddPhotoView();
  });
  document.getElementById('close-modal').addEventListener('click', showGalleryView);
  document.getElementById('button-back').addEventListener('click', showGalleryView);
});

// Fonction asynchrone pour ajouter un travail

const categoryMap = {
  'objets': 1,
  'appartements': 2,
  'hotels & restaurants': 3,
};

const addWork = async () => {
  const title = document.getElementById('photo-title').value.trim();
  const fileInput = document.getElementById('file-upload');
  const imageFile = fileInput.files[0];
  const category = document.getElementById('photo-category').value;
  const categoryId = categoryMap[category]; 

  // S'assurer que tous les champs sont remplis
  if (!title || !imageFile || !categoryId === undefined) {
    alert('Merci de compléter tous les champs');
    return;
  }

  let formData = new FormData();
  formData.append('title', title);
  formData.append('image', imageFile);
  formData.append('category', categoryId); // Utiliser la chaîne de caractères directement

  try {
    const response = await fetch('http://localhost:5678/api/works', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'), // Ajoutez votre token d'autorisation
      },
      body: formData
    });

    const result = await response.json(); // Parsez la réponse en JSON
    if (response.ok) {
      console.log('Work ajouté avec succès', result);
      // Logique pour gérer la réussite (par exemple, fermer la modale et rafraîchir la liste)
    } else {
      console.error('Erreur lors de l\'ajout du work', result);
      // Logique pour gérer l'échec (par exemple, montrer un message à l'utilisateur)
    }
  } catch (error) {
    console.error('Erreur lors de la connexion à l\'API', error);
    // Logique pour gérer les erreurs réseau ou de connexion
  }
};

//Remplace la zone upload-area par l'aperçu de l'image sélectionnée
document.getElementById('file-upload').addEventListener('change', function() {
  const file = this.files[0];
  const uploadArea = document.querySelector('.upload-area');
  const uploadIcon = uploadArea.querySelector('.upload-icon');
  const addButton = uploadArea.querySelector('#button-upload-photo');
  const fileTypeText = uploadArea.querySelector('.file-types');
  const imagePreview = document.getElementById('image-preview');

  // Nettoyer le conteneur d'aperçu précédent
  imagePreview.innerHTML = '';

  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = function(e) {
      // Masquer les éléments non nécessaires
      uploadIcon.style.display = 'none';
      addButton.style.display = 'none';
      fileTypeText.style.display = 'none';

      // Créer et afficher l'aperçu de l'image
      const image = new Image();
      image.src = e.target.result;
      image.id = "image-preview";
      image.alt = "Aperçu de l'image";
      image.style.display = 'block';
      imagePreview.appendChild(image);
    };
    reader.onerror = function(error) {
      console.error('Erreur lors de la lecture du fichier:', error);
    };
    reader.readAsDataURL(file);
  } else {
    // Si aucun fichier n'est sélectionné ou si le type n'est pas supporté, réafficher les éléments
    uploadIcon.style.display = 'block';
    addButton.style.display = 'block';
    fileTypeText.style.display = 'block';
    console.error('Type de fichier non pris en charge ou aucun fichier sélectionné.');
  }
});

//Change la couleur du bouton Valider lorsqu'il est cliqué
document.addEventListener('DOMContentLoaded', function() {
  const submitButton = document.getElementById('submit-photo');
  
  submitButton.addEventListener('click', function() {
    submitButton.style.backgroundColor = '#306685';
  });
});




