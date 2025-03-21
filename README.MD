github link: https://github.com/Francpool/refactoring.git
# CRUD OPERATION
In this assessment, you will find an application that deals with CRUD operations using RESTful endpoints following the MVC pattern. In the following steps, you will find an explanation of each file in the project.

## Server.js
In this file, we use Express to create the server:
const express = require("express");
We also use the middleware const app = express(); to handle HTTP requests and routes.

## Models
In this project, we have a models folder with 2 controller files that have a similar structure, but each one handles different information, such as toys and players. We are going to analyze only the toy model.

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