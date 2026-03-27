const {Router}  = require('express');
const { getAll, add, get } = require('../controllers/MessageController.cjs');
const { getAppData } = require('../controllers/AppDataController.cjs');
const IndexRouter = Router();

// ==================== INITIALIZATION ====================
const {TITLE} = getAppData();

// ==================== ROUTING ====================

IndexRouter.get('/', (req, res) =>{
    res.render('index', {title: TITLE, messages: getAll().reverse()});
});

IndexRouter.get('/new', (req, res) => {
    res.render('form', {title: TITLE, username: req.query.username});
});

IndexRouter.post('/new', (req, res) => {
    if(add(req.body.username, req.body.message)){
        res.redirect('/');
    }
    else{
        res.redirect(`/new?username=${req.body.username}`);
    }
});

IndexRouter.get('/details/:id', (req, res) => {
    const id = req.params.id;

    const message = get(id);
    if(!message){
        res.status(404).render('error', {title: TITLE, errMessage: '404: Requested message not found!' });
        return;
    }

    res.render('message-details', {title: TITLE, message});
});

module.exports = IndexRouter;