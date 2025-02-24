import http from "http";

const PORT = process.env.PORT || 4000; //NOTE: Soit on récupère le port de la variable d'environnement `PORT`, soit 4000 si `PORT` n'est pas définie.

const server = http.createServer((req, res) => {
  res.send("working!");
  res.end();
});

server.listen(PORT); //NOTE: Commencer l'écouter sur le `PORT` défini.
