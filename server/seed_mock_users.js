const mysql = require('mysql2/promise');
const bcryptjs = require('bcryptjs');
require('dotenv').config();

async function seedMockUsers() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || '',
    });

    console.log('Connected to MySQL');

    // Use the database
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'healthbridge'}`);
    await connection.changeUser({ database: process.env.DB_NAME || 'healthbridge' });

    // Mock users with hashed passwords
    const mockUsers = [
      {
        id: 1,
        name: 'Admin User',
        email: 'admin@healthbridge.gov',
        password: 'admin123',
        role: 'administrator',
      },
      {
        id: 2,
        name: 'Kael Miranda',
        email: 'kaelmiranda@example.com',
        password: 'kael123',
        role: 'citizen',
      },
      {
        id: 3,
        name: 'Test Citizen',
        email: 'citizen@example.com',
        password: 'citizen123',
        role: 'citizen',
      },
    ];

    console.log('Seeding mock users...');

    for (const user of mockUsers) {
      const hashedPassword = bcryptjs.hashSync(user.password, 10);

      // Check if user exists
      const [existing] = await connection.query(
        'SELECT id FROM users WHERE email = ?',
        [user.email]
      );

      if (existing.length > 0) {
        console.log(`User ${user.email} already exists, skipping...`);
        continue;
      }

      try {
        // Insert user
        await connection.query(
          'INSERT INTO users (name, email, password_hash, role, is_active, created_at, updated_at) VALUES (?, ?, ?, ?, 1, NOW(), NOW())',
          [user.name, user.email, hashedPassword, user.role]
        );

        console.log(`✓ Created user: ${user.email} (${user.role})`);

        // Get the inserted user ID
        const [insertedUser] = await connection.query(
          'SELECT id FROM users WHERE email = ?',
          [user.email]
        );

        const userId = insertedUser[0].id;

        // If citizen, add to citizens table
        if (user.role === 'citizen') {
          const [citizenExists] = await connection.query(
            'SELECT id FROM citizens WHERE user_id = ?',
            [userId]
          );

          if (citizenExists.length === 0) {
            await connection.query(
              'INSERT INTO citizens (user_id, dob, phone, address, gender, additional_info, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())',
              [userId, '1990-01-01', '555-0100', user.email, 'Not specified', 'Mock citizen user']
            );

            console.log(`✓ Created citizen profile for: ${user.email}`);
          }
        }
      } catch (err) {
        console.log(`Skipped ${user.email}: ${err.message}`);
      }
    }

    console.log('\n✓ Mock users seeded successfully!');
    console.log('\nDemo Credentials:');
    console.log('Admin: admin@healthbridge.gov / admin123');
    console.log('Citizen (Kael): kaelmiranda@example.com / kael123');
    console.log('Citizen (Test): citizen@example.com / citizen123');

    await connection.end();
  } catch (error) {
    console.error('Error seeding mock users:', error.message);
    process.exit(1);
  }
}

seedMockUsers();
