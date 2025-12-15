-- HealthBridge database schema
-- Creates a `healthbridge` database and a `users` table for admins and citizens.
-- NOTE: For production, always store password hashes (bcrypt) not plain text.

CREATE DATABASE IF NOT EXISTS healthbridge
  DEFAULT CHARACTER SET = utf8mb4
  DEFAULT COLLATE = utf8mb4_unicode_ci;
USE healthbridge;

-- Users table (single table for both citizens and administrators)
CREATE TABLE IF NOT EXISTS users (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('citizen','administrator') NOT NULL DEFAULT 'citizen',
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Development/demo seed data
-- WARNING: These INSERTs use plain-text passwords for convenience only.
-- Replace `password_hash` values with bcrypt hashes before using in production.

INSERT INTO users (name, email, password_hash, role) VALUES
  ('Admin User', 'admin@healthbridge.gov', '$2b$12$oiP/pe7ImEqUK7CO2YOqBe/bLT2dbkKcMocjn6RcGuuHhDUBuTpkq', 'administrator'),
  ('John Doe', 'citizen@example.com', '$2b$12$iw7d29IV5JdMOWuBfkSGkuMxZFyMFnN15eKS2jiJ5mnBKz8IL8b/e', 'citizen');

-- Useful queries:
-- Select all users: SELECT id, name, email, role, created_at FROM users;
-- Find by email: SELECT * FROM users WHERE email = 'admin@healthbridge.gov';
