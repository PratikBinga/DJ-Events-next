import Layout from "@/components/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import EventItem from "@/components/EventItem";
import { API_URL } from "@/config/index";
import qs from "qs";

export default function Search({ result }) {
  const router = useRouter();
  console.log(result, "data");
  return (
    <Layout>
      <Link href="/events">Go Back</Link>
      <h1>Search Results for {router.query.term}</h1>
      {result.length === 0 && <h3>No events to show</h3>}
      {result?.map((evt, idx) => (
        <EventItem evt={evt} key={idx} />
      ))}
    </Layout>
  );
}

export async function getServerSideProps({ query: { term } }) {
  // const data = await fetch("http://localhost:1337/events");
  const query = qs.stringify({
    _where: {
      _or: [
        { name_contains: term },
        { performers_contains: term },
        { description_contains: term },
        { venue_contains: term },
      ],
    },
  });
  const data = await fetch(`${API_URL}/events?${query}`);
  const result = await data.json();
  console.log(result, "result");
  return {
    props: {
      result,
    },
  };
}
