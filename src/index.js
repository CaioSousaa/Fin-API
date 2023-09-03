const express = require("express");

const {v4: uuidv4} = require("uuid")

const app = express();

app.use(express.json())

const customers = []

function verificationCustomersCPF(request, response, next) {
    
    const { cpf } = request.headers;

    const customer = customers.find((customer) => customer.cpf === cpf)

    if (!customer) {
        return response.status(400).json({ error: "Customer not found" });
    }

    request.customer = customer;

    return next();
}

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

app.get("/statement", verificationCustomersCPF, (request, response) => {
    const { customer } = request;
    return response.json(customer.statement);
});

app.post("/deposit", verificationCustomersCPF, (request, response) => {
    const { amount, description } = request.body;
    
    const { customer } = request;

    const statementOperation = {
        description,
        amount,
        type : " credit ",
        created_at : new Date(),
    }

    customer.statement.push(statementOperation);

    response.status(201).send();
})

app.listen(3333);