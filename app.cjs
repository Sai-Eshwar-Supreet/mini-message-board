const express = require('express');
const path = require('path');
const IndexRouter  = require('./routes/IndexRouter.cjs');
const { getAppData } = require('./controllers/AppDataController.cjs');


// ==================== INITIALIZATION ====================
const {TITLE, PORT} = getAppData();
const app = express();

//==================== SETUP ====================
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//==================== ROUTING ====================
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.use('/', IndexRouter);

app.use((req, res) => {
    res.status(404).render('error', {title: TITLE, errMessage: 'Path does not exist'});
});

//==================== ERROR HANDLING ====================
app.use((err, req, res, next) => {
    if(res.headersSent){
        next(err);
        return;
    }
    console.error(err);
    res.status(err.status || 500).render('error', {title: TITLE, errMessage: 'Something seems to be broken!'});
});

//==================== LISTEN TO REQUESTS ====================

app.listen(PORT, err => {
    if(err) throw err;
    console.log(`Listening to port ${PORT}`);
});