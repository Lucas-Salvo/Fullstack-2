import express from "express";
import cors from "cors";
import { prisma } from "../src/lib/prisma.ts";

const app = express();
const PORT = 3000

app.use(express.json());
app.use(cors());

app.get("/pessoa", async (req, res) => {
    const usuarios = await prisma.pessoa.findMany();
    res.json(usuarios)
});

app.post("/pessoa", async (req, res) => {
    const {nome, email} = req.body;

    const novoUsuario = await prisma.pessoa.create({
        data: {
            nome, email
        }
});
    res.json(novoUsuario)
});

app.put("/pessoa/:id", async (req, res) => {
    const {id} = req.params;
    const {nome, email} = req.body;

    const atualizarUsuario = await prisma.pessoa.update({
        where: {id: Number(id)},
        data: {
            nome, email
        }
});
    res.json(atualizarUsuario)
});

app.delete("/pessoa/:id", async (req, res) => {
    const {id} = req.params;

    const deletarUsuario = await prisma.pessoa.delete({
        where: {id: Number(id)}
});
    res.json(deletarUsuario)
});

app.get("/cpf", async (req, res) => {
    const cpf = await prisma.cpf.findMany();
    res.json(cpf)
});

app.post("/cpf", async (req, res) => {
    const {numero, pessoaId} = req.body
    const novoCpf = await prisma.cpf.create({
        data: {
            numero,
            pessoa: {connect: {id: Number(pessoaId)}}
        }
    });
    res.json(novoCpf)
});

app.put("/cpf/:id", async (req, res) => {
    const {id} = req.params
    const {numero, pessoaId} = req.body

    const atualizarCpf = await prisma.cpf.update({
        where: {id: Number(id)},
        data: {
            numero,
            pessoa: {connect: {id: Number(pessoaId)}}
        }
    });
    res.json(atualizarCpf)
});

app.delete("/cpf/:id", async (req, res) => {
    const {id} = req.params

    const deletarCpf = await prisma.cpf.delete({
        where: {id: Number(id)},
    });
    res.json(deletarCpf)
});

app.listen(PORT, () => {
    console.log("API Rodando")
})