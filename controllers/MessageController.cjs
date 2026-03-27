const crypto = require('crypto');
const messages = require("../models/Messages.cjs");


function getAll(){
    return [...messages];
}

function get(id){
    const message = messages.find(message => message.id === id);
    return message ?  {...message} : null;
}

function add(user, text){
    if(!user?.trim() || !text?.trim()) return false;
    messages.push({ id: crypto.randomUUID(), user, text, added: new Date() });
    return true;
}

module.exports = {getAll, add, get};