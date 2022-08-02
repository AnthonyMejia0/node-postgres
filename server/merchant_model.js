const dotenv = require('dotenv');
dotenv.config();

const Pool = require('pg').Pool;
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT),
});

const getMerchants = () => {
    return new Promise(function(resolve, reject) {
        pool.query('SELECT id, name, email FROM merchants ORDER BY id ASC', (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results.rows);
        });
    });
}

const createMerchant = (body) => {
    return new Promise(function(resolve, reject) {
        const { name, email } = body;
        pool.query('INSERT INTO merchants (name, email) VALUES ($1, $2) RETURNING *', [name, email], (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(`A new merchant has been added: ${results.rows[0]}`);
        });
    });
}

const deleteMerchant = (id) => {
    return new Promise(function(resolve, reject) {
        pool.query('DELETE FROM merchants WHERE id = $1', [id], (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(`Merchant deleted with ID: ${id}`);
        });
    });
}

const updateMerchant = (id, body) => {
    let { name, email } = body
    return new Promise(function(resolve, reject) {
        pool.query('UPDATE merchants SET name = $1, email = $2 WHERE id = $3', [name, email, id], (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(`Merchant with ID: ${id} updated`);
        });
    });
}

module.exports = {
    getMerchants,
    createMerchant,
    deleteMerchant,
    updateMerchant,
};