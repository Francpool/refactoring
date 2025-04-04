github link: https://github.com/Francpool/refactoring.git

# Project Overview

## New Features

In this updated version, a new branch named `mongodb` has been introduced. This branch includes two MongoDB connections:

- **Cloud MongoDB**: Manages data related to people.
- **Local MongoDB**: Handles toy-related data.

Additionally, toy data is also available through a static JSON file.

## Available Endpoints

- **Cloud MongoDB – People data**  
  Retrieve person data from the cloud-based MongoDB:
http://localhost:3000/api/v1/people/


- **Local MongoDB – Toy data**  
Access toy data from the local MongoDB instance:
http://localhost:3000/api/localmongo/toys


- **JSON File – Toy data**  
Fetch toy data from the JSON file:
http://localhost:3000/api/v1/toys


## Additional Information

All available routes and further implementation details can be found in the `routes` folder located within the project directory.

# CRUD OPERATION
In this assessment, you will find an application that deals with CRUD operations using RESTful endpoints following the MVC pattern. In the following steps, you will find an explanation of each file in the project.

## Server.js
In this file, we use Express to create the server:
const express = require("express");
We also use the middleware const app = express(); to handle HTTP requests and routes.

## Models
In this project, the models folder contains four files:

playerModel.js and toyModel.js share a similar structure, as both handle data from static JSON files.

Person.js is a model that interacts with the cloud-based MongoDB database to manage person-related data.

toyModelLocalDB.js is responsible for handling toy-related data stored in the local MongoDB instance.

- Toy Model 
  - File system

            We use const fs = require("fs"); to read and write a JSON file. One file is called data.json, which contains toy information, and another one is called player.json, which contains player information.

  - Function getAllToys()

            This function reads the data.json file.

  - Function saveToys(toys)

            This function writes to the data.json file using synchronous writing and saves the information provided as a parameter (toys).

  - Function getNewToyID(toys)

            In this function, we receive toys as a parameter and check if there is no data. If there is no data, the function returns 1. Otherwise, it checks the maximum ID and returns the maximum value plus one.

  - Function addToy(newToy)

            In this function, we read the JSON file and store the information in the toys variable. Then, we save the new ID in the newToy variable and write it to the JSON file using the saveToys(toys) function.

  - Function getToyById(id)

            In this function, we read the JSON file using `getAllToys()` and then filter it using the `id` parameter provided.
  - Function updateToById (id, updates)
            
            In this function, two parameters are required: `id` to find the specific object and `updates` to change the information in JSON format. Inside this function, we also use `saveToys(toys)`, which is used to write the new changes.

  - Function deleteToyById(id)

            In this function, we save the data in a variable called `toys` and then filter it by `id`. Next, we delete the specific object using the `splice()` function. Finally, we save the information by writing to the JSON file using the `saveToys()` function.

- ToyModelLocalDB.js
    In this section I going to explain the toy model used for mongo db with multiplex connection 
    ```js

    const mongoose = require('mongoose');
    const { connectLocalDB } = require('../config/driverMongo.DB'); // Importamos la conexión a la base de datos local
    const toySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    picture: { type: String, required: true },
    price: { type: Number, required: true }
    });
    const localDB = connectLocalDB(); // Conectamos a MongoDB local
    const Toy = localDB.model('Toy', toySchema);

    module.exports = Toy;
    ```
   It is important to establish the database connection by calling the appropriate driver and linking it to the model you intend to work with.
For example:
    ```js
    const { connectLocalDB } = require('../config/driverMongo.DB');
    .
    .
    . //TODO here
    .
    .
    .
    .
    .
    const localDB = connectLocalDB(); // Conectamos a MongoDB local
    const Toy = localDB.model('Toy', toySchema);
    ```

## Controller

In this section, we created functions to retrieve data or execute requests based on the required path.
```
- function getToys(req, res) { }
- function createToy(req, res) { }
- function getToy(req, res) { }
- function createToy(req, res) { }
- function getToy(req, res) { }
- function updateToy(req, res) { }
- function deleteToyById(req, res) { }

```
When working with MongoDB, the structure of the controllers changes slightly, as we need to use predefined Mongoose methods such as Model.find(), Model.create(), Model.findByIdAndUpdate(), and Model.findByIdAndDelete().
An example of the controller implementation can be seen in the following code block:

```js

    const Person = require("../models/Person");

// Obtener todas las personas
async function getPeople(req, res) {
  try {
    const people = await Person.find(); // Obtener todas las personas desde la base de datos
    res.status(200).json({
      status: "success",
      data: people,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch user person",
      error: error.message,
    });
  }
}

// Crear una nueva persona
async function createPerson(req, res) {
  try {
    const newPerson = await Person.create(req.body); // Crear una nueva persona
    res.status(201).json({
      status: "success",
      data: newPerson,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Error whilw creating person",
      error: error.message,
    });
  }
}

// Obtener una persona por ID
async function getPerson(req, res) {
  try {
    const person = await Person.findById(req.params.id);
    if (!person) {
      return res.status(404).json({ status: "error", message: "Person does nor found" });
    }
    res.status(200).json({ status: "success", data: person });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error while fetching person", error: error.message });
  }
}

// Actualizar una persona
async function updatePerson(req, res) {
  try {
    const updatedPerson = await Person.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedPerson) {
      return res.status(404).json({ status: "error", message: "Person does not found" });
    }
    res.status(200).json({ status: "success", data: updatedPerson });
  } catch (error) {
    res.status(500).json({ status: "error", message: "somethig wrong updating person", error: error.message });
  }
}

// Eliminar una persona
async function deletePerson(req, res) {
  try {
    const deletedPerson = await Person.findByIdAndDelete(req.params.id);
    if (!deletedPerson) {
      return res.status(404).json({ status: "error", message: "Person do not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error while deleting person", error: error.message });
  }
}

module.exports = {
  getPeople,
  createPerson,
  getPerson,
  updatePerson,
  deletePerson,
};

```
