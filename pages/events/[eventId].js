import React from "react";
import { useRouter } from "next/router";
import { getEventById, getAllEvents } from "../../helpers/api-utils";
import { Fragment } from "react";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";

const detailedEvent = (props) => {
  const event = props.selectedEvent;

  if (!event) {
    return (
      <Fragment>
        <ErrorAlert>
          <h1>Page Not Found</h1>
        </ErrorAlert>
      </Fragment>
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
  };
}

export async function getStaticPaths() {
  const event = await getAllEvents();

  const path = event.map((event) => ({ params: { eventId: event.id } }));

  return {
    paths: path,
    fallback: false,
  };
}

export default detailedEvent;
