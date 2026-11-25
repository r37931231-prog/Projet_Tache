import React from "react"; // importation de la bibliothèque React pour pouvoir utiliser JSX et les fonctionnalités de React
import ReactDOM from "react-dom/client"; // importation de la bibliothèque ReactDOM pour pouvoir rendre l'application React dans le DOM
import App from "./App.jsx"; // importation du composant principal de l'application, qui contient la logique et la structure de l'application

ReactDOM.createRoot(document.getElementById("root")).render( // cela permet de créer un élément racine pour l'application React et de le rendre dans l'élément HTML avec l'ID "root"
    <React.StrictMode> // cela permet d'activer le mode strict de React, qui aide à détecter les problèmes potentiels dans l'application
        <App /> // cela rend le composant App dans l'élément racine, ce qui permet d'afficher l'application React dans le navigateur
    </React.StrictMode> // cela permet de fermer le mode strict de React
);