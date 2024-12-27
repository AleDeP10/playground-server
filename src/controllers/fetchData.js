let counter = 0;

const fetchData = async (req, res) => {
  counter++;
  res.status(200).json({
    status: 'OK',
    description: 'test data',
    counter
  });
  console.log('fetchData.controller', { counter });
  return counter;
}

export default fetchData;