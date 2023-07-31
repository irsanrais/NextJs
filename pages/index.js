import React from "react";
import { getFeaturedEvents } from "../helpers/api-utils";
import EventList from "../components/events/event-list";
import Head from "next/head";

const HomePage = (props) => {
  return (
    <div>
      <Head>
        <title>NextJs Events</title>
      </Head>
      <EventList items={props.events} />
    </div>
  );
};

export async function getStaticProps() {
  const featuredEvent = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvent,
    },
    revalidate: 1800,
  };
}

export default HomePage;
