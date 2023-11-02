/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable("transaction", (table) => {
    table.uuid("id").primary().unique();
    table.uuid("item_id").references("id").inTable("items").onDelete("CASCADE");
    table.integer("quantity");
    table.dateTime("transaction_date");
    table.integer("total_price");
    table.timestamps(true, true);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTable("transaction");
}
