import {useRouter} from 'next/router'
import Error from 'next/error'
import {MongoClient} from 'mongodb'
import Listing from '../../components/listing'
import bson from 'bson'
import Link from 'next/link'
import Head from 'next/head'

// This is basically a 'template' for each item's page.
// The listing_id would be the part of the URL after '/listings/'
// It is a stringified MongoDB ObjectID 
export default function ListingPage({error, listing}) {
    if (error) {
        return <Error statusCode={error} />
    }
    return ( 
    <>
        <Head>
            <title>{listing.name} Listing</title>
        </Head>
        <div className="ml-16">
            <span className="text-7xl">
                {listing.name}
            </span>
            <p className="text-3xl">Category: {listing.category}</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <img src={listing.imgLink} className="ml-16"></img>
            <div className="text-right text-3xl mr-16">
                <p>Description:</p>
                <p className="">{listing.desc}</p>
                <br /><br />
                <p>Price:</p>
                <p>${listing.price}</p>
                <p>Seller email: </p>{'\n'}<p><a href={`mailto:${listing.email}`}>{listing.email}</a></p>
                <button className="pl-5 pr-5 pt-2 pb-2">&#x1f6d2; Buy Now!</button>
            </div>
        </div>
    </>
    )
}

// This fires before the page is rendered.
// Its return value is passed in as props to the page.
export async function getServerSideProps(ctx) {
    const url = `mongodb+srv://caleb_katzenstein:${process.env.MONGODB_PASS}@listings.j81m2.mongodb.net/test?retryWrites=true&w=majority`;
    const {listing_id} = ctx.query;
    let mdbClient = await MongoClient.connect(url);
    const db = mdbClient.db("test");
    // Some validation, in case someone decides to edit the URL directly.
    if (listing_id.length !== 24 || !bson.ObjectId.isValid(listing_id)) {
        return {
            props: {
                error: 404
            }}
    }
    const hashedID = bson.ObjectId.createFromHexString(listing_id);
    let potentialListing = await db.collection("listings").find({_id: hashedID}).toArray();
    let listing;
    if (potentialListing.length !== 0) {
        listing = potentialListing[0];
        // listing_id is a string, while _id as is is a binary blob, which React cannot parse
        // so we replace _id with listing_id, knowing that we can easily get one from the other 
        listing._id = listing_id;
        return {
            props: {listing}
        }
    }
    else {
        return {
            props: {
                error: 404
            }}
    }
}