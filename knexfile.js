module.exports = {
  development: {
    client: 'pg',
    connection: 'postgresql://localhost/to-do'
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }

  // client: 'pg',
  // connection: process.env.DATABASE_URL || 'postgresql://localhost/to-do'
}
