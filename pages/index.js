import Head from 'next/head'
import path from 'path'
import Listing from '../components/listing'
import {MongoClient} from 'mongodb'
import Link from 'next/link'

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
    <Link href="/addListing">Add Listing</Link>
    </div>
  )
}

export async function getServerSideProps() {
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
