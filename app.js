const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const persons = [{
  "id": 5123,
  "name": "Ammar Mohamed",
  "age": 21,
  "gender": "male",
  "email": "	ammarmora@gmail.com"
}, {
  "id": 5431,
  "name": "Sally Ahmed",
  "age": 20,
  "gender": "female",
  "email": "	sally@gmail.com"
}];

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/persons', (req, res) => {
  res.json(persons);
});

app.post('/persons', (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const gender = req.body.gender;
  const email = req.body.email;
  const id = Math.floor(Math.random() * 10000);
  const person = { id, name, age, gender, email };
  persons.push(person);
  res.json({ msg: 'add' });
});

app.get('/persons/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const person = persons.find(p => p.id === id);
  if (person) {
    res.json(person);
  } else {
    res.json({ msg: 'not found' });
  }
});

app.put('/persons/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const person = persons.find(p => p.id === id);

  if (person) {
    const name = req.body.name;
    const age = req.body.age;
    const gender = req.body.gender;
    const email = req.body.email;
    person.name = name;
    person.age = age;
    person.gender = gender;
    person.email = email;
    res.json({ msg: 'update' });
  } else {
    res.json({ msg: 'not found' });
  }
});

app.delete('/persons/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = persons.findIndex(p => p.id === id);

  if (index !== -1) {
    persons.splice(index, 1);
    res.json({ msg: 'delete' });
  } else {
    res.json({ msg: 'not found' });
  }
});

app.listen(8888, () => {
  console.log(`App listening at http://localhost:3000`);
});
