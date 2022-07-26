const { response } = require("express");
const express = require("express");
const app = express();

app.use(express.json());

let phoneBookData = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (req, res) => {
  res.json(phoneBookData);
});

app.get("/info", (req, res) => {
  res.send(
    `<p>Phonebook has info for ${
      phoneBookData.length
    } people</p><p>${new Date()}</p>`
  );
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const personURL = phoneBookData.find((person) => person.id === id);
  if (personURL) {
    res.json(personURL);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  phoneBookData = phoneBookData.filter((person) => person.id !== id);
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const person = req.body;
  const isSamePerson = phoneBookData
    .map((person) => person.name)
    .find((name) => {
      console.log(name);
      return name === person.name;
    });
  if (!person.name || !person.number) {
    return res.status(400).json({
      error: "missing name or number",
    });
  } else if (isSamePerson) {
    return res.status(400).json({
      error: "name must be unique",
    });
  }

  let randID = Math.floor(Math.random() * 10000);
  while (
    phoneBookData
      .map((person) => person.id)
      .find((person) => person.id === randID)
  ) {
    randID = Math.floor(Math.random() * 10000);
  }

  const newPerson = {
    name: person.name,
    number: person.number,
    id: randID
  }
  phoneBookData = phoneBookData.concat(newPerson);
  res.json(newPerson);
});

const PORT = 3001;

app.listen(PORT, () => console.log(`Running port ${PORT}`));
