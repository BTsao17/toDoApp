module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_URL || 'postgresql://localhost/to-do'
}
