import express from "express";
import path from "path";
const __dirname = path.resolve();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const SECRET_KEY = process.env.SECRET_KEY;
import mysql from "mysql2/promise";

import {} from 'dotenv/config';

const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

const PORT = 3001;

// Middleware for authenticating JWT tokens
const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(403).json({ message: "Access Denied" });

  jwt.verify(token.split(" ")[1], SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid Token" });
    req.user = user;
    next();
  });
};


app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.htm"));
});

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const [rows] = await connection.execute('SELECT * FROM user WHERE email = ?', [email]);
        if (rows.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await connection.query('INSERT INTO user (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);
        if(result[0].insertId){
            res.status(201).json({ success:true, message: 'User registered successfully!', insertId: result[0].insertId });
        }
        res.status(500).json({success:false, message: 'Something went wrong in DB execution'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ success:false, message: 'Server error' });
    }
});

app.post('/login', async (req, res) => {
  const {email, password} = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("email", email, "password", hashedPassword);

      try {
        const [rows] = await connection.execute('SELECT * FROM user WHERE email = ?', [email]);
        const user = rows[0];
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
          { id: user.id, username: user.username },
          SECRET_KEY,
          { expiresIn: "1h" }
        );
        res.json({ token });

      } catch (error) {
        res.status(401).json({message: "Error"})
      }


  return res.json({message: 'Success!'})
});

app.get('/protected', authenticateJWT, async (req, res) => {
  try {
        const [rows] = await connection.execute('SELECT * FROM post');
        return res.status(200).json({rows});
  } catch(error) {
    res.status(500).json("error");
  }
});

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
});