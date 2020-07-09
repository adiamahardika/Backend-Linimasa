const { database } = require('./index')
const mysql = require('mysql')

const connection = mysql.createConnection(database)

connection.connect((eror) => {
    if(error) {
        console.log('Connection to Database has been failed!')
    } else {
        console.log('Connection to Database has been success!')
    }
})

module.exports = connection