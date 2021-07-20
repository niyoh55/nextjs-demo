import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;
    //console.log(data);
    const client = await MongoClient.connect(
      "mongodb+srv://niyoh:niyoh123@cluster0.3elva.mongodb.net/ReduxCourse?retryWrites=true&w=majority"
    );
    const db = client.db();

    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.insertOne(data);
    //console.log(result);
    client.close();
    res.status(201).json({ message: "Meetup Inserted" });
    //res.status(500).json({ message: "FAILED TO UPLOAD" });
  }
};
export default handler;
