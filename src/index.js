const express = require("express");

const {v4: uuidv4} = require("uuid")

const app = express();

app.use(express.json())

const costumers = []

app.post("/account", (request, response) => {
    const { cpf, nome } = request.body;

    const id = uuidv4();

    costumers.push({
        cpf,
        nome,
        id,
        statement: []
    })

    return response.status(201).send()
});

app.listen(3333);