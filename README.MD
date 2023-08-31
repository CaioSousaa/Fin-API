## FinAPI - Financeira 


### Requisitos

-[] Deve ser possivel criar uma conta 
-[] Deve ser possivel buscar o estrato bancario do cliente
-[] Deve ser possivel realizar um saque 
-[] Deve ser possivel buscar o extrato bancario do cliente por data
-[] Deve ser possivel atualizar dados da conta do cliente
-[] Deve ser possivel obter dados da conta do cliente
-[] Deve ser possivel deletar uma conta

### Regras de negocio 

-[] Não deve ser possivel cadastrar uma conta com CPF ja existente 
    CPF => String
    Nome => String
    id => uuid (identicador unico universal)
    statement [] 
-[] Não deve ser possivel fazer deposito em uma conta não existente 
-[] Não deve ser possivel buscar extrato em uma conta não existente
-[] Não deve ser possivel fazer saque em uma conta nãp existente 
-[] Não deve ser possivel excluir uma conta não existente
-[] Não deve ser possivel fazer um saque quando o saldo for insuficiente
