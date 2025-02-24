const verifyAuth = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    res.sendStatus(401);
    return;
  }

  try {
    const decoded = jwt.verify(token);
    req.user = decoded;
    next();
  } catch (err) {
    res.sendStatus(403);
    return;
  }
};

export default verifyAuth;
