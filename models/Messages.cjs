const crypto = require('crypto');

const messages = [
    {
        id: crypto.randomUUID(),
        text: 'Welcome to Mini Message Board',
        user: 'admin',
        added: new Date(),
    },
];

module.exports = messages;