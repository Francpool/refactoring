#!/bin/bash
curl -X PATCH "http://localhost:3000/api/v1/toys/3" \
     -H "Content-Type: application/json" \
     -d '{"name": "New Toy Name by bash", "price": 19.99}'