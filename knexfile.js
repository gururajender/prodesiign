// Update with your config settings.
module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'myapp_test',
      charset: 'utf8'
    },
  migrations: {
    tableName: 'migrations'
  }
  }
};
