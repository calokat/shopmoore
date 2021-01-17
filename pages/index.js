import Head from 'next/head'
import path from 'path'
import Listing from '../components/listing'
import {MongoClient} from 'mongodb'

function serializeFields(fields)
{
  let serialized = {};
  for (let f of fields) {
    console.log(f);
    serialized[f.name] = f.value;
  }
  return serialized;
}

function addListing(e) {
  e.preventDefault();

  let data = serializeFields(document.querySelector("form").elements);
  console.log(data);
  // with help from https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
  fetch('/api/addListing', {
    method: 'POST',
    body: JSON.stringify(data)
  }).then((response) => {
    response.json().then(json => console.log(json));
  })
}

export default function Home({listings}) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        The Shopmoore
      </header>
      {listings.map((listing) => {
        return (
        <Listing name={listing.name} price={listing.price} imgLink={listing.imgLink} desc={listing.desc} />
        )
      })}
      <form onSubmit={addListing}>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text"></input><br />
        <label htmlFor="desc">Description</label>
        <input id="desc" name="desc" type="text"></input><br />
        <label htmlFor="price">Price</label>
        <input id="price" name="price" type="number"></input><br />
        <label htmlFor="imgLink">Image URL</label>
        <input id="imgLink" name="imgLink" type="url"></input><br />
        <input type="submit"></input>
      </form>
    </div>
  )
}

export async function getStaticProps() {
// Connection URL
  const url = 'mongodb://localhost:27017';

// Use connect method to connect to the server
  let mdbClient = await MongoClient.connect(url);
  const db = mdbClient.db("test");

  let listings = await db.collection("listings").find({}).toArray();
  for (let l of listings) {l._id = null}
  console.log(listings);
  return {
    props: {
      listings
    }
  }
}
