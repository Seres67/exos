# Express.js

L'objectif de cet exercice est d'apprendre les bases du module `http`, puis de `express.js`.

_Idéalement, ne copiez/collez pas le code, mais comprenez ce que chaque ligne fait, pour apprendre plus facilement._

Créez un dossier, mettez ce fichier dedans et lancez la commande `npm i express.js` dans ce dossier. Créez un fichier `index.js` et testez le code que je présente dans ce fichier.

## Quelques explications

`http` est un module très rudimentaire, avec peu de QoL. Faire des choses comme gérer des paramètres, est très complexe (c.-à-d.: il faut écrire beacoup de code).
`express` est construit au dessus de `http`, et embarque des fonctionnalités comme la gestion des paramètres, des routers, etc.

## Créer le serveur

Le serveur écoute sur le port (spécifié plus tard) pour toute connexion entrante, et exécuter le code qu'on a défini.

```js
import http from "http"; //NOTE: Import du module http

//NOTE: Création du serveur + de la réponse. La fonction anonyme (_callback_) est appelée pour chaque requête (`req`) entrante. On peut y répondre avec `res`.
const server = http.createServer((req, res) => {
  //NOTE: envoi d'une réponse partielle au client
  res.write("working!");
  //NOTE: termine la réponse
  res.end();
});
```

En l'état, ce code est prêt à répondre aux requêtes entrantes mais ne peut pas en recevoir car il n'écoute pas sur un port. Pour écouter sur un port, il faut utiliser la méthode <a href="https://nodejs.org/api/http.html#serverlisten" target="_blank">http.Server#listen</a>.

## Écouter sur un port

```js
import http from "http";

const PORT = process.env.PORT || 4000; //NOTE: Soit on récupère le port de la variable d'environnement `PORT`, soit 4000 si `PORT` n'est pas définie.

const server = http.createServer((req, res) => {
  res.write("working!");
  res.end();
});

server.listen(PORT); //NOTE: Commencer l'écouter sur le `PORT` défini.
```

On peut maintenant lancer le serveur avec la commande `node <chemin du fichier js>`.  
Si la variable d'env `PORT` n'existe pas, le serveur écoutera sur le port 4000 (nous l'avons spécifié à la ligne 3): <a href="http://localhost:4000" target="_blank">URL</a>

## Les routes

En l'état, le serveur n'a aucune route, et répondra toujours `working!`, qu'importe le chemin spécifié (ex: <a href="http://localhost:4000/test" target="_blank">test</a>).

Pour ça, il faut les gérer manuellement. La méthode naïve serait de faire une `forêt de ifs`:

```js
import http from "http";

const PORT = process.env.PORT || 4000;

const server = http.createServer((req, res) => {
  if (req.url === "/") res.write("working!");
  else if (req.url === "/test") res.write("test!");
  // etc. etc.
  else {
    //NOTE: si pas de route trouvée, renvoyer une erreur 404
    res.statusCode = 404;
    res.write(`Cannot ${req.method} ${req.url}`);
  }
  res.end();
});

server.listen(PORT);
```

Ce code fonctionne, mais devient vite illisible et donc pas maintenable.

Il existe une autre façon de faire, un peu plus pratique:

```js
import http from "http";

const PORT = process.env.PORT || 4000;

//NOTE: controller index
const index = (req, res) => {
  res.write("working!");
  res.end();
};

//NOTE: controller test
const test = (req, res) => {
  res.write("test!");
  res.end();
};

//NOTE: array de toutes les routes et le controller associé
const routes = [
  { url: "/", controller: index },
  { url: "/test", controller: test },
];

const server = http.createServer((req, res) => {
  for (const route of routes) {
    if (req.url === route.url) {
      route.controller(req, res);
      return; //NOTE: on ne continue pas la requête si on trouve une route
    }
  }

  res.statusCode = 404;
  res.write(`Cannot ${req.method} ${req.url}`);
  res.end();
});

server.listen(PORT);
```

Bien que ce code soit fonctionnel (c.-à-d.: il fonctionne) et qu'il soit un peu plus facilement maintenable, ce n'est toujours pas idéal.  
On va donc déleguer la partie maintenance à des personnes motivées et utiliser `express.js`. `express.js` utilise le module `http`, et facilite son utilisation.
Voici le code ci-dessus utilisant `express.js`:

```js
import express from "express";

const PORT = process.env.PORT || 4000;

//NOTE: remplace http.createServer(...)
const app = express();

const index = (req, res) => {
  res.send("working!");
};

const test = (req, res) => {
  res.send("test!");
};

//NOTE: app.get emplace le if(req.method === "GET") + if (req.url === "/")
// et il n'y a plus besoin de l'array `routes`, express le gère pour nous
app.get("/", index);
app.post("/test", test);

app.listen(PORT);
```

J'ai gardé le plus de code similaire possible, pour mettre en avant les différences.

## Les paramètres de routes

Les paramètres de routes permettent de capturer des valeurs dans l'url de la requête, par exemple avec l'endpoint '/:id', on peut récupérer la valeur de `id` dans le controller.

```js
import express from "express";

const PORT = process.env.PORT || 4000;

//NOTE: remplace http.createServer(...)
const app = express();

//NOTE: changement de la fonction index en fonction anonyme
app.get("/", (req, res) => {
  res.send("working!");
});

//NOTE: ici on peut récupérer `id`
app.get("/:id", (req, res) => {
  const id = req.params.id;
  res.send(`got id: ${id}`);
});

app.listen(PORT);
```

⚠️ `id` sera toujours de type `string`! C'est à vous de vérifier que `id` contient bien ce que vous attendez, et à le convertir en fonction de vos besoins. ⚠️

## Les routers

Les routers servent à plusieurs choses: regrouper les endpoints d'une même "catégorie", appliquer des middlewares (on en parlera plus tard) à l'ensemble des endpoints du router, etc.
Imaginons qu'on a une application avec des utilisateurs.

Sans router, ça donne ça:

```js
import express from "express";

const PORT = process.env.PORT || 4000;

//NOTE: remplace http.createServer(...)
const app = express();

//NOTE: changement de la fonction index en fonction anonyme
app.get("/", (req, res) => {
  res.send("working!");
});

app.get("/users", (req, res) => {
  const users = []; //NOTE: imaginez que je récupère mes utilisateurs de ma BDD ici...
  res.send(users);
});

//NOTE: ici on peut récupérer `id`
app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  const user = {}; //NOTE: imaginez que je récupère l'utilisateur avec l'id spécifié...
  res.send(user);
});

app.listen(PORT);
```

Je vous laisse imaginer la taille du fichier `index.js` si vous faites le <a href="https://en.wikipedia.org/wiki/Create,_read,_update_and_delete" target="_blank">`CRUD`</a> de `users`, `posts`, `comments`, ...

---

Avec router, on peut avoir, dans notre `index.js`:

```js
import express from "express";
import userRouter from "./user.router.js";

const PORT = process.env.PORT || 4000;

//NOTE: remplace http.createServer(...)
const app = express();

//NOTE: changement de la fonction index en fonction anonyme
app.get("/", (req, res) => {
  res.send("working!");
});

//NOTE: app.use() dit à notre serveurs d'utiliser notre routeur pour les routes commencant par `/users`
app.use("/users", userRouter);

app.listen(PORT);
```

Et dans un nouveau fichier `user.router.js`:

```js
import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  const users = [];
  res.send(users);
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const user = {};
  res.send(user);
});

export default router;
```

Et tout marchera de la même manière, tout en structurant mieux le code (<a href="https://en.wikipedia.org/wiki/Separation_of_concerns" target="_blank">`Separation of concerns`</a>).

Il est possible de chaîner les routers, toujours pour mieux structurer le code, les routes et faciliter la maintenance.  
Pour ça, il faut créer les routers qui sont chaînés avec l'option `mergeParams`:

`post.router.js`

```js
import express from "express";

const router = express.Router({ mergeParams: true });

router.get("/", (req, res) => {
  const posts = [];
  res.send(posts);
});

router.get("/:postId", (req, res) => {
  //NOTE: remarquez qu'on récupère userId ici
  const { userId, postId } = req.params;
  const post = {};
  res.send(user);
});

export default router;
```

`index.js`

```js
import express from "express";
import userRouter from "./user.router.js";
import postRouter from "./post.router.js";

const PORT = process.env.PORT || 4000;

const app = express();

app.get("/", (req, res) => {
  res.send("working!");
});

//NOTE: on chaîne le router post avec celui de user
userRouter.use("/:userId/posts", postRouter);
app.use("/users", userRouter);

app.listen(PORT);
```

## Les middlewares

Les middlewares sont des bouts de codes qui s'exécutent avant une partie ou toutes les requêtes entrantes. Ils permettent de modifier les requêtes entrantes pour, par ex. faciliter le traitement des données.
Exemples courants: vérifier l'authentification, parser le `body` en JSON, ...

Exemple de middleware très basique:

user.controller.js

```js
import express from "express";

const router = express.Router();

//NOTE: les middlewares sont des fonctions comme les autres
const middleware = (req, res, next) => {
  console.log("endpoint user appelé!");
  //NOTE: next() dit a express de passer au prochain middleware ou à la route
  next();
};

const middleware2 = (req, res, next) => {
  console.log("endpoint avec paramètre de route appelé!");
  next();
};

//NOTE: on dit a notre router d'utiliser ce middleware
router.use(middleware);

router.get("/", (req, res) => {
  const users = [];
  res.send(users);
});

//NOTE: on applique `middleware2` uniquement à cette route précise!
router.get("/:id", middleware2, (req, res) => {
  const id = req.params.id;
  const user = {};
  res.send(user);
});

export default router;
```

Le router `express.json()` est très important et pratique pour faire des API Rest! N'oubliez pas de l'ajouter à votre serveur. (avec `app.use()`, comme vu juste au-dessus).

## Exercice

Imaginez un forum, assez basique. Il va falloir gérer des utilisateurs, des posts, des commentaires, etc. avec tout le CRUD qui va avec.  
N'implémentez pas de création de compte, d'authentification, etc. Un prochain cours arrivera sur ce sujet.

Le tableau ci-dessous peut être utilisé si vous êtes en galère.

<details>
<summary><small>Afficher le tableau des endpoints</small></summary>
<h3>Types</h3>

<pre><code>interface User {
    id: number;
    username: string;
    password: string;
};

interface Post {
    id: number;
    title: string;
    content: string;
    userId: number; //NOTE: osef de ça pour l'instant
};

interface Comment {
    id: number;
    content: string;
    userId: number; //NOTE: osef de ça pour l'instant
    postId: number; //NOTE: osef de ça pour l'instant
};
</code></pre>

| Endpoint                                         | Méthode | Paramètres attendus                                  | Données attendues             | Données renvoyées     | Commentaires                                |
| ------------------------------------------------ | ------- | ---------------------------------------------------- | ----------------------------- | --------------------- | ------------------------------------------- |
| /users                                           | GET     |                                                      |                               | tableau de `User`s    | Récupérer tous les utilisateurs             |
| /users/:userId                                   | GET     | `userId: number;`                                    |                               | `User`                | Récupérer un utilisateur à partir de son ID |
| /users                                           | POST    |                                                      | `User`                        | `User`                | Créer un nouvel utilisateur                 |
| /users/:userId                                   | PATCH   | `userId: number;`                                    | `User`, partiel ou complet    | `User`                | Modifier les informations d'un utilisateur  |
| /users/:userId                                   | DELETE  | `userId: number;`                                    |                               |                       | Supprimer un utilisateur                    |
| /users/:userId/posts                             | GET     | `userId: number;`                                    |                               |                       | Récupérer tous les posts d'un utilisateur   |
| /users/:userId/posts/:postId                     | GET     | `userId: number; postId: number;`                    |                               |                       | Récupérer un post d'un utilisateur          |
| /users/:userId/posts                             | POST    | `userId: number;`                                    | `Post`                        | `Post`                | Créer un nouveau post                       |
| /users/:userId/posts/:postId                     | PATCH   | `userId: number; postId: number;`                    | `Post`, partiel ou complet    | `Post`                | Modifier les informations d'un post         |
| /users/:userId/posts/:postId                     | DELETE  | `userId: number; postId: number;`                    |                               |                       | Supprimer un post                           |
| /users/:userId/posts/:postId/comments            | GET     | `userId: number; postId: number;`                    |                               | tableau de `Comment`s | Récupérer tous les commentaires d'un post   |
| /users/:userId/posts/:postId/comments/:commentId | GET     | `userId: number; postId: number; commentId: number`  |                               | `Comment`             | Récupérer un commentaire d'un post          |
| /users/:userId/posts/:postId/comments            | POST    | `userId: number; postId: number;`                    | `Comment`                     | `Comment`             | Créer un nouveau commentaire                |
| /users/:userId/posts/:postId/comments/:commentId | PATCH   | `userId: number; postId: number; commentId: number`  | `Comment`, partiel ou complet | `Comment`             | Modifier les informations d'un commentaire  |
| /users/:userId/posts/:postId/comments/:commentId | DELETE  | `userId: number; postId: number; commentId: number;` |                               |                       | Supprimer un commentaire                    |

</details>
<br/>
Une solution complète peut être demandée, si je considère qu'un travail suffisant à été fourni.
