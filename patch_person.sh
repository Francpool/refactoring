

curl -X PATCH http://localhost:3000/api/v1/people/67e6d2c2bbc73d6a91c3c502 \
-H "Content-Type: application/json" \
-d '{
  "name": {
    "first": "Paul",
    "last": "Velastegui"
  },
  "views": 2000000
}'
