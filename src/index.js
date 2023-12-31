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

function getBalance(statement){
    const balance = statement.reduce((acc, operation) => {
        if(operation.type === 'credit'){
           return acc + operation.amount
        } else {
           return acc - operation.amount;
        }
    }, 0);

    return balance;
}

app.post("/account", (request, response) => {
    const { cpf, name } = request.body;
    
    const customersAlreadyExist = customers.some(
        (customer) => customer.cpf === cpf
    )

    if(customersAlreadyExist) {
        return response.status(400).json({error: "Customers already exists!"})
    }

    customers.push({
        cpf,
        name,
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
        type : "credit",
        created_at : new Date(),
    }

    customer.statement.push(statementOperation);

    response.status(201).send();
})

app.post("/withdraw", verificationCustomersCPF, (request, response) => {
    const { amount } = request.body;
    const { customer } = request;

    const balance = getBalance(customer.statement)

    if(balance < amount) {
        response.status(400).json({error: "Saldo insuficiente para saque"})
    }

    const statementOperation = {
        amount,
        type : "debit",
        created_at : new Date(),
    }

    customer.statement.push(statementOperation)

    return response.status(201).send()
})

app.get("/statement/date", verificationCustomersCPF, (request, response) => {
    const { customer } = request;

    const { date } = request.query;

    const formatDate = new Date(date + " 00:00");

    const statement = customer.statement.filter((statement) => statement.created_at.toDateString()
    === new Date(formatDate).toDateString());

    return response.json(statement);
});

app.put("/account", verificationCustomersCPF, (request, response) => {
    const { name } = request.body;
    const { customer } = request;

    customer.name = name;

    return response.status(201).send();
});

app.get("/account", verificationCustomersCPF, (request, response) => {
    const { customer } = request;

    return response.json(customer);
});

app.delete("/account", verificationCustomersCPF, (request, response) => {
    const {customer} = request;

    customers.splice(customer, 1);

    return response.status(200).json(customer);
})

app.get("/balance", verificationCustomersCPF, (request, response) => {
    const {customer} = request;

    const balance = getBalance(customer.statement);

    return response.json(balance);
})

app.listen(3333);