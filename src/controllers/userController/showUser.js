const HTTP_SUCCESS = 200;
const HTTP_BAD_REQUEST = 400;

async function showUser(req, res) {
  try {
    return res.status(HTTP_SUCCESS).json(req.user);
  } catch (error) {
    return res.status(HTTP_BAD_REQUEST).json(error.message);
  }
}

module.exports = {
  showUser,
};
