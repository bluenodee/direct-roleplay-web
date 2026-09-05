import mysql from 'mysql2/promise';

function env(key: string, fallback: string): string {
  return (process.env[key] || fallback).trim();
}

const pool = mysql.createPool({
  host: env('DATABASE_HOST', '127.0.0.1'),
  port: parseInt(env('DATABASE_PORT', '3306')),
  user: env('DATABASE_USER', 'root'),
  password: env('DATABASE_PASSWORD', ''),
  database: env('DATABASE_NAME', 'direct_roleplay'),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: env('DATABASE_SSL', 'false') === 'true' ? { rejectUnauthorized: true } : undefined,
});

export default pool;
