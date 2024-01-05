export = OAuth;
declare class OAuth {
    constructor(dbInterface: any);
    db: any;
    /**
     * token
     * @description cryptographically safe token generator. override if needed
     *
     * @return {string}  the generated token
     */
    token(): string;
    /**
     * uuid
     * @description generator used for random ids. override if you need your own system
     *
     * @return {string}  the id as a string
     */
    uuid(): string;
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
    grantToken(data: any): string;
}
//# sourceMappingURL=OAuth.d.ts.map