const express = require('express');
const connectdb = require('./src/config/db.js');
const auth = require('./src/routes/authRoutes.js')
const noteRoutes = require('./src/routes/noteRoute.js');
const cors = require('cors');
require('dotenv').config();

const dns = require('dns');

dns.setServers(['8.8.8.8','8.8.4.4']);

const PORT = process.env.PORT;
const app = express();

app.use(express.json())
app.use(cors())


app.use('/api/auth',auth);
app.use('/api/notes', noteRoutes);

async function connection() {
    try {

        await connectdb();

        app.listen(PORT, () => {
            console.log(`The server is running on PORT : ${PORT}`);
        });
        
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
}

connection();
