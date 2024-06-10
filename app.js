import express from "express";
import bodyParser from "body-parser";
import sql from "msnodesqlv8";

const app = express();
app.use(bodyParser.json());
const PORT = 3000;
const connectionString = "server=DSN1191109174;Database=corinthians;Trusted_Connection=Yes;Driver={Sql Server Native Client 11.0}";

app.get("/curintia", (req, res) => {
    sql.query(connectionString, "SELECT * FROM product", (erro, rows) => {
        if (erro) {
            res.status(500).json("Erro Interno de Servidor");
        } else {
            res.status(200).json(rows);
        }
    });
});

app.get("/curintia/:id", (req, res) => {
    const { id } = req.params;
    sql.query(connectionString, `SELECT * FROM product WHERE id = ${id}`, (erro, rows) => {
        if (erro) {
            res.status(500).json("Erro Interno do Servidor");
        } else {
            res.status(200).json(rows);
        }
    });
});

app.post("/curintia", (req, res) => {
    const { description, price } = req.body;
    sql.query(
        connectionString,
        `INSERT INTO product VALUES ('${description}', '${cost}', '${price}')`,
        (erro, rows) => {
            if (erro) {
                res.status(500).json("Erro Interno de Servidor");
            } else {
                res.status(201).json("Cadastrado com sucesso!");
            }
        }
    );
});

app.put("/curintia/:id",(req,res) => {
    const{id} = req.params;
    const {description, price} = req.body;
    sql.query(
        connectionString, 
        `UPDATE product SET description = '${description}', cost = '${cost}', price = '${price}' WHERE id = ${id};`,
        (erro, rows)=>{
            if(erro){
                res.status(500).json("Erro Interno de Servidor");
            }else{
                res.status(201).json("Atualizado com Sucesso");
            }
        }
    );
});

app.delete("/curintia/:id", (req,res) => {
    const{id} = req.params;
    sql.query(
        connectionString,
        `DELETE FROM product WHERE id=${id}`,
        (erro, rows) => {
            if(erro){
                res.status(500).json("Erro Interno de Servidor");
            }else{
                res.status(201).json("Excluído com Sucesso!");
            } 
        }    
    )
});

app.listen(PORT, () => console.log(`Server rodando na porta ${PORT}`));