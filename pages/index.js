import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  )
}

export async function getStaticProps() {
  const dummyData =  fs.readFileSync(path.join(process.cwd(), "/data/dummy.json"));
  const dummyJson = JSON.parse(dummyData.toString());
  console.log(dummyJson);

// Connection URL
const url = 'mongodb://localhost:27017';
 
// Database Name
const dbName = 'myproject';
 
// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  // assert.equal(null, err);
  console.log("I am awesome");
 
  const db = client.db(dbName);
 
  client.close();
});

  return {
    props:
    {
      dummyJson
    }
  } 
}
