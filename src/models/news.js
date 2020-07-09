const connection = require('../configs/mysql')

module.exports = {
    insertNews: (data) => {
        return new Promise((resolve, reject) => {
            connection.query(`INSERT INTO news_table SET ?`, data)
            connection.query(`SELECT * FROM news_table`, (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    }
}