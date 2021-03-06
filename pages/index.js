import Head from 'next/head'
import path from 'path'
import Listing from '../components/listing'
import {MongoClient} from 'mongodb'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import SortMenu from '../components/sortMenu'
import FilterMenu from '../components/filterMenu'

export default function Home({listings}) {
  let [sortWithVal, setSortWithVal] = useState("name");
  let [sortByVal, setSortByVal] = useState("low-high");
  let [sortWithPrefix, setSortWithPrefix] = useState("Alphabetically - ");
  let [sortedListings, setSortedListings] = useState(listings);
  let [shouldSort, setShouldSort] = useState(false);
  let [shouldFilter, setShouldFilter] = useState(false);
  let [category, setCategory] = useState("");
  let [canResetFilters, setCanResetFilters] = useState(false);

  // This controls what the 'sort by' dropdown options say.
  useEffect(() => {
    if (sortWithVal == "name") {
      setSortWithPrefix("Alphabetically - ");
    }
    else {
      setSortWithPrefix("");
    }
  });
  // this fires only when shouldSort changes
  useEffect(() => {
    if (shouldSort) {
      sort();
    }
    return () => {
      setShouldSort(false);
    }
  },[shouldSort]);
  function sort() {
    setSortedListings(sortedListings.sort((l1, l2) => {
      let [a1, a2] = [l1[sortWithVal], l2[sortWithVal]];
      if (sortWithVal === "price") {
        a1 = Number.parseFloat(a1);
        a2 = Number.parseFloat(a2);
      }
      else if (sortWithVal === "name") {
        a1 = a1.toLowerCase();
        a2 = a2.toLowerCase();
      }
      let compareModifier = (sortByVal === "low-high" ? 1 : -1);
      if (a1 < a2) {
        return -1 * compareModifier;
      }
      if (a2 < a1) {
        return 1 * compareModifier;
      }
      else {
        return 0;
      }
    }))
  }
  useEffect(() => {
    if (shouldFilter) {
      filter();
    }
    return () => {
      setShouldFilter(false);
    }
  })

  function filter() {
    setCanResetFilters(true);
    console.log("Original listing count is " + listings.length);
    setSortedListings(sortedListings.filter((sl) => {
      console.log(sl.category);
      console.log("Input category is " + category);
      return sl.category == category;
    }))
  }

  function resetFilters() {
    setCanResetFilters(false);
    // restore all of the listings
    setSortedListings(listings);
    document.querySelector("#category").value = "";
  }

  return (
    <div>
      <Head>
        <title>The Shopmoore</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <FilterMenu onCategoryInput={(e) => {setCategory(e.target.value);}} onFilter={(e) => {
        setSortedListings(listings);
        setShouldFilter(true);
      }} canResetFilters={canResetFilters} resetFilters={resetFilters}  /> <br />
      <SortMenu onSortWithChange={(e) => {setSortWithVal(e.target.options[e.target.selectedIndex].value);}} onSortByChange={(e) => {setSortByVal(e.target.options[e.target.selectedIndex].value);}} sortWithPrefix={sortWithPrefix} onSort={() => {setShouldSort(true);}} />
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {sortedListings.map((listing, i) => {
          return (
          <Listing name={listing.name} price={listing.price} imgLink={listing.imgLink} desc={listing.desc} _id={listing._id} category={listing.category} email={listing.email} key={i} />
          )
        })}
      </div>
    </div>
  )
}

// This fires before the page is rendered.
// Its return value is passed in as props to the page.
export async function getServerSideProps() {
// Starter code for using the mongodb package is from https://www.npmjs.com/package/mongodb

// Connection URL
  const url = `mongodb+srv://caleb_katzenstein:${process.env.MONGODB_PASS}@listings.j81m2.mongodb.net/test?retryWrites=true&w=majority`;

// Use connect method to connect to the server
  let mdbClient = await MongoClient.connect(url, {
    
  });
  const db = mdbClient.db("test");

  let listings = await db.collection("listings").find({}).toArray();
  for (let l of listings) {l._id = l._id.toHexString()}
  console.log(listings);
  return {
    props: {
      listings
    }
  }
}
