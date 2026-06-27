//This file creates one MongoDB connection and reuses it everywhere instead of creating a new connection every time.



import {mongoClient} from 'mongodb';

const uri=process.env.MONGO_URI;                                //MongoDB connection string from environment variable

if(!uri){
  throw new Error('MONGO_URI environment variable is not defined');  
}

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {       //development mode: use a global variable to maintain a cache of the connection across hot reloads
    if (!global._mongoClientPromise) {              
        client = new mongoClient(uri);              // create a new MongoClient instance
        global._mongoClientPromise = client.connect(); // connect to the database and store the promise in a global variable
    }
    clientPromise = global._mongoClientPromise;    
}   else {
    client = new mongoClient(uri);
    clientPromise = client.connect();
}

export default clientPromise;