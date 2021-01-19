import Link from 'next/link'
import { useState } from 'react';
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

function toAPI(e) {
    e.preventDefault();
  
    let data = serializeFields(document.querySelector("form").elements);
    console.log(data);
    // with help from https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    fetch('/api/addListing', {
      method: 'POST',
      body: JSON.stringify(data)
    }).then((response) => {
      response.json().then(json => document.querySelector("#status").innerHTML = `&#10003; Success! Your listing for ${json.name} has been created! <a href="/listings/${json._id}">View Listing</a>`);
    })
  }
  

export default function AddListing(props) {
    return (
    <>
    <div id="status"></div>
        <form onSubmit={toAPI}>
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text"></input><br />
            <label htmlFor="desc">Description</label>
            <input id="desc" name="desc" type="text"></input><br />
            <label htmlFor="category">Category</label>
            <input id="category" name="category" type="text"></input><br />
            <label htmlFor="price">Price</label>
            <input id="price" name="price" type="number"></input><br />
            <label htmlFor="imgLink">Image URL</label>
            <input id="imgLink" name="imgLink" type="url"></input><br />
            <label htmlFor="email">Seller Email</label>
            <input id="email" name="email" type="email"></input><br />
            <input type="submit"></input>
        </form>
    </>
    )
}