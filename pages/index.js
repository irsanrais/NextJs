import React from "react";
import { getFeaturedEvents } from "../helpers/api-utils";
import EventList from "../components/events/event-list";

const HomePage = (props) => {
  return (
    <div>
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
  };
}

export default HomePage;
