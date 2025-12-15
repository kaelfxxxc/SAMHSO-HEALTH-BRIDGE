const mysql = require('mysql2/promise');
require('dotenv').config();

async function verifyUsers() {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'healthbridge'
  });

  const [users] = await conn.query('SELECT id, name, email, role FROM users ORDER BY id');
  console.log('\n✓ Database Users:');
  console.table(users);
  
  const [citizens] = await conn.query('SELECT user_id, dob, phone FROM citizens ORDER BY user_id');
  console.log('\n✓ Citizen Profiles:');
  console.table(citizens);
  
  await conn.end();
}

verifyUsers().catch(console.error);
