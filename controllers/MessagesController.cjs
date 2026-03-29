const { getAppData } = require('../controllers/AppDataController.cjs');

const db = require('../db/queries.cjs');
const {TITLE} = getAppData();

module.exports.getIndex = async function getIndex(req, res){
    const messages = await db.getMessages();
    res.render('index', {title: TITLE, messages});
};

module.exports.getUserForm = function getUserForm(req, res){
    res.render('form', {title: TITLE, username: req.query.username});
}

module.exports.postNewUser = async function postNewUser(req, res){
    await db.addMessage(req.body.username, req.body.message, new Date());
    res.redirect('/');
}

module.exports.getMessageDetails = async function getMessageDetails(req, res){
    const id = req.params.id;

    const message = await db.getMessage(id);
    if(!message){
        res.status(404).render('error', {title: TITLE, errMessage: '404: Requested message not found!' });
        return;
    }

    res.render('message-details', {title: TITLE, message});
}