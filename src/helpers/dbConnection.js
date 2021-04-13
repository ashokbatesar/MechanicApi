const mysql = require('mysql'); // connection configurations

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
};

var connection;
function connectToDB() {

    connection = mysql.createConnection(dbConfig);

    connection.connect(function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected to database as id ' + connection.threadId);
    });

    connection.on('error', function (err) {
        console.log('db error', err.code);
        if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR') { // Connection to the MySQL server is usually
            console.log('Reconnecting to DB...');
            connectToDB();                         // lost due to either server restart, or a
        } else {                                      // connnection idle timeout (the wait_timeout
            throw err;                                  // server variable configures this)
        }
    });
}
connectToDB();


module.exports = connection;