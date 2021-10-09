const express = require('express');
const items = require('./items');
const cors = require('cors')

const app = express();

const port = process.env.PORT || 8080;

app.use(express.static('dist'));

app.use(cors())

app.get('/api/items', (req, res) => {
    const searchString = req.query ? req.query.search : ''
    res.header('Access-Control-Allow-Origin', '*');
    //console.log(searchString)
    if(searchString){
        const matchingItems = items.filter(item => item.name.toLowerCase().indexOf(searchString) > -1);
        //console.log("matchingItems ===="+JSON.stringify(matchingItems));
        if(matchingItems.length){
            return res.send({items:matchingItems})
        }
    } 
    return res.send({ items })
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
