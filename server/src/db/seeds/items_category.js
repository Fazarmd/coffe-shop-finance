/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
import { v4 as uuidv4 } from "uuid";

export const seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("category").del();
  await knex("category").insert([
    { id: 1, type: "Espresso Based" },
    { id: 2, type: "Milk Based" },
    { id: 3, type: "Classic" },
    { id: 4, type: "Tea Based" },
    { id: 5, type: "Freshy" },
    { id: 6, type: "Float" },
    { id: 7, type: "Ice Cream" },
  ]);

  await knex("items").del();
  await knex("items").insert([
    { id: uuidv4(), name: "Americano", price: 12000, category_id: 1 },
    { id: uuidv4(), name: "Shakerato", price: 12000, category_id: 1 },
    { id: uuidv4(), name: "Black Lemonade", price: 15000, category_id: 1 },
    { id: uuidv4(), name: "Black Tropical", price: 15000, category_id: 1 },
    { id: uuidv4(), name: "Vanilla Latte", price: 15000, category_id: 2 },
    { id: uuidv4(), name: "Es Kopi Susu", price: 15000, category_id: 2 },
    { id: uuidv4(), name: "Es Kopi Aren", price: 15000, category_id: 2 },
    { id: uuidv4(), name: "Cotton Candy", price: 15000, category_id: 2 },
    { id: uuidv4(), name: "Caffe Latte", price: 15000, category_id: 2 },
    { id: uuidv4(), name: "Caramel Macchiato", price: 15000, category_id: 2 },
    { id: uuidv4(), name: "Chocolate", price: 13000, category_id: 3 },
    { id: uuidv4(), name: "Red Velvet", price: 13000, category_id: 3 },
    { id: uuidv4(), name: "Choco Berry", price: 15000, category_id: 3 },
    { id: uuidv4(), name: "Taro", price: 13000, category_id: 3 },
    { id: uuidv4(), name: "Cookies and Cream", price: 13000, category_id: 3 },
    { id: uuidv4(), name: "Greentea", price: 13000, category_id: 4 },
    { id: uuidv4(), name: "Thaitea", price: 13000, category_id: 4 },
    { id: uuidv4(), name: "Makult", price: 13000, category_id: 5 },
    { id: uuidv4(), name: "Lekult", price: 13000, category_id: 5 },
    { id: uuidv4(), name: "Pinkberries", price: 10000, category_id: 6 },
    { id: uuidv4(), name: "Mangofloat", price: 10000, category_id: 6 },
    { id: uuidv4(), name: "Redblood", price: 10000, category_id: 6 },
    { id: uuidv4(), name: "Cone Mini", price: 6000, category_id: 7 },
    { id: uuidv4(), name: "Fundae", price: 10000, category_id: 7 },
    { id: uuidv4(), name: "Cone Waffle", price: 8000, category_id: 7 },
  ]);
};
