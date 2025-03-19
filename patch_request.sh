#!/bin/bash
curl -X PATCH "http://localhost:3000/api/v1/toys/1" \
     -H "Content-Type: application/json" \
     -d '{"name": "woody", "price": 15.97}'