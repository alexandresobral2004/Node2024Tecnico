import express from 'express'
import { create } from 'express-handlebars';
import { Model, DataTypes } from 'sequelize';
import sequelize from './db/conn.js';
import conn from './db/conn.js';
import ContatoRouter from './routes/contatoRoutes.js';
import Contato from './model/Contato.js';

const app = express()
const port = 3000

// Configurar o Handlebars
const hbs = create({
  defaultLayout: 'main', // ou outro layout padrão, se houver
  // Outras opções, como helpers, etc.
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//parser para leitura do body
app.use(
  express.urlencoded({
    extended: true
  })
)
app.use(express.json())




//adicionando rota User
app.use('/contato', ContatoRouter)

app.get('/', (req, res) => {
  res.render('home')
})


//webserver
conn
  // .sync({ alter: true })
  .sync()
  .then(() => {
    app.listen(port)
    console.log('Server Started')
  })
  .catch((err) => {
    console.log(err)
  })
// app.listen(port, () => {
//   console.log('Server Started')
// }

