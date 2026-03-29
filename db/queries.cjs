const pool = require('./pool.cjs');

module.exports.getMessages = async function getMessages(){
    const {rows} = await pool.query('SELECT * FROM messages ORDER BY date DESC');

    return rows;
}
module.exports.getMessage = async function getMessage(id){
    const {rows} = await pool.query('SELECT * FROM messages WHERE id=$1', [id]);

    return rows[0];
}

module.exports.addMessage = async function addMessage(username, message) {
    await pool.query('INSERT INTO messages (username, message) VALUES ($1, $2)', [username, message]);
}