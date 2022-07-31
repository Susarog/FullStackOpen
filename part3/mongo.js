const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("Please provide the password in CLI");
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];
const url = `mongodb+srv://fullstack:${password}@cluster0.xgrzjsy.mongodb.net/phonebook?retryWrites=true&w=majority`;

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Contact = mongoose.model("Contact", contactSchema);
if (name && number) {
  mongoose
    .connect(url)
    .then((result) => {
      const contactInfo = new Contact({
        name: name,
        number: number,
      });

      return contactInfo.save();
    })
    .then(() => {
      console.log(`added ${name} number ${number} to phonebook`);
      return mongoose.connection.close();
    })
    .catch((err) => console.log(err));
} else if ((!name && number) || (name && !number)) {
    console.log(`input either a name or number`);
} 
else {
  mongoose
    .connect(url)
    .then((result) => {
      contactSchema.find({}).then((result) => {
        result.forEach((element) => {
          console.log(element);
        });
      });
      mongoose.connection.close();
    })
}
