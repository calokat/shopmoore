import Link from 'next/link'
import { useState } from 'react';
import StatusBar from '../components/statusBar'
import Head from 'next/head'
export default function AddListing(props) {
    
    let [statusName, setStatusName] = useState("");
    let [statusId, setStatusId] = useState("");
    function serializeFields(fields)
    {
      let serialized = {};
      for (let f of fields) {
        console.log(f);
        serialized[f.name] = f.value;
      }
      return serialized;
    }    

    async function toAPI(e) {
        e.preventDefault();
      
        let data = serializeFields(document.querySelector("form").elements);
        console.log(data);
        // with help from https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
        let statusData = await fetch('/api/addListing', {
          method: 'POST',
          body: JSON.stringify(data)
        }).then((response) => {
          return response.json();
          //.then(json => document.querySelector("#status").innerHTML = `&#10003; Success! Your listing for ${json.name} has been created! <a href="/listings/${json._id}">View Listing</a>`);
        });
        setStatusName(statusData.name);
        setStatusId(statusData._id);
      }
    
      
    return (
    <>
        <Head><title>Add Listing</title></Head>
        <StatusBar statusId={statusId} statusName={statusName}/>
        <form className="text-3xl" onSubmit={toAPI}>
            <label htmlFor="name">Name</label>{' '}
            <input required id="name" name="name" type="text"></input><br />
            <label htmlFor="desc">Description</label>{' '}
            <input required id="desc" name="desc" type="text"></input><br />
            <label htmlFor="category">Category</label>{' '}
            <input required id="category" name="category" type="text"></input><br />
            <label htmlFor="price">Price</label>{' '}
            <input required id="price" name="price" type="number"></input><br />
            <label htmlFor="imgLink">Image URL (optional)</label>{' '}
            <input id="imgLink" name="imgLink" type="url"></input><br />
            <label htmlFor="email">Seller Email</label>{' '}
            <input required id="email" name="email" type="email"></input><br />
            <input className="btn" type="submit" value="Add Listing"></input>
        </form>
    </>
    )
}