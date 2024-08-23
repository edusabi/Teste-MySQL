const express = require('express');
const app = express();
const cors = require("cors");

app.use(cors({
    origin: "http://localhost:8080",
    credentials: true
}));

/////CONEXAO COM MYSQL
const conexao = require("./infra/conexao");

app.use(express.json());

app.get("/", (req, res) => {
    const sql = "SELECT * FROM all_users;"

    conexao.query(sql, (error, result) => {

        if (error) {
            res.status(404).json({ "error": error })
        } else {
            res.status(200).json(result)
        };

    });

});

app.post("/registro", (req, res) => {

    const nome = req.body.nome;
    const cpf = req.body.cpf;
    const email = req.body.email;
    const sexo = req.body.sexo;
    const estado = req.body.selectedUf;
    const cidade = req.body.selectedCidade;

    const newUser = {
        nome,
        email,
        cpf,
        sexo,
        estado,
        cidade
    }

    const sql = "INSERT INTO all_users SET ?;"

    conexao.query(sql, newUser, (error, result) => {
        if (error) {
            res.status(404).json({ "error": error })
        } else {
            res.status(200).json(result);
        };

    });
});


app.delete("/deletarUser/:id", (req, res) => {
    const idCom2ponto = req.params.id;
    const id = idCom2ponto.replace(':', ''); // Remove os dois pontos
    const sql = "DELETE FROM all_users WHERE id=?;"
    
    conexao.query(sql, id, (error, result) => {
        if (error) {
            res.status(404).json({ "erro": error });
        } else {
            res.status(200).json({ result });
        }
    });
});

app.put("/editUser/:id", (req, res) => {

    const nome = req.body.nome;
    const cpf = req.body.cpf;
    const email = req.body.email;
    const sexo = req.body.sexo;
    const estado = req.body.selectedUf;
    const cidade = req.body.selectedCidade;

    const editUser = {
        nome,
        email,
        cpf,
        sexo,
        estado,
        cidade
    };

    const idCom2Ponto = req.params.id;
    const id = idCom2Ponto.replace( ":" , "");

    const sql = "UPDATE all_users SET ? WHERE id=?;"

    conexao.query(sql, [ editUser , id ] , (error, result)=>{
        if(error){
            res.status(404).json({"error": error});
        }else{
            res.status(200).json(result);
        }
    });

});


app.listen(3000, (error) => {
    if (error) {
        console.log("Algo deu errado, tente novamente!")
    } else {
        console.log("Servidor rodando!")
    };
});

