const req = require('../ApplicationRequest.js');

/**
 * @param {String} Username Users username
 * @param {String} Password Users password
 * @param {String} Email Users email
 * @param {String} FirstName Users first name
 * @param {String} LastName Users last name
 * @param {Boolean} IsAdmin Is the user admin? (true/false)
 * @param {String} Language Language, Normally en/fr (2 letter languages)
 */
function createUser(
    Username,
    Password,
    Email,
    FirstName,
    LastName,
    IsAdmin,
    Language
) {
    const Req = new req(
        process.env.APPLICATION_JSPTEROAPI_HOST,
        process.env.APPLICATION_JSPTEROAPI_KEY
    );
    const data = createData(
        Username,
        Password,
        Email,
        FirstName,
        LastName,
        IsAdmin,
        Language
    );
    return Req.request(
        'createUser',
        'POST',
        data,
        'data',
        '/api/application/users',
        true
    );
}

function createData(
    Username,
    Password,
    Email,
    FirstName,
    LastName,
    IsAdmin,
    Language
) {
    return {
        email: Email,
        username: Username,
        first_name: FirstName,
        last_name: LastName,
        password: Password,
        root_admin: IsAdmin,
        language: Language,
    };
}

module.exports = createUser;
