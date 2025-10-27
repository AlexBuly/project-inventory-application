require("dotenv").config({ override: true });
console.log("Loaded DATABASE_URL:", process.env.DATABASE_URL);
const pool = require("./pool");

async function populate() {
    try {
        await pool.query(
        `
            CREATE TABLE IF NOT EXISTS category (
                 id SERIAL PRIMARY KEY,
                 categoryName TEXT NOT NULL
            );
        `
    );

        await pool.query (
            `
                INSERT INTO category (categoryName)
                VALUES ('Instruments'),
                       ('Accessories');
            `
        );
        await pool.query(
            `
                CREATE TABLE IF NOT EXISTS item (
                    item_id SERIAL PRIMARY KEY,
                    item_name TEXT,
                    description TEXT NOT NULL,
                    category_id INT,
                    FOREIGN KEY (category_id) REFERENCES category(id),
                    item_price DECIMAL(10, 2) NOT NULL
                );
            `
        )
    } catch (err) {
         console.error("Error populating DB:", err);

    } finally {
        await pool.end();
        console.log("Database populated successfully!");
    }
    
}
populate();