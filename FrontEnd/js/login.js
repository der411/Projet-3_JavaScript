document.addEventListener("DOMContentLoaded", async function () {
  await filterButtons();
  
  const btn = document.querySelector("#btn");
  const email = document.querySelector("#email");
  const password = document.querySelector("#password");

  if (btn && email && password) {
    btn.addEventListener("click", async (e) => {
      e.preventDefault();
      if (validerFormulaire(email, password)) {
        await userLogin(email.value, password.value);
      }
    });
  }

  async function userLogin(email, password) {
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
      localStorage.setItem("token", data.token);
      basculerLoginLogout(true);
      setTimeout(() => {
        window.location.href = "./index.html";
      }, 1000);
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
    }
  }
});


function validerFormulaire(email, password) {
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
        console.log("Modification de l'état des boutons de filtrage", isLoggedIn ? "hide" : "show");
        filterButtonsContainer.classList.toggle("hide", isLoggedIn);
    }
    if (editLink) {
      editLink.classList.toggle("hide", !isLoggedIn);
  }
}


function logout() {
  localStorage.removeItem("token"); // Supprimer le token
  basculerLoginLogout(false); // Mettre à l'état non connecté
  window.location.href = "/login"; // Redirige vers la page de connexion
}