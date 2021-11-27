import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import { API_URL } from "@/config/index";

export default function Home({ result }) {
  console.log(result, "data");
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {result?.length === 0 && <h3>No events to show</h3>}
      {result?.map((evt, idx) => (
        <EventItem evt={evt} />
      ))}
    </Layout>
  );
}

export async function getServerSideProps() {
  // const data = await fetch(`http://localhost:1337/events?_sort=date:ASC&_limit=3`);
  const data = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=3`);
  const result = await data.json();
  console.log(result, "result");
  return {
    props: {
      result: result,
    },
  };
}
