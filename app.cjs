const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) =>{
    res.render('index', {appName: 'Mini Message Board'});
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, err => {
    if(err) throw err;
    console.log(`Listening to port ${PORT}`);
});