const { body, validationResult, matchedData, param } = require('express-validator');
const { getAppData } = require('../controllers/AppDataController.cjs');

const db = require('../db/queries.cjs');
const {TITLE} = getAppData();

const formValidator = [
    body('username')
    .trim()
    .notEmpty().withMessage('Username is required').bail()
    .isLength({ min: 5, max: 20 }).withMessage('Username must be between 5 and 20 characters').bail()
    .matches(/^[a-zA-Z0-9_]+$/).withMessage('Username can only contain letters, numbers, and underscores').bail()
    .toLowerCase(),

    body('message')
    .trim()
    .notEmpty().withMessage('Message is required').bail()
    .isLength({ max: 1000 }).withMessage('Message must not exceed 1000 characters'),
]

const messageDetailValidator = [
    param('id').isInt().toInt().withMessage('Invalid ID'),
]

async function getIndex(req, res, next){
    try{

        const messages = await db.getMessages();
        res.render('index', {title: TITLE, messages});
    }
    catch(err){
        next(err);
    }
};

function getUserForm(req, res){
    res.render('form', {title: TITLE});
}

async function postNewUser(req, res, next){
    try{
        const errors = validationResult(req);
    
        if(!errors.isEmpty()){
            return res.status(400).render('form', {title: TITLE, errors: errors.array(), data:req.body});
        }
    
        const {username, message} = matchedData(req);
    
        await db.addMessage(username, message);
        res.redirect('/');
    }
    catch(err){
        next(err);
    }
}

async function getMessageDetails(req, res, next){
    try{
        const errors = validationResult(req);
    
        if(!errors.isEmpty()){
            return res.sendStatus(400);
        }
    
        const {id} = matchedData(req);
    
        const message = await db.getMessage(id);
        if(!message){
            res.status(404).render('error', {title: TITLE, errMessage: '404: Requested message not found!' });
            return;
        }
    
        res.render('message-details', {title: TITLE, message});
    }
    catch(err){
        next(err);
    }
}

module.exports.getIndex = getIndex; 
module.exports.getUserForm = getUserForm;
module.exports.postNewUser = [formValidator, postNewUser];
module.exports.getMessageDetails = [messageDetailValidator, getMessageDetails];