const messages = require("../models/Messages.cjs");
const crypto = require('crypto');
const { getAppData } = require('../controllers/AppDataController.cjs');
const {TITLE} = getAppData();

module.exports.getIndex = function getIndex(req, res){
    res.render('index', {title: TITLE, messages: messages.reverse()});
};

module.exports.getUserForm = function getUserForm(req, res){
    res.render('form', {title: TITLE, username: req.query.username});
}

function add(user, text){
    if(!user?.trim() || !text?.trim()) return false;
    messages.push({ id: crypto.randomUUID(), user, text, added: new Date() });
    return true;
}

module.exports.postNewUser = function postNewUser(req, res){
    if(add(req.body.username, req.body.message)){
        res.redirect('/');
    }
    else{
        res.redirect(`/new?username=${req.body.username}`);
    }
}

function get(id){
    const message = messages.find(message => message.id === id);
    return message ?  {...message} : null;
}

module.exports.getMessageDetails = function getMessageDetails(req, res){
    const id = req.params.id;

    const message = get(id);
    if(!message){
        res.status(404).render('error', {title: TITLE, errMessage: '404: Requested message not found!' });
        return;
    }

    res.render('message-details', {title: TITLE, message});
}