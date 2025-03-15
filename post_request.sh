#!/bin/bash

# URL del servidor
URL="http://localhost:3000/api/v1/toys"

# Iterar 100 veces para enviar 100 peticiones
for i in {1..100}
do
    echo "Enviando petición #$i"

    # Enviar petición POST con datos JSON
    curl -X POST $URL \
        -H "Content-Type: application/json" \
        -d "{
            \"name\": \"toy_$i\",
            \"price\": $((RANDOM % 100 + 1)),
            \"description\": \"Generated toy number $i\",
            \"picture\": \"toy_$i.png\"
        }"

    echo -e "\n--------------------------------------"
done
