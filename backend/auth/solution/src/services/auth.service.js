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
