const express = require('express')
const app = express()
const cors = require('cors')
const { MongoClient } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.o0i8x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(uri)

async function run() {
    try {
        await client.connect();
        const database = client.db('interior_design');
        const usersCollection = database.collection('users');
        const servicesCollection = database.collection('services');
        // add user
        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await usersCollection.insertOne(user)
            res.json(result)
            console.log(user);
        })

        //add service
        app.post('/addServices', async (req, res) => {
            const user = req.body;
            const result = await servicesCollection.insertOne(user)
            res.json(result)
            console.log(user);
        })
    }
    finally {
        // await client.close();
    }
}








run().catch(console.dir)
app.get('/', (req, res) => {
    res.send('Hello this interior-design!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})