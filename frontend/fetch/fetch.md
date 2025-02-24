# Fetch

`fetch` sert à faire des requêtes `http`. En gros, on demande des données à un serveur, et on attend de les recevoir.

`fetch` est asynchrone (évidemment, c'est une requête http...). On peut donc utiliser `.then(...)` ou `async/await`.

_N'utilisez pas Postman ou autres (genre `Thunder Client` dans VSCode). Le but c'est d'apprendre la manière de faire en JS. Utilisez la console de votre navigateur à la place._

## GET

Pour récupérer des données (d'une API Rest par ex.), on utilise la méthode HTTP `GET`. Par défaut, `fetch` fait une requête `GET`.

On va utiliser <a href="https://reqres.in" target="_blank">`reqres`</a> ici, une API avec des données générées aléatoirement.

```js
fetch("https://reqres.in/api/users")
  .then((res) => res.json()) //NOTE: ici l'API envoie du JSON donc on converti ce qu'on recoit en JSON
  .then((json) => console.log(json));
```

Équivalent à:

```js
fetch("https://reqres.in/api/users", { method: "GET" })
  .then((res) => res.json())
  .then((json) => console.log(json));
```

## POST

Pour envoyer des données, on utilise la méthode HTTP `POST`.

Exemple pour envoyer du JSON:

```js
fetch("https://reqres.in/api/users", {
  method: "POST",
  body: JSON.stringify({ name: "test", job: "tester" }),
  headers: { "Content-Type": "application/json" },
})
  .then((res) => res.json())
  .then((json) => console.log(json));
```

Et c'est pareil pour toutes les autres méthodes HTTP! (`PUT`, `PATCH`, `DELETE`, etc.)

## async/await

```js
const getUsers = async () => {
  const response = await fetch("https://reqres.in/api/users");
  return response.json();
};

const users = getUsers();
console.log(users);
```

## Exercice

Pas d'exercice à proprement parler, voici une liste d'api publiques: [ici](https://github.com/public-apis/public-apis). Faites ce que vous voulez avec.
