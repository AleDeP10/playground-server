const { pool } = require("../config/dbConfig.cjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { username, password } = req.body;

  console.log("login.controller", { pool });

  pool.query(
    `SELECT 
        u.username AS "username",
        u.password AS "password",
        u.id AS "userId",
        u.status AS "status"
     FROM 
        "User" u
     WHERE 
        u.username = $1`,
    [username],
    (err, result) => {
      if (err) {
        res.status(500).send("Internal Server Error");
        console.log(err.message);
        return;
      }
      if (result.rows?.length > 0) {
        if (
          password === result.rows[0].password &&
          result.rows[0].status === "ACTIVE"
        ) {
          const token = jwt.sign(
            {
              userId: result.rows[0].userId,
              username: result.rows[0].username,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: "15m",
            }
          );
          res.json({
            token: token,
            username: result.rows[0].username,
          });
        } else {
          res.status(401).send("Invalid credentials");
        }
      } else {
        res.status(401).send("Invalid credentials");
      }
    }
  );
};

module.exports = { login };
