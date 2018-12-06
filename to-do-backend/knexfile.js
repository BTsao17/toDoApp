module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_URL || {
    user: 'bonniet', 
    password: '', 
    database: 'to-do' 
  }
}
