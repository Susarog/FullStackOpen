require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const Contact = require('./module/contact');

morgan.token('obj', function (req) {
  if (req.body.name || req.body.number) {
    return JSON.stringify(req.body);
  }
  return '';
});

app.use(express.json());
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :obj')
);
app.use(cors());
app.use(express.static('build'));


app.get('/api/persons', (req, res) => {
  Contact.find({})
    .then((person) => {
      res.json(person);
    })
    .catch(() => {
      res.status(500).end();
    });
});

app.get('/info', async (req, res) => {
  const length = await Contact.find({})
    .then((persons) => {
      return persons.length;
    })
    .catch(() => res.status(500).end());
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

app.get('/api/persons/:id', (req, res, next) => {
  Contact.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => next(err));
});

app.delete('/api/persons/:id', (req, res, next) => {
  Contact.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch((err) => next(err));
});

app.post('/api/persons', async (req, res,next) => {
  const person = req.body;
  const isSamePerson = await Contact.find({})
    .then((person) => {
      return person
        .map((person) => person.name)
        .find((name) => {
          return name === person.name;
        });
    })
    .catch(() => res.status(500).end());
  if (!person.name || !person.number) {
    return res.status(400).json({
      error: 'missing name or number',
    });
  } else if (isSamePerson) {
    return res.status(400).json({
      error: 'name must be unique',
    });
  }
  const newPerson = new Contact({
    name: person.name,
    number: person.number,
  });
  newPerson
    .save()
    .then(() => {
      console.log('saved person');
      res.json(newPerson);
    })
    .catch((err) => next(err));
});

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body;
  const person = {
    name: body.name,
    number: body.number,
  };

  Contact.findByIdAndUpdate(req.params.id, person, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((updatedPerson) => {
      res.json(updatedPerson);
    })
    .catch((err) => next(err));
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);
const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Running port ${PORT}`));
