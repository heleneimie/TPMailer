const express = require('express');
const bodyParser = require('body-parser');
//Installé en version de dev uniquement
const faker = require('faker');

const app = express();
const users = [];
const contacts = [];

//Version de l'application
const version = 'v1';

/* Interprète une valeur postée par l'utilisateur ; la transforme en objet json */
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


/* on simule une BDD avec des contacts grâce à faker */
for (let i = 0; i < 10; i++) {
    contacts.push({
        email:  faker.internet.email(),
        password: faker.internet.password(),
    });
}

console.log(contacts);


// GET /v1/contacts : récupère la liste de tous les contacts
app.get(`/${version}/contacts`, (req, res) => {
    res.json(contacts);
});


app.listen(3000, () => console.log('Example app listening on port 3000!'));