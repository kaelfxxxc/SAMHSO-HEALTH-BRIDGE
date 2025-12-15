require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

async function getDb() {
  const conn = await mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'healthbridge',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
  return conn;
}

app.post('/api/signup', async (req, res) => {
  const { name, email, password, dob, phone, address, gender } = req.body || {};

  if (!name || !email || !password) return res.status(400).json({ error: 'name, email and password required' });

  try {
    const db = await getDb();

    // Check existing
    const [rows] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    if (rows.length) return res.status(409).json({ error: 'Email already registered' });

    const salt = bcrypt.genSaltSync(12);
    const hash = bcrypt.hashSync(password, salt);

    const [userRes] = await db.query('INSERT INTO users (name,email,password_hash,role) VALUES (?,?,?,?)', [name, email, hash, 'citizen']);
    const userId = userRes.insertId;

    await db.query('INSERT INTO citizens (user_id, dob, phone, address, gender) VALUES (?,?,?,?,?)', [userId, dob || null, phone || null, address || null, gender || null]);

    const [userRow] = await db.query('SELECT id,name,email,role,created_at FROM users WHERE id = ?', [userId]);

    res.status(201).json({ user: userRow[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });

  try {
    const db = await getDb();
    const [rows] = await db.query('SELECT id,name,email,password_hash,role FROM users WHERE email = ?', [email]);
    if (!rows.length) return res.status(401).json({ error: 'Invalid credentials' });

    const user = rows[0];
    const ok = bcrypt.compareSync(password, user.password_hash);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

    // fetch citizen profile if role is citizen
    let profile = null;
    if (user.role === 'citizen') {
      const [p] = await db.query('SELECT * FROM citizens WHERE user_id = ?', [user.id]);
      profile = p[0] || null;
    }

    // remove password_hash
    delete user.password_hash;

    res.json({ user, profile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
