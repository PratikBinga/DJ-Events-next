import Layout from "@/components/Layout";
import Link from "next/link";
import EventItem from "@/components/EventItem";
import { API_URL, PER_PAGE } from "@/config/index";
import Pagination from "@/components/Pagination";
import { toast } from "react-toastify";

// const PER_PAGE = 2;

export default function index({ events, page, total }) {
  console.log(events, "events data");

  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {events?.map((evt, idx) => (
        <EventItem evt={evt} />
      ))}

      <Pagination page={page} total={total} />
    </Layout>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  // calculate start page
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

  // Fetch total event counts
  const totalRes = await fetch(`${API_URL}/events/count`);
  const total = await totalRes.json();

  // const data = await fetch("http://localhost:1337/events");
  // Fetch events
  const eventRes = await fetch(
    `${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`
  );

  const events = await eventRes.json();
  console.log(events, "events");

  return {
    props: {
      events,
      page: +page,
      total, // total count of events
    },
  };
}
