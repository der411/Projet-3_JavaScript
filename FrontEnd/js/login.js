document.addEventListener("DOMContentLoaded", async function () {
  // Chargement et initialisation du comportement dynamique de la page après son chargement complet.
  const portfolioSection = document.getElementById("portfolio");
  if (portfolioSection) {
    await filterButtons();  // Appelle une fonction pour filtrer les boutons (fonction du fichier script.js).
  }
  const token = localStorage.getItem("token");
  basculerLoginLogout(!!token); // Convertit le token en booléen pour gérer l'affichage des éléments UI de connexion.

  const btn = document.querySelector("#btn");
  const email = document.querySelector("#email");
  const password = document.querySelector("#password");

  if (btn && email && password) {
    btn.addEventListener("click", async (e) => {
      e.preventDefault(); // Empêche le comportement par défaut du bouton (soumission du formulaire).
      if (validerFormulaire(email, password)) {
        await userLogin(email.value, password.value); // Se connecte si le formulaire est valide.
      }
    });
  }

  async function userLogin(email, password) {
    // Fonction pour connecter l'utilisateur en utilisant les API.
    const loginUrl = "http://localhost:5678/api/users/login";
    const loginData = { email, password };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    };

    try {
      const response = await fetch(loginUrl, requestOptions);
      if (!response.ok) {
        throw new Error("Echec de la connexion");
      }
      const data = await response.json();
      localStorage.setItem("token", data.token); // Stocke le token dans le localStorage.
      basculerLoginLogout(true); // Met à jour l'interface utilisateur en état connecté.
      window.location.href = "./index.html"; // Redirige vers la page principale.
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
    }
  }
});

function validerFormulaire(email, password) {
  // Vérifie la validité des entrées du formulaire de connexion.
  if (email.value === "" || password.value === "") {
    alert("Veuillez entrer un email et un mot de passe");
    return false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    alert("Veuillez entrer un email valide");
    return false;
  }
  return true;
}

function basculerLoginLogout(isLoggedIn) {
  // Fonction pour basculer l'affichage des éléments UI en fonction de l'état de connexion.
  const loginLink = document.getElementById("loginItem");
  const logoutLink = document.getElementById("logoutItem");
  const topBanner = document.getElementById("topBanner");
  const filterButtonsContainer = document.querySelector(".filter-buttons");
  const editLink = document.querySelector(".edit-link");

  if (loginLink && logoutLink) {
    loginLink.classList.toggle("hide", isLoggedIn);
    logoutLink.classList.toggle("hide", !isLoggedIn);
  }

  if (topBanner) {
    topBanner.classList.toggle("show", isLoggedIn);
  }

  if (filterButtonsContainer) {
    filterButtonsContainer.classList.toggle("hide", isLoggedIn);
  }
  if (editLink) {
    editLink.classList.toggle("hide", !isLoggedIn);
  }
}

function logout() {
  // Fonction pour déconnecter l'utilisateur.
  localStorage.removeItem("token"); // Supprime le token du localStorage.
  basculerLoginLogout(false); // Met à jour l'interface utilisateur en état non connecté.
  window.location.href = "/login"; // Redirige vers la page de connexion.
}
