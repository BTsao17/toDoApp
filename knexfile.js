module.exports = {
  development: {
    client: 'pg',
    connection: 'postgresql://localhost/to-do',
  },
  production: {
    client: 'pg',
    connection:
      process.env.DATABASE_URL ||
      'postgres://vsbvoiwjnzicma:13c3108ade4c484367cd2d10495a55eb963f85b6b5a9f9883b7542199148ba39@ec2-54-227-251-33.compute-1.amazonaws.com:5432/d8jgplu1r591c6',
  },

  // client: 'pg',
  // connection: process.env.DATABASE_URL || 'postgresql://localhost/to-do'
}
