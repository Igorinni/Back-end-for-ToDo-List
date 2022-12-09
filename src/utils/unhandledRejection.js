module.exports = (res, error) => {
  console.log(error);
  return res.status(500).json({
    success: false,
    message: "Error on server :(",
  });
};
