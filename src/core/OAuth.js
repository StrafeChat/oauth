const uuid = require("uuid").v4;

class OAuth {
  db = null;

  constructor(dbInterface) {
    this.db = dbInterface;
  }

  /**
   * token
   * @description cryptographically safe token generator. override if needed
   *
   * @return {string}  the generated token
   */
  token() {

  }

  /**
   * uuid
   * @description generator used for random ids. override if you need your own system
   *
   * @return {string}  the id as a string
   */
  uuid() {
    return uuid();
  }


  /**
   * @typedef {object} CallbackData
   * @description Information given by the 3rd party that is requesting access
   * @property {string} grantType
   * @property {string} code
   * @property {string} redirectUri
   * @property {string} clientId
   * @property {string} clientSecret
   */
  /**
   * grantToken
   * @description attemps to authorise an access token from the provided callback data
   *
   * @param  {CallbackData} data
   * @return {string}      A valid access token
   */
  grantToken(data) {
    return new Promise(res => {
      const type = data.grantType;
      const token = data.code;
      const redirect = data.redirectUri;
      const id = data.clientId;
      const secret = data.clientSecret;

      // TODO: expiry time (and every other feature...)
      res("todo");
    });
  }
}


module.exports = OAuth;
