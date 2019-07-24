module.exports = {
  development: {
    client: 'pg',
    connection: 'postgresql://localhost/to-do',
  },
  production: {
    client: 'pg',
    connection: 'postgres://czmibirwipyxsd:ede20e44d66c36ffdadb5c7fab17537d7fe6baa1914568f11666e414be4bb77c@ec2-107-20-168-237.compute-1.amazonaws.com:5432/d23snv372p7j98',
  },
}
