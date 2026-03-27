const messages = require("../models/Messages.cjs");


function getAll(){
    return messages;
}

function get(id){
    return {...messages.find(message => message.id === id)};
}

function add(user, text){
    if(!user || !text) return false;
    messages.push({ id: crypto.randomUUID(), user, text, added: new Date() });
    return true;
}

module.exports = {getAll, add, get};