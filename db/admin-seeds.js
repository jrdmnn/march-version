const mongoose = require("mongoose");
require("dotenv").config();
const User = require('../models/User.model');
const bcrypt = require('bcrypt')

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/march-version";


mongoose.connect(MONGO_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const admin = [
  {
    email: 'corentine.piette@ora-arts.com',
    password: '123456seven'
  },
  {
    email: 'ptrcklehmann@gmail.com',
    password: '123456seven'
  }
]
const salt = bcrypt.genSaltSync();
admin.forEach(user => {
    user.password = bcrypt.hashSync(user.password, salt)
});

User.create(admin)
    .then(celebritiesFromDB => {
    console.log(`Created ${celebritiesFromDB.length} admin accounts`);
    mongoose.connection.close();
    })
    .catch(err => console.log(`An error occurred while creating admin accounts on the DB: ${err}`))
  
  
module.exports = mongoose;