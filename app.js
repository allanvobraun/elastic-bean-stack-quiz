import express from 'express';
import pkg from 'pg';
const { Client } = pkg;
export const app = express();
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: false
});

client.connect().catch(err => console.error('Database connection error:', err));


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/questions', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM questions');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send('Error retrieving questions');
  }
});
