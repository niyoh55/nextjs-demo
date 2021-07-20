import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";
import React from "react";

export default function index(props) {
  return (
    <React.Fragment>
      <Head>
        <title>Main Page</title>
        <meta
          name="description"
          content="Browse a list of highly active React meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </React.Fragment>
  );
}

// export const getServerSideProps = (context) => {
//   const req = context.req;
//   const res = context.res;
//   // console.log(req);
//   // console.log(res);
//   return {
//     props: { meetups: DUMMY_MEETUPS },
//   };
// };

export const getStaticProps = async () => {
  //fetch("/api/meetups");

  const client = await MongoClient.connect(
    "mongodb+srv://niyoh:niyoh123@cluster0.3elva.mongodb.net/ReduxCourse?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  client.close();

  return {
    props: {
      meetups: meetups.map((item) => ({
        title: item.title,
        address: item.address,
        image: item.image,
        description: item.description,
        id: item._id.toString(),
      })),
    },
    revalidate: 1,
  };
};
