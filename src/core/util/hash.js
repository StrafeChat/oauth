const crypto = require("node:crypto")

function hash(token) {
  token = token.normalize();
  return new Promise((resolve, reject) => {
      // generate random 16 bytes long salt
      const salt = crypto.randomBytes(16).toString("base64")

      crypto.scrypt(token, salt, 64, (err, derivedKey) => {
          if (err) reject(err);
          resolve(salt + "." + derivedKey.toString('base64'))
      });
  })
}

function verify(token, hash) {
  token = token.normalize();
  hash = hash.normalize();
  return new Promise((res, rej) => {
    if (!hash.includes(".")) return rej(new Error("Invalid hash format (salt.hash)"));
    const [salt, key] = hash.split(".");
    crypto.scrypt(token, salt, 64, (err, derivedKey) => {
      if (err) rej(err);
      keyBuf = Buffer.from(key, "base64");
      if (keyBuf.length !== derivedKey.length) return res(false);
      res(crypto.timingSafeEqual(keyBuf, derivedKey));
    })
  });
}

module.exports = { hash, verify };
