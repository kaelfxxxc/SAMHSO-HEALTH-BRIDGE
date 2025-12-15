require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

async function runFile(filePath, connection) {
  const sql = fs.readFileSync(filePath, 'utf8');
  if (!sql.trim()) return;
  console.log('Executing', filePath);
  await connection.query(sql);
}

async function main() {
  const config = {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    multipleStatements: true,
  };

  console.log('Connecting to DB', config.host + ':' + config.port);
  const conn = await mysql.createConnection(config);

  try {
    console.log('Dropping database if exists...');
    await conn.query('DROP DATABASE IF EXISTS healthbridge;');

    const base = path.join(__dirname, '..');
    const files = [
      path.join(base, 'db', 'healthbridge_schema_hashed.sql'),
      path.join(base, 'db', 'create_citizens_table.sql'),
    ];

    for (const f of files) {
      if (fs.existsSync(f)) {
        await runFile(f, conn);
      } else {
        console.warn('File not found, skipping:', f);
      }
    }

    console.log('Reset and import completed.');
  } catch (err) {
    console.error('Reset/import failed:', err.message || err);
    process.exitCode = 2;
  } finally {
    await conn.end();
  }
}

main();
