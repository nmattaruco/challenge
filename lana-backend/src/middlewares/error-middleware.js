function errorHandling(err, req, res, next) {
  console.log('here');
  res.status(409).send(err);
}

module.exports = { errorHandling };
