/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema
    .createTable("category", (table) => {
      table.increments("id").primary();
      table.string("type");
    })
    .createTable("items", (table) => {
      table.uuid("id").unique().notNullable().primary();
      table.text("name").notNullable();
      table.integer("price").notNullable();
      table.integer("category_id").references("id").inTable("category").onDelete("CASCADE");
    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTable("category");
}
