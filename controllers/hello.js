const hello = async (req, res) => {
  let name = 'World';
  if (req.query.name) {
    name = req.query.name;
  }
  const result = 'Hello, ' + name + '!';
  res.status(200).json({ result });
  console.log('hello.controller', { name: req.query.name, result });
  return result;
};

export default { hello };