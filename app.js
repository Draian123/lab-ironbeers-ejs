const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);

app.use(express.static(path.join(__dirname, 'public')));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers',async (req, res) => {
  let allBeers
  try{
    allBeers = await punkAPI.getBeers()
    console.log("Here are the beers: ", allBeers)

  }catch(err){
    console.error(err);
  }
  res.render('beers', {allBeers});
});

app.get('/random-beer', async(req, res) => {
  let randomBeer
  try{
    randomBeer = await punkAPI.getRandom()
    // console.log("Here is a random beer:  ", randomBeer)
    

  }catch(err){
    console.error(err);
  }

  res.render('random-beer', {randomBeer});
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
