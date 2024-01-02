/*class Manager {
  db = null;
  constructor(dbinterface) {
    this.db = dbinterface;
  }

  grantToken(data) {
    return new Promise(res => {
      const type = data.grantType;
      const token = data.code;
      const redirect = data.redirectUri;
      const id = data.clientId;
      const secret = data.clientSecret;

      // TODO: expiry time
      res("todo");
    });
  }
}*/

function middleware(core) {
  return async function (req, res, next) {
    switch(req.path) {
      case "/token":
        if (req.method !== "POST") {
          req.success = false;
          return next();
        }

        const data = {
          grantType: req["grant_type"],
          token: req.code,
          redirectUri: req["redirect_uri"],
          clientId: req["client_id"],
          clientSecret: req["client_secret"]
        }

        const token = await core.grantToken(data);

        req.success = true;
        req.authData = { token };
        next();
      break;
      default:
        next();
      break;
    }
  };
}

module.exports = middleware;
