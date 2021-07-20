import { MongoClient, ObjectId } from "mongodb";
import React from "react";
import Head from "next/head";
import MeetupDetail from "./../../components/meetups/MeetupDetail";
export default function MeetupDetails(props) {
  // const router = useRouter;
  // console.log(router.query);
  return (
    <React.Fragment>
      <Head>
        <title>{props.title}</title>
        <meta name="description" content={props.description} />
      </Head>
      <MeetupDetail
        id={props._id}
        image={props.image}
        title={props.title}
        address={props.address}
        description={props.description}
      />
    </React.Fragment>
  );
}

export const getStaticPaths = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://niyoh:niyoh123@cluster0.3elva.mongodb.net/ReduxCourse?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: true,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
};

export const getStaticProps = async (context) => {
  const params = context.params;
  const meetupId = context.params.meetupId;
  //fetch for a single meetup
  const client = await MongoClient.connect(
    "mongodb+srv://niyoh:niyoh123@cluster0.3elva.mongodb.net/ReduxCourse?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });
  client.close();

  return {
    props: {
      id: selectedMeetup._id.toString(),
      title: selectedMeetup.title,
      address: selectedMeetup.address,
      image: selectedMeetup.image,
      description: selectedMeetup.description,
    },
  };
};
