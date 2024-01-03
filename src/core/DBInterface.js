class DBInterface {
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
   * @return {Promise<AppInfo>} The data from the databse
   */
  fetchAppInfo(clientId) {
    throw "fetchAppInfo has to be implemented";
  }
}

module.exports = DBInterface;
