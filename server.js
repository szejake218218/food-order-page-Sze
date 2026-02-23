const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const app = express();
const port = 3000;

// 1. Connect to your database file
const db = new sqlite3.Database('./dimsum_db.db');

// 2. Middleware
app.use(express.json());
app.use(cors());

// 3. The Route to record orders
app.post('/add-order', (req, res) => {
    const { tid, fid, qty } = req.body;
    const datetime = new Date().toISOString();

    // 🚨 DEBUGGING LINE 1: This tells us if the website actually sent the data
    console.log(`\n🛎️ [NEW ORDER] Table: ${tid} | Food ID: ${fid} | Qty: ${qty}`);

    const sql = `INSERT INTO transaction_record (tid, fid, qty, datetime) VALUES (?, ?, ?, ?)`;

    db.run(sql, [tid, fid, qty, datetime], function (err) {
        if (err) {
            // 🚨 DEBUGGING LINE 2: This tells us if the Database rejected the data
            console.error("❌ [DB ERROR]:", err.message);
            return res.status(500).send("Database Error");
        }
        // 🚨 DEBUGGING LINE 3: This tells us the save was 100% successful
        console.log(`✅ [SUCCESS] Saved to database! Row ID: ${this.lastID}`);
        res.send(`Order recorded for Table ${tid}!`);
    });
});

app.listen(port, () => {
    console.log(`Chef is ready! Server running at http://localhost:${port}`);
});