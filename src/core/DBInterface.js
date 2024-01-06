const hashing = require("./util/hash.js");

// TODO: implement async handling of has functions?
// TODO: improve property description of HashProvider
/**
 * @typedef HashProvider
 * @description An object containing a function to hash a password/token and one to verify a hash
 * @property {function} hash Hashes a given token and returns a string with the hashing result. The format of said string is left to the implementation
 * @property {function} verifyHash Compares a token and a hash. The format of the hash is left to the implementation.
 * @property {function} token Creates a safe token. Used for client secrets
 */

/**
 * @class
 * @classdesc An interface documenting methods and properties that have to implemented
 */
class DBInterface {
  /** @type {HashProvider} */
  hashProvider = hashing;
  constructor() {

  }

  /**
   * @typedef AppInfo
   * @description // TODO: complete this typedef
   */
  /**
   * fetchAppInfo
   * @description Fetches information about an app using the client id
   *
   * @param  {string} clientId  The client id of the app
   * @return {Promise<AppInfo|null>} The data from the databse
   * @abstract
   */
  fetchAppInfo(clientId) {
    throw "fetchAppInfo has to be implemented";
  }

  /**
   * createApp
   * @description registers a new app with the given values
   *
   * @param  {string} id          The client id of the app
   * @param  {string} name        The name of the new app
   * @param  {string} description The description of the app
   * @return {Promise<string>}             The secret used to authenticate with this app
   */
  createApp(id, name, description) {
    throw "createApp has to be implemented";
  }
}

module.exports = DBInterface;
