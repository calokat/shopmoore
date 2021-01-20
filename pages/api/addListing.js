import {MongoClient} from 'mongodb'

export default function handler(req, res) {
    MongoClient.connect(`mongodb+srv://caleb_katzenstein:${process.env.MONGODB_PASS}@listings.j81m2.mongodb.net/test?retryWrites=true&w=majority`, (err, client) => {
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