const connection = require("../configs/mysql")

const readQuery = `SELECT * FROM ads_table`

module.exports = {
    insertAds: (data) => {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO ads_table SET ?', data)
            connection.query(readQuery, (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    }
}