curl -X POST http://localhost:3000/api/localmongo/toys \
-H "Content-Type: application/json" \
-d '{
    "name": "Teddy Bear",
    "description": "A soft and adorable brown teddy bear, perfect for cuddling",
    "picture": "https://example.com/images/teddy-bear.jpg",
    "price": 24.99
  }'