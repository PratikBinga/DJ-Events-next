import Layout from "../../components/Layout";
import Link from "next/link";
import EventItem from "../../components/EventItem";

export default function index({ result }) {
  console.log(result, "data");
  return (
    <Layout>
      <h1>Events</h1>
      {result.length === 0 && <h3>No events to show</h3>}
      {result?.map((evt, idx) => (
        <EventItem evt={evt} />
      ))}
    </Layout>
  );
}

export async function getServerSideProps() {
  const data = await fetch("http://localhost:3000/api/events");
  const result = await data.json();
  console.log(result, "result");
  return {
    props: {
      result,
    },
  };
}
