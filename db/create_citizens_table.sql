-- Migration: create `citizens` table linked to `users`
USE healthbridge;

CREATE TABLE IF NOT EXISTS citizens (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NOT NULL UNIQUE,
  dob DATE DEFAULT NULL,
  phone VARCHAR(32) DEFAULT NULL,
  address TEXT DEFAULT NULL,
  gender ENUM('female','male','other') DEFAULT NULL,
  additional_info JSON DEFAULT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_citizen_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Seed a citizen record for the demo user (if the user exists)
INSERT INTO citizens (user_id, dob, phone, address, gender)
SELECT id, '1990-01-01', '555-0101', 'Demo Address, Anytown', 'male'
FROM users WHERE email = 'citizen@example.com'
  AND NOT EXISTS (
    SELECT 1 FROM citizens c JOIN users u ON c.user_id = u.id WHERE u.email = 'citizen@example.com'
  );

-- Useful query: get citizen profile joined to user
-- SELECT u.id as user_id, u.name, u.email, c.* FROM users u JOIN citizens c ON c.user_id = u.id WHERE u.email = 'citizen@example.com';
