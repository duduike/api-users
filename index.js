import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: 'https://cadastro-usuarios-six.vercel.app', // Altere para o domínio correto
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
  })
);

app.post("/usuarios", async (req, res) => {
  try {
    await prisma.user.create({
      data: {
        email: req.body.email,
        name: req.body.name,
        age: req.body.age,
        evolution: req.body.evolution,
      },
    });

    res.status(201).json(req.body);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.put("/usuarios/:id", async (req, res) => {
  await prisma.user.update({
    where: {
      id: req.params.id,
    },
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
      evolution: req.body.evolution,
    },
  });

  res.status(200).json(req.body);
});

app.delete("/usuarios/:id", async (req, res) => {
  await prisma.user.delete({
    where: {
      id: req.params.id,
    },
  });

  res.status(200).json({ message: "Usuário deletado com Sucesso!" });
});

app.get("/usuarios", async (req, res) => {
  let filters = {};

  if (req.query.name) {
    filters.name = req.query.name;
  }

  if (req.query.email) {
    filters.email = req.query.email;
  }

  if (req.query.age) {
    const age = parseInt(req.query.age, 10);
    if (!isNaN(age)) {
      filters.age = age;
    } else {
      return res.status(400).json({ message: "Age deve ser um número válido" });
    }
  }

  if (req.query.evolution) {
    filters.evolution = req.query.evolution;
  }

  const users = await prisma.user.findMany({
    where: filters,
  });

  res.status(200).json(users);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
