export const hello = async (req, res) => {
  let nome = 'World';
  if (req.body.nome) {
    nome = req.body.nome;
  }
  const result = 'Hello, ' + nome + '!';
  res.status(200).json({ result });
  console.log({ nome: req.body.nome, result });
  return result;
};