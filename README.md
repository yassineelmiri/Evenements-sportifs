# Evenements-sportifs

![image](https://github.com/user-attachments/assets/356b13e3-bf0c-47c3-9e31-f490eb13bff8)


### Par Yassine Elmiri

---

## Contexte du projet

Une organisation sportive souhaite mettre en place une application pour gérer les inscriptions à ses événements. Cette application offre à l’organisateur la possibilité de gérer les événements sportifs et les participants, tout en simplifiant le processus d'inscription.

Ce projet inclut :

- Gestion des événements sportifs (création, modification, suppression).
- Gestion des inscriptions aux événements (création et modification pour chaque participant).
- Génération et impression d'une liste des inscrits pour chaque événement.

---

## Fonctionnalités principales

### **Organisateur peut :**
- Créer, modifier et supprimer des événements sportifs.
- Gérer les inscriptions aux événements pour les participants.
- Générer et imprimer une liste des inscrits pour un événement.

---

## Tâches réalisées

### **Back-end**
- Création d'une API avec **Node.js** (Express.js) et **MongoDB**.
- Utilisation de **Mongoose** comme ODM pour la gestion de la base de données.
- Implémentation de tests unitaires pour chaque contrôleur (obligatoire).
- Gestion des erreurs grâce à un middleware personnalisé.
- Mise en place d'un middleware pour la sécurité et l'authentification via **JWT**.
- Protection des routes sensibles grâce à un système d'autorisation.

### **Front-end**
- Développement d'une application avec **React.js**.
- Utilisation des hooks React (**useState**, **useEffect**) pour gérer les états et les effets secondaires.
- Définition des routes à l'aide de **React Router** avec des routes imbriquées.
- Protection des routes pour empêcher l'accès non autorisé.
- Gestion des états globaux avec **Redux**.

### **Déploiement**
- Génération des images Docker pour le Back-end et le Front-end.
- Configuration d'un réseau Docker pour connecter les deux parties.

---

## Prérequis

- **Node.js** (version 16 ou supérieure)
- **MongoDB**
- **Docker** et **Docker Compose**
- **npm** ou **yarn**

---

## Installation

1. Clonez ce dépôt :
   ```bash
   git clone https://github.com/yassineelmiri/Evenements-sportifs.git
   cd Evenements-sportifs
   ```

2. Installez les dépendances pour le back-end :
   ```bash
   cd backend
   npm install
   ```

3. Configurez les variables d'environnement dans le fichier `.env` du back-end :
   ```plaintext
   PORT=5000
   MONGO_URI=<URL_MONGO_DB>
   JWT_SECRET=<VOTRE_SECRET_JWT>
   ```

4. Installez les dépendances pour le front-end :
   ```bash
   cd ../frontend
   npm install
   ```

5. Configurez les variables d'environnement dans le fichier `.env` du front-end :
   ```plaintext
   REACT_APP_API_URL=http://localhost:5000
   ```

6. Lancez l'application en mode développement :
   - Back-end :
     ```bash
     cd backend
     npm run dev
     ```
   - Front-end :
     ```bash
     cd frontend
     npm start
     ```

---

## Déploiement avec Docker

1. Créez les images Docker :
   ```bash
   docker-compose build
   ```

2. Lancez les conteneurs :
   ```bash
   docker-compose up
   ```

3. Accédez à l'application :
   - Front-end : [http://localhost:3000](http://localhost:3000)
   - Back-end : [http://localhost:5000](http://localhost:5000)

---

## Technologies utilisées

- **Back-end** : Node.js, Express.js, MongoDB, Mongoose, JWT
- **Front-end** : React.js, Redux, React Router
- **Tests** : Jest
- **Déploiement** : Docker, Docker Compose

---

## Auteur

**Yassine Elmiri**  
Développeur Full Stack Passionné 🚀  
[GitHub](https://github.com/yassineelmiri) | [LinkedIn](https://www.linkedin.com/in/yassine-elmiri/)

---

## Contribution

Les contributions sont les bienvenues ! Créez une **issue** ou un **pull request** pour toute suggestion ou amélioration.

