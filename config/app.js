let path = __dirname + "/../.env";

console.log( path );

let dotenv = require('dotenv').config({
    path: path
});


module.exports = {
    "jwt_secret" : process.env.JWT_SECRET,
    "db_server" : process.env.DB_SERVER,
    "db_name" : process.env.DB_DATABASE,
    "db_user" : process.env.DB_USER,
    "db_password" : process.env.DB_PASSWORD
}