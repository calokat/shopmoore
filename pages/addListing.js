import Link from 'next/link'
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
      response.json().then(json => console.log(json));
    })
  }
  

export default function AddListing(props) {
    return (
    <>
        <h1 className="text-3xl">
            <Link href="/">&larr; Go to home</Link><br />
        </h1>
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
            <input type="submit"></input>
        </form>
    </>
    )
}