curl -X POST http://localhost:3000/api/v1/people \
-H "Content-Type: application/json" \
-d '{
  "name": {
    "first": "Alan",
    "last": "Turing"
  },
  "birth": "1912-06-23",
  "death": "1954-06-07",
  "contribs": ["Turing machine", "Turing test", "Turingery"],
  "views": 1250000
}'