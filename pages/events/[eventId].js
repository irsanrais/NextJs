import React from "react";
import { useRouter } from "next/router";
import { getEventById, getFeaturedEvents } from "../../helpers/api-utils";
import { Fragment } from "react";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";

const detailedEvent = (props) => {
  const event = props.selectedEvent;

  if (!event) {
    return (
      <div>
        <p className="center">Loading...</p>
      </div>
    );
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
};

export async function getStaticProps(context) {
  const eventId = context.params.eventId;

  const event = await getEventById(eventId);

  return {
    props: {
      selectedEvent: event,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const event = await getFeaturedEvents();

  const path = event.map((event) => ({ params: { eventId: event.id } }));

  return {
    paths: path,
    fallback: `blocking`,
  };
}

export default detailedEvent;
