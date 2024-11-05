const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const url = 'mongodb://172.19.0.2:27017/mydatabase';

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    console.log(`Recebida requisição ${req.method} para ${req.url}`);
    next();
});

// Conectar ao banco de dados usando Mongoose
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Conectado ao banco de dados com Mongoose!');
    })
    .catch(err => {
        console.log('Erro ao conectar ao banco de dados:', err);
    });

// Definir o modelo de usuário
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    // Adicione outros campos conforme necessário
});

const User = mongoose.model('User', userSchema);

// CRUD
app.post('/users', (req, res) => {
    console.log('Requisição POST recebida');
    const user = new User(req.body);
    user.save()
        .then(() => {
            res.send({ message: 'Usuário criado com sucesso' });
        })
        .catch(err => {
            res.status(500).send({ message: 'Erro ao criar usuário' });
        });
});

app.get('/users', (req, res) => {
    User.find()
        .then(users => {
            res.send(users);
        })
        .catch(err => {
            res.status(500).send({ message: 'Erro ao listar usuários' });
        });
});

app.put('/users/:id', (req, res) => {
    const id = req.params.id;
    User.findByIdAndUpdate(id, req.body, { new: true })
        .then(user => {
            res.send({ message: 'Usuário atualizado com sucesso', user });
        })
        .catch(err => {
            res.status(500).send({ message: 'Erro ao atualizar usuário' });
        });
});

app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    User.findByIdAndDelete(id)
        .then(() => {
            res.send({ message: 'Usuário deletado com sucesso' });
        })
        .catch(err => {
            res.status(500).send({ message: 'Erro ao deletar usuário' });
        });
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});