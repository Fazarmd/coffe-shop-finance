/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable("expenses", (table) => {
    table.uuid("id").primary().unique();
    table.string("expense_type");
    table.integer("amount");
    table.dateTime("expense_date");
    table.text("description");
    table.timestamps(true, true);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTable("expenses");
}
