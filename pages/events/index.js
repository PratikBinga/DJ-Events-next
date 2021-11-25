import Layout from "../../components/Layout";
import Link from "next/link";
import EventItem from "../../components/EventItem";

export default function index({ result }) {
  console.log(result, "data");
  return (
    <Layout>
      <Link href="/">
        <a> Home</a>
      </Link>
      {result?.map((evt, idx) => (
        <EventItem evt={evt} />
      ))}
    </Layout>
  );
}

export async function getServerSideProps() {
  const data = await fetch("http://localhost:3000/api");
  const result = await data.json();
  console.log(result, "result");
  return {
    props: {
      result,
    },
  };
}
