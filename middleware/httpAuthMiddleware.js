import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

export const authenticateTokenHttp = (req, res, next) => {

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  //console.log( "token http="+token )

  if (token === null){
    console.log("not-authorized")
    return res.sendStatus(401);
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) 
      return res.sendStatus(403);
    req.userId = user.userId;
    next();
  });
};

