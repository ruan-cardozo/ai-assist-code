const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'mydatabase';

app.use(express.json());

// Conectar ao banco de dados
MongoClient.connect(url, function(err, client) {
  if (err) {
    console.log(err);
  } else {
    console.log('Conectado ao banco de dados!');
    const db = client.db(dbName);

    // CRUD
    app.post('/users', (req, res) => {
    console.log('Requisição POST recebida');
      const user = req.body;
      db.collection('users').insertOne(user, (err, result) => {
        if (err) {
          res.status(500).send({ message: 'Erro ao criar usuário' });
        } else {
          res.send({ message: 'Usuário criado com sucesso' });
        }
      });
    });

    app.get('/users', (req, res) => {
      db.collection('users').find().toArray((err, users) => {
        if (err) {
          res.status(500).send({ message: 'Erro ao listar usuários' });
        } else {
          res.send(users);
        }
      });
    });

    app.put('/users/:id', (req, res) => {
      const id = req.params.id;
      const user = req.body;
      db.collection('users').updateOne({ _id: ObjectId(id) }, { $set: user }, (err, result) => {
        if (err) {
          res.status(500).send({ message: 'Erro ao atualizar usuário' });
        } else {
          res.send({ message: 'Usuário atualizado com sucesso' });
        }
      });
    });

    app.delete('/users/:id', (req, res) => {
      const id = req.params.id;
      db.collection('users').deleteOne({ _id: ObjectId(id) }, (err, result) => {
        if (err) {
          res.status(500).send({ message: 'Erro ao deletar usuário' });
        } else {
          res.send({ message: 'Usuário deletado com sucesso' });
        }
      });
    });
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});