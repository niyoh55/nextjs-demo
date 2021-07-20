import React from "react";
import MeetupForm from "./../../components/meetups/NewMeetupForm";
import Layout from "../../components/layout/Layout";
import { useRouter } from "next/router";
import Head from "next/head";
export default function NewMeetupPage() {
  const router = useRouter();
  const onAddMeetupHandler = async (meetupData) => {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(meetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    router.push("/");
  };

  return (
    <React.Fragment>
      <Head>
        <title>Add new meetup</title>
        <meta name="description" content="Add new meetup" />
      </Head>
      <MeetupForm onAddMeetup={onAddMeetupHandler} />
    </React.Fragment>
  );
}
