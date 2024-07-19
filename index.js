const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = 3000;

const pool = new Pool({
    user: 'enterprisedb',
    host: '10.135.70.226',
    database: 'Helpline_Report',
    password: 'IGRS@123',
    port: 5444,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/callFunction', async (req, res) => {
    // Check for a specific header
    const requiredHeaderValue = req.headers['apikey']; 

    // Validate header value
    if (requiredHeaderValue !== '$2a$10$opvhZUI2k4OmyF1BJjSxb.IGRS6QRQ8UvyDvGDOqdXdqe0ZqzTc4MrHh2') {  // Replace '123' with the expected header value
        return res.status(400).json({ error: 'Invalid or missing API key' });
    }

    try {
        // Query the database
        const result2 = await pool.query('SELECT * FROM udf_level_wise_reference_for_dm_lvl2_java_power_bi()');

        // Send the result as-is since it's already in JSON format
        res.status(200).json({ result:result2.rows}); 

    } catch (err) {
        console.error('Error executing query', err.stack);
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});
