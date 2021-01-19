import Head from 'next/head'
import path from 'path'
import Listing from '../components/listing'
import {MongoClient} from 'mongodb'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Home({listings}) {
  let [sortWithVal, setSortWithVal] = useState("name");
  let [sortByVal, setSortByVal] = useState("low-high");
  let [sortWithPrefix, setSortWithPrefix] = useState("Alphabetically - ");
  let [sortedListings, setSortedListings] = useState(listings);
  let [shouldSort, setShouldSort] = useState(false);
  let [shouldFilter, setShouldFilter] = useState(false);
  let [category, setCategory] = useState("");
  let [canResetFilters, setCanResetFilters] = useState(false);
  useEffect(() => {
    if (sortWithVal == "name") {
      setSortWithPrefix("Alphabetically - ");
    }
    else {
      setSortWithPrefix("");
    }
  });
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
    setSortedListings(listings);
    document.querySelector("#category").value = "";
  }

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Filter Menu</h1>
      <input type="text" defaultValue="Enter category" id="category" onInput={(e) => {setCategory(e.target.value);}}></input>
      <button onClick={(e) => {
        setSortedListings(listings);
        setShouldFilter(true);
      }}>Filter</button>
      {canResetFilters ? <button onClick={resetFilters}>Reset Filters</button> : null}

      <h1>Sort Menu</h1>
      <select id="sortWith" onChange={(e) => {setSortWithVal(e.target.options[e.target.selectedIndex].value);}}>
        <option value="name">Name</option>
        <option value="price">Price</option>
      </select>
      <select id="sortBy" onChange={(e) => {setSortByVal(e.target.options[e.target.selectedIndex].value);}}>
        <option value="low-high">{sortWithPrefix}Lowest to Highest</option>
        <option value="high-low">{sortWithPrefix}Highest to Lowest</option>
      </select>
      <button onClick={() => {
        setShouldSort(true);
  }}>Sort</button>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {sortedListings.map((listing, i) => {
          return (
          <Listing name={listing.name} price={listing.price} imgLink={listing.imgLink} desc={listing.desc} _id={listing._id} category={listing.category} key={i} />
          )
        })}
      </div>
    <div className="bg-black text-white w-max p-0.5 mt-5 ml-5 hover:underline"><Link href="/addListing">Add Listing</Link></div>
    </div>
  )
}

export async function getServerSideProps() {
// Starter code for using the mongodb package is from https://www.npmjs.com/package/mongodb

// Connection URL
  const url = 'mongodb://localhost:27017';

// Use connect method to connect to the server
  let mdbClient = await MongoClient.connect(url);
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
