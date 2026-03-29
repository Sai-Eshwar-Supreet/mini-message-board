const {Router}  = require('express');
const IndexRouter = Router();
const messagesController = require('../controllers/MessagesController.cjs');
// ==================== ROUTING ====================

IndexRouter.get('/', messagesController.getIndex);
IndexRouter.get('/new', messagesController.getUserForm);
IndexRouter.post('/new', messagesController.postNewUser);
IndexRouter.get('/details/:id', messagesController.getMessageDetails);

module.exports = IndexRouter;