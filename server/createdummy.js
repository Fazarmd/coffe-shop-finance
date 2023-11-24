import Chance from "chance";
import db from "./src/db/db.js";

// Inisialisasi Chance
const chance = new Chance();

// Fungsi untuk membuat data dummy
const createDummyData = async () => {
  const items = await db.select("id", "price").from("items");
  const startDate = new Date("2023-11-03");
  const endDate = new Date("2023-11-30");

  for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
    for (let i = 0; i < 40; i++) {
      // Ubah angka ini untuk mengubah jumlah data dummy per hari
      const item = items[chance.integer({ min: 0, max: items.length - 1 })];
      const quantity = chance.integer({ min: 1, max: 10 });
      const transaction_date = new Date(d); // Menggunakan tanggal dari loop
      const total_price = quantity * item.price; // Menggunakan harga dari item yang dipilih

      await db("transaction").insert({
        id: chance.guid(),
        item_id: item.id,
        quantity,
        transaction_date,
        total_price,
      });
    }
  }
};

createDummyData().then(() => console.log("Data dummy berhasil dibuat!"));
