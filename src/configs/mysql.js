const { database } = require('./index')
const mysql = require('mysql')

const connection = mysql.createConnection(database)

connection.connect((error) => {
    if(error) {
        console.log('Connection to database has been failed!')
    } else {
        console.log('Connection to database has been success!')
    }
})

module.exports = connection