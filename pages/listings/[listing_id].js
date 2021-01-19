import {useRouter} from 'next/router'
import Error from 'next/error'
import {MongoClient} from 'mongodb'
import Listing from '../../components/listing'
import bson from 'bson'
import Link from 'next/link'
export default function ListingPage({error, listing}) {
    if (error) {
        return <Error statusCode={error} />
    }
    return ( 
    <>
    <div className="ml-16">
        <h1 className="text-3xl">
            <Link href="/">&larr; Go to home</Link><br />
        </h1>
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
            </div>
        </div>
    </>
    )
}

export async function getServerSideProps(ctx) {
    const url = 'mongodb://localhost:27017';
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