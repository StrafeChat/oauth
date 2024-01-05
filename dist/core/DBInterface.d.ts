export = DBInterface;
/**
 * @typedef HashProvider
 * @description An object containing a function to hash a password/token and one to verify a hash
 * @property {function(token: string): string} hash Hashes a given token and returns a string with the hashing result. The format of said string is left to the implementation
 * @property {function(token: string, hash: string): boolean} verifyHash Compares a token and a hash. The format of the hash is left to the implementation.
 */
declare class DBInterface {
    /** @type {HashProvider} */
    hashProvider: any;
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
    fetchAppInfo(clientId: string): Promise<any>;
}
declare namespace DBInterface {
    export { HashProvider };
}
type HashProvider = any;
//# sourceMappingURL=DBInterface.d.ts.map