// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './database/db.sqlite'
    },
    migrations: {
      directory: './database/migrations' //folder where all the log changes will be saved. (npx knex migrate: make "name")
    },
    useNullAsDefault: true,
  },

  test: {
    client: 'sqlite3',
    connection: {
      filename: './database/dbtest.sqlite'
    },
    migrations: {
      directory: './database/migrations' //folder where all the log changes will be saved. (npx knex migrate: make "name")
    },
    useNullAsDefault: true,
  },  

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
