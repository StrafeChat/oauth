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
          req.oauth = {
            success: false
          }
          return next();
        }

        var data = {
          grantType: req["grant_type"],
          token: req.code,
          redirectUri: req["redirect_uri"],
          clientId: req["client_id"],
          clientSecret: req["client_secret"]
        }

        const token = await core.grantToken(data);

        req.oauth = {
          success: true,
          authData: { token }
        }
        next();
      break;
      case "/auth":
        // TODO: move to core appropriately
        const type = req.query.response_type; // TODO: implement different response types
        if (type !== "code") {
          req.oauth = {
            success: false,
            error: "invalid response type requested"
          }
          return next();
        }
        const clientId = req.query.client_id;
        const redirectUri = req.query.redirect_uri;
        const scope = req.query.scope; // TODO: implement scoping
        if (!clientId || !redirectUri || !scope) {
          req.oauth = {
            success: false,
            error: "invalid request"
          }
          return next();
        }

        var data = await core.db.fetchAppInfo(clientId);
        if (!data) {
          req.oauth = {
            success: false,
            error: "unknown client id"
          }
          return next();
        }

        // TODO: verify redirectUri
        req.oauth = {
          success: true,
          data: {
            scopes: core.parseScopes(scope),
            state: req.query.state,
            redirectUri,
            ...data
          }
        }
        next();
      break;
      default:
        next();
      break;
    }
  };
}

module.exports = middleware;
