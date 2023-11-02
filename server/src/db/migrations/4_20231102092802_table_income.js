/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable("income", (table) => {
    table.uuid("id").primary().unique();
    table.string("income_type");
    table.integer("amount");
    table.dateTime("income_date");
    table.text("description");
    table.timestamps(true, true);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTable("income");
}
