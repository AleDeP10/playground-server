// @ts-nocheck

const hello = async (req, res) => {
  let name = 'Mondo';
  if (req.query.name) {
    name = req.query.name;
  }
  const result = 'Ciao, ' + name + '!';
  res.status(200).json({ result });
  console.log('hello.controller', { name: req.query.name, result });
  return result;
};

module.exports = { hello };
