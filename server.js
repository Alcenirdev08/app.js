const express = require('express');
const app = express();
app.use(express.json());

let posts = [];

app.get('/posts', (req, res) => {
  res.json(posts);
});

app.post('/posts', (req, res) => {
  const { content, format } = req.body;
  const post = { id: posts.length + 1, content, format, created_at: new Date() };
  posts.push(post);
  res.status(201).json(post);
});

app.get('/posts/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ error: 'Postagem não encontrada' });
  res.json(post);
});

app.patch('/posts/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ error: 'Postagem não encontrada' });
  post.content = req.body.content || post.content;
  post.format = req.body.format || post.format;
  res.json(post);
});

app.delete('/posts/:id', (req, res) => {
  const index = posts.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Postagem não encontrada' });
  const deletedPost = posts.splice(index, 1)[0];
  res.json(deletedPost);
});

app.listen(3000, () => {
  console.log('Servidor rodando no endereço http://localhost/porta:3000');
})
