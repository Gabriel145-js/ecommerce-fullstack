// db.js
const { neon } = require('@neondatabase/serverless');

const db = neon(process.env.DATABASE_URL);

module.exports = db;