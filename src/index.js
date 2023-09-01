const express = require("express");

const {v4: uuidv4} = require("uuid")

const app = express();

app.use(express.json())

const customers = []

app.post("/account", (request, response) => {
    const { cpf, nome } = request.body;
    
    const customersAlreadyExist = customers.some(
        (customers) => customers.cpf === cpf
    )

    if(customersAlreadyExist) {
        return response.status(400).json({error: "Customers already exists!"})
    }

    customers.push({
        cpf,
        nome,
        id: uuidv4(),
        statement: []
    })

    return response.status(201).send()
});

app.get("/statement/:cpf", (request, response) => {
    const { cpf } = request.params;

    const customer = customers.find(customer => customer.cpf === cpf)

    if (!customer) {
        return response.json({ error: "Customer not found" });
    }

    return response.json(customer.statement);
});

app.listen(3333);