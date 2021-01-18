import {useRouter} from 'next/router'
import {MongoClient} from 'mongodb'
import Listing from '../../components/listing'
import bson from 'bson'
export default function ListingPage({listing}) {
    return <Listing name={listing.name} price={listing.price} imgLink={listing.imgLink} desc={listing.desc} _id={listing._id} />
}

export async function getServerSideProps(ctx) {
    const url = 'mongodb://localhost:27017';
    const {listing_id} = ctx.query;
    let mdbClient = await MongoClient.connect(url);
    const db = mdbClient.db("test");
    const hashedID = bson.ObjectId.createFromHexString(listing_id);
    let potentialListing = await db.collection("listings").find({_id: hashedID}).toArray();
    let listing;
    if (potentialListing !== [])
    {
        listing = potentialListing[0];
        listing._id = listing_id;
        return {
            props: {listing}
        }
    }
    else
    {
        return {props: {}}
    }
}