const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const PORT = 3000


app.set('view engines', '.hbs')


app.get('/', (req, res) => {
    res.send('good')
})

app.listen(PORT, (req, res) => {
    console.log(`server running on ${PORT}`);
})
