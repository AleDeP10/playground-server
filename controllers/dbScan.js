export const hello = async (req, res) => {
  let name = 'World';
  if (req.body.name) {
    name = req.body.name;
  }
  const result = 'Hello, ' + name + '!';
  res.status(200).json({ result });
  console.log({ body: req.body, result });
  return result;
};