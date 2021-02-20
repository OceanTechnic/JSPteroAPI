import makeIncludes from '../../modules/Functions';
import Request from '../ApplicationRequest';
import User, { UserAttributes, UserIncludeInput } from '../interfaces/User';

export default class userMethods {
    public constructor(private host: string, private key: string) {}
    /**
     * @param {UserIncludeInput} [options] Include information about relationships
     * @returns {Promise<User[]>} Array of users
     * @example
     * ```js
     * const res = await app.getAllUsers() // res = User[]
     * ```
     * @example
     * ```js
     * app.getAllUsers().then((res) => console.log(res)) // res = User[]
     * ```
     */
    public getAllUsers = async (
        options?: UserIncludeInput,
    ): Promise<User[]> => {
        return new Request(this.host, this.key).request(
            'GET',
            null,
            'data',
            `/api/application/users${makeIncludes(options)}`,
        );
    };
    /**
     * @param {number} userId The user id to get information about
     * @param {UserIncludeInput} [options] Include information about relationships
     * @returns {Promise<UserAttributes} User information
     * @example
     * ```js
     * const res = await app.getUserInfo(1) // res = UserAttributes
     * ```
     * @example
     * ```js
     * app.getUserInfo(1).then((res) => console.log(res)) // res = UserAttributes
     * ```
     */
    public getUserInfo = async (
        userId: number,
        options?: UserIncludeInput,
    ): Promise<UserAttributes> => {
        return new Request(this.host, this.key).request(
            'GET',
            null,
            'attributes',
            `/api/application/users/${userId}${makeIncludes(options)}`,
        );
    };
    /**
     * @param {string} userId The external user id to get information about
     * @param {UserIncludeInput} [options] Include information about relationships
     * @returns {Promise<UserAttributes} User information
     * @example
     * ```js
     * const res = await app.getUserInfoByExtId(1) // res = UserAttributes
     * ```
     * @example
     * ```js
     * app.getUserInfoByExtId(1).then((res) => console.log(res)) // res = UserAttributes
     * ```
     */
    public getUserInfoByExtId = async (
        userId: string,
        options?: UserIncludeInput,
    ): Promise<UserAttributes> => {
        return new Request(this.host, this.key).request(
            'GET',
            null,
            'attributes',
            `/api/application/users/external/${userId}${makeIncludes(options)}`,
        );
    };
    /**
     * @param {string} username The username of the user
     * @param {string} firstName The first name of the user
     * @param {string} lastName The last name of the user
     * @param {string} email The email address of the user
     * @param {string} [password] The password of the user
     * @param {boolean} [isAdmin=false] Is the user admin (default false)
     * @param {string} [language="en"] The language of the user (default en)
     * @param {string} [externalId] The external id of user
     * @param {UserIncludeInput} [options] Include information about relationships
     * @returns {Promise<UserAttributes} User information
     * @example
     * ```js
     * const res = await app.createUser('linux123123', 'Linus', 'ADMIN', 'api@gmail.com') // res = UserAttributes
     * ```
     * @example
     * ```js
     * app.createUser('linux123123', 'Linus', 'ADMIN', 'api@gmail.com').then((res) => console.log(res)) // res = UserAttributes
     * ```
     */
    public createUser = async (
        username: string,
        firstName: string,
        lastName: string,
        email: string,
        password = '',
        isAdmin = false,
        language = 'en',
        externalId?: string,
    ): Promise<UserAttributes> => {
        return new Request(this.host, this.key).request(
            'POST',
            {
                email: email,
                username: username,
                first_name: firstName,
                last_name: lastName,
                language: language,
                root_admin: isAdmin,
                password: password,
                external_id: externalId ? externalId : '',
            },
            'attributes',
            `/api/application/users`,
        );
    };
    /**
     * @param {number} userId The user id of the user to edit
     * @param {string} [username] The new username of the user
     * @param {string} [firstName] The new first name of the user
     * @param {string} [lastName] The new last name of the user
     * @param {string} pemail] The new email address of the user
     * @param {string} [password] The new password of the user
     * @param {boolean} [isAdmin=false] Is the user admin
     * @param {string} [language="en"] The new language of the user
     * @param {string} [externalId] The new external id of user
     * @param {UserIncludeInput} [options] Include information about relationships
     * @returns {Promise<UserAttributes} User information
     * @example
     * ```js
     * const res = await app.editUser(1, 'linux123123', undefined, 'ADMIN_LAST) // res = UserAttributes
     * ```
     * @example
     * ```js
     * app.editUser(1, undefined, 'Linux').then((res) => console.log(res)) // res = UserAttributes
     * ```
     */
    public editUser = async (
        userId: number,
        username?: string,
        firstName?: string,
        lastName?: string,
        email?: string,
        password?: string,
        isAdmin?: boolean,
        language?: string,
        externalId?: string,
        options?: UserIncludeInput,
    ): Promise<UserAttributes> => {
        const user = await this.getUserInfo(userId);
        return new Request(this.host, this.key).request(
            'PATCH',
            {
                email: email ? email : user.email,
                username: username ? username : user.username,
                first_name: firstName ? firstName : user.first_name,
                last_name: lastName ? lastName : user.last_name,
                language: language ? language : user.language,
                root_admin: isAdmin ? isAdmin : user.root_admin,
                password: password ? password : '',
                external_id: externalId ? externalId : user.external_id,
            },
            'attributes',
            `/api/application/users/${userId}${makeIncludes(options)}`,
        );
    };
    /**
     * @param {number} userId The user id of the user to delete
     * @returns {Promise<string>} If successful returns Successfully deleted!
     * @example
     * ```js
     * const res = await app.deleteUser(1) // res = Successfully deleted!
     * ```
     * @example
     * ```js
     * app.deleteUser(1).then((res) => console.log(res)) // res = Successfully deleted!
     * ```
     */
    public deleteUser = async (userId: number): Promise<string> => {
        return new Request(this.host, this.key).request(
            'DELETE',
            null,
            'Successfully deleted!',
            `/api/application/users/${userId}`,
        );
    };
}