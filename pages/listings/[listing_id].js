import {useRouter} from 'next/router'
import Error from 'next/error'
import {MongoClient} from 'mongodb'
import Listing from '../../components/listing'
import bson from 'bson'
export default function ListingPage({error, listing}) {
    if (error) {
        return <Error statusCode={error} />
    }
    return <Listing name={listing.name} price={listing.price} imgLink={listing.imgLink} desc={listing.desc} _id={listing._id} />
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