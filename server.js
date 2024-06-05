import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(cors());

app.post('/usuarios', async (req, res) => {
    try {
        const newUser = await prisma.user.create({
            data: { 
                email: req.body.email,
                name: req.body.name,
                age: req.body.age
            }
        });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar usuário" });
    }
});

app.put('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const updatedUser = await prisma.user.update({
            where: { id },
            data: { 
                email: req.body.email,
                name: req.body.name,
                age: req.body.age
            }
        });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar usuário" });
    }
});

app.delete('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.user.delete({
            where: { id }
        });
        res.status(200).json({ message: "Usuário deletado com Sucesso!" });
    } catch (error) {
        res.status(500).json({ error: "Erro ao deletar usuário" });
    }
});

app.get('/usuarios', async (req, res) => {
    try {
        let filters = {};
        if (req.query.name) filters.name = req.query.name;
        if (req.query.email) filters.email = req.query.email;
        if (req.query.age) {
            const age = parseInt(req.query.age, 10);
            if (!isNaN(age)) filters.age = age;
            else return res.status(400).json({ message: "Age deve ser um número válido" });
        }
        const users = await prisma.user.findMany({ where: filters });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar usuários" });
    }
});

app.listen(9001, () => {
    console.log('Server is running on port 9001');
});
