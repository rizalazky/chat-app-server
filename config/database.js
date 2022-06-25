const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345',
  database :'db_chat_app'
});


module.exports = connection