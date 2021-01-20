import {useRouter} from 'next/router'
import Error from 'next/error'
import {MongoClient} from 'mongodb'
import Listing from '../../components/listing'
import bson from 'bson'
import Link from 'next/link'
import Head from 'next/head'
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
                <button className="pl-5 pr-5 pt-2 pb-2">&#x1f6d2; Buy Now!</button>
            </div>
        </div>
    </>
    )
}

export async function getServerSideProps(ctx) {
    const url = `mongodb+srv://caleb_katzenstein:${process.env.MONGODB_PASS}@listings.j81m2.mongodb.net/test?retryWrites=true&w=majority`;
    const {listing_id} = ctx.query;
    let mdbClient = await MongoClient.connect(url);
    const db = mdbClient.db("test");
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