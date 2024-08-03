# Portfolio-architecte-sophie-bluel ![JavaScript](https://img.shields.io/badge/-JavaScript-yellow) ![Node.js](https://img.shields.io/badge/-Node.js-green) ![CSS](https://img.shields.io/badge/-CSS-1572B6?logo=css3&logoColor=white) ![HTML](https://img.shields.io/badge/-HTML-E34F26?logo=html5&logoColor=white)

L'application est une plateforme de gestion de galerie d'art en ligne, conçue pour permettre aux administrateurs de facilement gérer et afficher des œuvres d'art. Elle offre des fonctionnalités telles que l'authentification des administrateurs, l'ajout, la modification et la suppression d'œuvres, ainsi qu'un affichage dynamique des projets. L'interface inclut également des filtres de recherche pour faciliter la navigation parmi les œuvres.

# Aperçu 🎨
[![Aperçu](https://live.staticflickr.com/65535/53899087157_d2b67e4920_n.jpg)](https://flic.kr/p/2q7SUNa)

# Installation 🔧
1. Clonez le dépôt :
   git clone git@github.com:der411/Projet-3_javascript_Portfolio-architecte-sophie-bluel.git
2. Installez les dépendances :
   npm install
3. Démarrez l'application :
   npm start

# Fonctionnalités
- Gestion des utilisateurs : Connexion des administrateurs avec authentification.
- Galerie dynamique : Récupération des œuvres depuis le back-end et affichage dynamique.
- Filtres de recherche : Filtrage des œuvres par catégorie.
- Modale d'administration : Ajout, modification et suppression des œuvres via une interface modale.
- Gestion des erreurs : Affichage des messages d'erreur pour les actions non autorisées ou les formulaires incomplets.
- 
# Technologies Utilisées 🚀
- JavaScript : Pour la logique front-end et back-end.
- Node.js : Pour le serveur back-end.
- HTML/CSS : Pour la structure et le style de l'interface utilisateur.
- Postman/Swagger : Pour tester les API et explorer la documentation.
- 
# Contraintes Techniques et Fonctionnelles
- **Gestion de la modale** :
- Création et destruction dynamiques de la fenêtre modale pour éviter les duplications dans le DOM.
- Possibilité de fermer la modale en cliquant sur une croix ou en dehors.
- **Suppression d'œuvres** :
- Les œuvres peuvent être supprimées via un appel API et le DOM est mis à jour en conséquence sans rechargement de la page.
- **Ajout d'œuvres** :
- Envoi d'un nouveau projet via le formulaire intégré à la modale.
- Vérification des données avant envoi et gestion des erreurs.
- **Réactivité** :
- Le site est responsive et s'adapte aux différentes tailles d'écran (desktop, tablette, mobile).

# Information pour lancer le code ❗
 - Lancer le backend depuis votre terminal en suivant les instruction du fichier ReadMe.
 - Si vous désirez afficher le code du backend et du frontend, faites le dans 2 instances de VSCode différentes pour éviter tout problème
