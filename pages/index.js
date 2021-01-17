import Head from 'next/head'
import fs from 'fs'
import path from 'path'
import Listing from '../components/listing'
import {MongoClient} from 'mongodb'
export default function Home({dummyJson}) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        The Shopmoore
      </header>
      {dummyJson.map((listing) => {
        return (
        <Listing name={listing.name} price={listing.price} imgLink={listing.imgLink} desc={listing.desc} />
        )
      })}
      <form action="/api/addListing">
        <label htmlFor="price">Price</label>
        <input id="price" name="price" type="number"></input>
        <input type="submit"></input>
      </form>
    </div>
  )
}

export async function getStaticProps() {
  const dummyData =  fs.readFileSync(path.join(process.cwd(), "/data/dummy.json"));
  const dummyJson = JSON.parse(dummyData.toString());
  console.log(dummyJson);

// Connection URL
const url = 'mongodb://localhost:27017';
 
// Database Name
const dbName = 'myproject';
 
// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  // assert.equal(null, err);
  console.log("I am awesome");
 
  const db = client.db(dbName);
 
  client.close();
});

  return {
    props:
    {
      dummyJson
    }
  } 
}
