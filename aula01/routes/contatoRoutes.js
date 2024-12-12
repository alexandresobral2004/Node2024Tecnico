import express from 'express';
import Contato from '../model/Contato.js';

const router = express.Router();


router.get('/index', async (req, res) => {
  const contatos = await Contato.findAll({ raw: true });
  res.render('list', { contatos });
})

router.get('/novo', (req, res) => {
  res.render('create');
})

// Create (POST /contatos)
router.post('/create', async (req, res) => {
  const { nome, telefone, email, password } = req.body;
  try {
    const contato = await Contato.create({ nome, telefone, email, password });
    res.redirect('/contato/index');
  } catch (error) {
    console.log(error);
  }
});

// Read all (GET /contatos)
router.get('/getAll', async (req, res) => {
  try {
    const contatos = await Contato.findAll({ raw: true });
    res.render('contatos', { contatos });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar contatos' });
  }
});

// Read one (GET /contatos/:id)
router.get('/get/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const contato = await Contato.findByPk(id);
    if (!contato) {
      return res.status(404).json({ error: 'Contato não encontrado' });
    }
    res.json(contato);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar contato' });
  }
});

// Update (PUT /contatos/:id)
router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, telefone, email, password } = req.body;
  try {
    const contato = await Contato.findByPk(id);
    if (!contato) {
      return res.status(404).json({ error: 'Contato não encontrado' });
    }
    await contato.update({ nome, telefone, email, password });
    res.json(contato);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar contato' });
  }
});

// Delete (DELETE /contatos/:id)
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const contato = await Contato.findByPk(id);
    if (!contato) {
      return res.status(404).json({ error: 'Contato não encontrado' });
    }
    await contato.destroy();
    res.json({ message: 'Contato excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir contato' });
  }
});

export default router;