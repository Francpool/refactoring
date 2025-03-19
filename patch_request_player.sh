#!/bin/bash
curl -X PATCH "http://localhost:3000/api/v1/players/1" \
     -H "Content-Type: application/json" \
     -d '{"firstname":"Paul","lastname":"Velastegui",
     "age":34}'