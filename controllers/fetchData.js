let counter = 0;

export const fetchData = async (req, res) => {
  counter++;
  const result = {
    status: 'OK',
    description: 'test data',
    counter
  };
  console.log({ counter, result });
  res.status(200).json({ result });
  return result;
}