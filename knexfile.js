module.exports = {
  development: {
    client: 'pg',
    connection: 'postgresql://localhost/to-do',
  },
  production: {
    client: 'pg',
    connection:
      process.env.DATABASE_URL || 'postgres://eshyjhqabberlx:325ad57f91999c244318e3625685d2a49f58cc4eb9994225e4be00424edeea14@ec2-107-20-168-237.compute-1.amazonaws.com:5432/d97q96k3grcjiv',
  },

  // client: 'pg',
  // connection: process.env.DATABASE_URL || 'postgresql://localhost/to-do'
}
