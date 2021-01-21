import {MongoClient} from 'mongodb'
// This is an API function. It runs as a serverless function,

export default function handler(req, res) {
    // connects to MongoDB cluster
    MongoClient.connect(`mongodb+srv://caleb_katzenstein:${process.env.MONGODB_PASS}@listings.j81m2.mongodb.net/test?retryWrites=true&w=majority`, (err, client) => {
        let data = JSON.parse(req.body);
        let {name} = data;
        console.log(data);
        // inserts the data into the database
        client.db("test").collection("listings").insertOne(data, (innerErr, result) => {
            if (result.result.ok === 1) {
                let _id = result.insertedId;
                // when a status update is given, the update message should have the name of the new product
                // and a link to the page, which is given by the _id
                res.status(200).json({name, _id});
            }
        })
    })
}