import {MongoClient} from 'mongodb'

export default function handler(req, res) {
    MongoClient.connect('mongodb://localhost:27017', (err, client) => {
        let data = JSON.parse(req.body);
        let {name} = data;
        console.log(data);
        client.db("test").collection("listings").insertOne(data, (innerErr, result) => {
            if (result.result.ok === 1) {
                let _id = result.insertedId;
                res.status(200).json({name, _id});
            }
        })
    })
}