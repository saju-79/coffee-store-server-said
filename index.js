const express = require('express');
const cors = require('cors');
const app = express();
const port =  process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

app.use(cors());
app.use(express.json());
require("dotenv").config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@saju-79.sm1o2zm.mongodb.net/?appName=Saju-79`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
      const dataCollection = client.db("coffees").collection("coffee");
      app.post("/users" , async(req ,res) =>{
        const coffee = req.body;
        const result =  await dataCollection.insertOne(coffee);
        res.send(result)
      });
       app.get( "/users" , async(req ,res) =>{
            const result = await dataCollection.find().toArray();
            res.send(result)
       });

       app.delete("/users/:id" , async(req , res) =>{
        const id = req.params.id;
        const query = {_id : new ObjectId(id)};
        const result = await dataCollection.deleteOne(query);
        res.send(result)
       });

      app.get("/users/:id" , async(req , res) =>{
        const id = req.params.id;
        const query = {_id : new ObjectId(id)};
        const result = await dataCollection.findOne(query);
        res.send(result)

      })
     
    app.put("/users/:id" ,  async(req , res) =>{
        const id = req.params.id;
        const query= {_id :new ObjectId(id)};
        const user =req.body;
         const updateDocs ={
            $set:user
         }
          const options = { upsert: true };
         const result =await dataCollection.updateOne(query , updateDocs , options);
         res.send(result)
    })










   
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("coffee").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
 
     
  }
}
run().catch(console.dir);












app.get('/' ,  (req , res) =>{
    res.send("cofffee store server is running ");

});
app.listen(port , ()=>{
    console.log(`coffee store server is runing on port ${port}`);

})

