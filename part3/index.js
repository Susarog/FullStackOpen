require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const Contact = require("./module/contact");

morgan.token("obj", function (req, res) {
  if (req.body.name || req.body.number) {
    return JSON.stringify(req.body);
  }
  return "";
});

app.use(express.json());
app.use(
  morgan(`:method :url :status :res[content-length] - :response-time ms :obj`)
);
app.use(cors());
app.use(express.static("build"));

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
  Contact.find({}).then((person) => {
    res.json(person);
  });
});

app.get("/info", async (req, res) => {
  const length = await Contact.find({}).then((persons) => {
    return persons.length;
  });
  if (length < 2) {
    res.send(
      `<p>Phonebook has info for ${length} person</p><p>${new Date()}</p>`
    );
  } else {
    res.send(
      `<p>Phonebook has info for ${length} people</p><p>${new Date()}</p>`
    );
  }
});

app.get("/api/persons/:id", (req, res) => {
  Contact.findById(req.params.id).then((person) => {
    res.json(person);
  });
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  phoneBookData = phoneBookData.filter((person) => person.id !== id);
  res.status(204).end();
});

app.post("/api/persons", async (req, res) => {
  const person = req.body;
  const isSamePerson = await Contact.find({}).then((person) => {
    return person
      .map((person) => person.name)
      .find((name) => {
        return name === person.name;
      });
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
  /*
  let randID = Math.floor(Math.random() * 10000);
  while (
    phoneBookData
      .map((person) => person.id)
      .find((person) => person.id === randID)
  ) {
    randID = Math.floor(Math.random() * 10000);
  }
  */
  const newPerson = new Contact({
    name: person.name,
    number: person.number,
  });
  newPerson
    .save()
    .then(() => {
      console.log("saved person");
      res.json(newPerson);
    })
    .catch((err) => {
      res.status(500).end();
    });
});

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Running port ${PORT}`));
