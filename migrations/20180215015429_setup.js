
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function (table) {
    table.increments();
    table.string('username').notNullable().unique();
    table.string('email').notNullable().unique();
    table.string('timezone').notNullable();
    table.string('password_digest').notNullable();
    table.timestamps();
  }).createTable('verifyemail', function (table) {
    table.string('email').notNullable().unique();
    table.string('verifycode').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
  .dropTable('verifyemail');
};
