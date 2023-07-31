import React from "react";
import { getFeaturedEvents } from "../helpers/api-utils";
import EventList from "../components/events/event-list";
import Head from "next/head";
import NewsletterRegistration from "../components/input/newsletter-registration";

const HomePage = (props) => {
  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve..."
        />
      </Head>
      <NewsletterRegistration />
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
