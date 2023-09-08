## FinAPI - Financeira 


### Requisitos

-[x] Deve ser possivel criar uma conta
    CPF => String
    Nome => String
    id => uuid (identicador unico universal)
    statement [] 
-[x] Deve ser possivel buscar o estrato bancario do cliente
-[x] Deve ser possivel realizar um saque 
-[x] Deve ser possivel buscar o extrato bancario do cliente por data
-[x] Deve ser possivel atualizar dados da conta do cliente
-[x] Deve ser possivel obter dados da conta do cliente
-[x] Deve ser possivel deletar uma conta

### Regras de negocio 

-[x] Não deve ser possivel cadastrar uma conta com CPF ja existente 
-[x] Não deve ser possivel fazer deposito em uma conta não existente 
-[x] Não deve ser possivel buscar extrato em uma conta não existente
-[x] Não deve ser possivel fazer saque em uma conta nãp existente 
-[x] Não deve ser possivel excluir uma conta não existente
-[x] Não deve ser possivel fazer um saque quando o saldo for insuficiente
