let counter = 0;

export const fetchData = async (req, res) => {
  counter++;
  res.status(200).json({
    status: 'OK',
    description: 'test data',
    counter
  });
  return counter;
}