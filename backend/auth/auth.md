# Authentification avec Express.js

_Vous pouvez reprendre le code du cours d'avant pour suivre celui-là._

L'authentification englobe tout ce qui est création de compte, connexion, autorisation d'accès aux routes privées, déconnexion, etc.
Dans ce doc, on va utiliser <a href="https://en.wikipedia.org/wiki/Argon2" target="_blank">`argon2`</a> pour hasher les mots de passe, et <a href="https://en.wikipedia.org/wiki/JSON_Web_Token" target="_blank">`JWT`</a> pour la génération de tokens de connexion.

Installez `argon2` et `jsonwebtoken` (`npm i argon2 jsonwebtoken`).

On va évidemment commencer par la création de compte:

`index.js`

```js
import express from "express";
import authRouter from "./routers/auth.router.js";

const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json());

//NOTE: les routers + la route "/" d'avant...

app.use("/auth", authRouter);

app.listen(PORT, () => {});
```

`./routers/auth.router.js`

```js
import express from "express";
import authController from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);

export default router;
```

`./services/auth.service.js`

```js
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const register = (data) => {
  //TODO: à compléter
};

const login = (data) => {
  //TODO: à compléter
};

export default { register, login };
```

`./controllers/auth.controller.js`

```js
import authService from "../services/auth.service.js";

const register = (req, res) => {
  //TODO: à compléter
};

const login = (req, res) => {
  //TODO: à compléter
};

export default { register, login };
```

`./middlewares/auth.middleware.js`

```js
const verifyAuth = (req, res, next) => {
  //TODO: compléter
};

export default verifyAuth;
```

Si vous lancez la commande `node index.js`, l'API devrait afficher `working!` [ici](http://localhost:4000).

## Création de compte

**Il ne faut absolument jamais, en aucun cas, stocker de mots de passe en clair!** Il faut stocker un <a href="https://en.wikipedia.org/wiki/Hash_function" target="_blank">`hash`</a> du mot de passe. En gros c'est une fonction mathématique pour transformer le mot de passe en chaîne de caractères indéchiffrable.
Ici nous allons donc utiliser `argon2`, spécifiquement `argon2id`.

`./controllers/auth.controller.js`

```js
import express from "express";
import argon2 from "argon2";

//TODO: argon2 renvoie une promesse, et on a besoin d'attendre la fin de la promesse pour continuer donc async/await
const register = async (req, res) => {
  const hash = await authService.register(req.body);
  console.log(hash);
  res.end();
};

const login = (req, res) => {
  //TODO; compléter
};

export default { register, login };
```

`./services/auth.service.js`

```js
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import crypto from "crypto";

//TODO: argon2 renvoie une promesse, et on a besoin d'attendre la fin de la promesse pour continuer donc async/await
const register = async (data) => {
  const { username, password } = data;
  const hash = await argon2.hash(password, { type: argon2.argon2id });
  return hash;
};

const login = async (data) => {
  //TODO: à compléter
};

export default { register, login };
```

Et voilà! En faisant une requête POST sur `/auth/register`, avec un body contenant par ex. `{'username': 'test', 'password': 'test'}`, la console devrait afficher le hash du mot de passe.

Pour la connexion, il faut re-hasher le mot de passe avec les mêmes paramètres qu'à la création du compte. `argon2` fait tout ça pour nous:

`./controllers/auth.controller.js`

```js
import authService from "../services/auth.service.js";

const register = async (req, res) => {
  const hash = await authService.register(req.body);
  console.log(hash);
  res.end();
};

//TODO: argon2 renvoie une promesse, et on a besoin d'attendre la fin de la promesse pour continuer donc async/await
const login = async (req, res) => {
  const token = await authService.login(req.body);
  if (token === "") {
    res.status(403).end();
  }
  console.log(token);
  res.end();
};

export default { register, login };
```

`./services/auth.service.js`

```js
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const register = async (data) => {
  const { username, password } = data;
  const hash = await argon2.hash(password, { type: argon2.argon2id });
  return hash;
};

//TODO: argon2 renvoie une promesse, et on a besoin d'attendre la fin de la promesse pour continuer donc async/await
const login = async (data) => {
  const { username, password } = data;
  //NOTE: imaginez qu'on récupère le hash de la DB...
  const hash =
    "$argon2id$v=19$m=65536,t=3,p=4$QeSNbdMgx/2AqUoC31WURw$z4CCg1zxS5+X4NIvrkz9F/GXICLAUZVwtKCZGAoIvdQ";
  const match = await argon2.verify(hash, password);
  if (match) {
    console.log("password correct!");
  } else {
    console.log("password incorrect.");
  }
};

export default { register, login };
```

Si vous essayez de vous connecter avec le même mot de passe, `password correct!` devrait s'afficher dans la console.

## JWT

Après avoir vérifié les identifiants de l'utilisateur, il faut un moyen de faire durer cette autorisation. Pour ça, on va utiliser un JWT ici, mais il y a d'autres manières de faire (et plus sécurisées).

Pour générer un JWT, on va utiliser `jsonwebtoken`:

`./services/auth.service.js`

```js
import argon2 from "argon2";

//TODO: argon2 renvoie une promesse, et on a besoin d'attendre la fin de la promesse pour continuer donc async/await
const register = async (data) => {
  const { username, password } = data;
  const hash = await argon2.hash(password, { type: argon2.argon2id });
  return hash;
};

const login = async (data) => {
  const { username, password } = data;
  //NOTE: imaginez qu'on récupère le hash de la DB...
  const hash =
    "$argon2id$v=19$m=65536,t=3,p=4$QeSNbdMgx/2AqUoC31WURw$z4CCg1zxS5+X4NIvrkz9F/GXICLAUZVwtKCZGAoIvdQ";
  const match = await argon2.verify(hash, password);
  if (match) {
    const token = jwt.sign({ id: 1 }, crypto.randomBytes(32));
    return token;
  } else {
    return "";
  }
};

export default { register, login };
```

Ce token a autant de pouvoir que le mot de passe de l'utilisateur! (Voire plus!). Il faut le stocker de manière sécurisée sur le client, c.-à-d. dans un cookie `httpOnly`, `SameSite=strict` (si possible) et `Secure`.

`httpOnly` veut dire que le cookie est inaccessible depuis le JS.  
`SameSite=strict` veut dire que le cookie ne sera envoyé qu'au domaine qui l'a créé.  
`Secure` veut dire que le cookie ne sera transmis seulement si la connexion est faite en `https`, pas en `http`.

`./services/auth.controller.js`

```js
import authService from "../services/auth.service.js";

const register = async (req, res) => {
  const hash = await authService.register(req.body);
  console.log(hash);
  res.end();
};

//TODO: argon2 renvoie une promesse, et on a besoin d'attendre la fin de la promesse pour continuer donc async/await
const login = async (req, res) => {
  const token = await authService.login(req.body);
  if (token === "") {
    res.status(403).end();
  }
  res.cookie("Authorization", `Bearer ${token}`, {
    domain: "example.com",
    path: "/",
    secure: true,
    httpOnly: true,
    sameSite: "strict",
  });
  res.status(200).end();
};

export default { register, login };
```

## Middleware

Comme expliqué au cours précedent, un middleware permet d'exécuter du code avant une ou plusieurs routes. C'est un parfait cas d'utilisation pour l'autorisation d'accéder à des routes privées!

`./middlewares/auth.middleware.js`

```js
const verifyAuth = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    res.sendStatus(401);
    return;
  }

  try {
    const decoded = jwt.verify(token);
    //NOTE: token valide!
    //NOTE: on ajoute les données du token à la requête
    req.user = decoded;
    //NOTE: on passe au middleware ou la route suivante
    next();
  } catch (err) {
    //NOTE: token invalide!
    res.sendStatus(403);
    return;
  }
};

export default verifyAuth;
```

On peut maintenant ajouter ce middleware aux routes et routeurs qui en ont besoin, et voilà!. L'identifiant de l'utilisateur sera dans `req.user.id`;

## Exercice

Ajoutez de l'authentification au précédent cours.
