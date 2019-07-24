module.exports = {
  development: {
    client: 'pg',
    connection: 'postgresql://localhost/to-do',
  },
  production: {
    client: 'pg',
    connection:
      process.env.DATABASE_URL ||
      'postgres://hccjiigdhdxfln:2a99b7e11bbeaa500718f01e6831c93c7d5138c59f5da59f8afda5f07453807e@ec2-174-129-227-51.compute-1.amazonaws.com:5432/d9o5agt10h4a5t',
  },

  // client: 'pg',
  // connection: process.env.DATABASE_URL || 'postgresql://localhost/to-do'
}
