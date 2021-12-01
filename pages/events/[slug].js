import Layout from "@/components/Layout";
import styles from "@/styles/Event.module.css";
import Link from "next/link";
import Image from "next/image";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import { API_URL } from "@/config/index";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import EventMap from "@/components/EventMap";

export default function EventPage({ evt }) {
  const router = useRouter();
  console.log(evt, "evt");

  const deleteEvent = async (e, event) => {
    console.log(e, event, "inside");
    if (confirm(`Are you sure to Delete?`)) {
      const res = await fetch(`${API_URL}/events/${event.id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
      } else {
        router.push("/events");
      }
    }
  };
  console.log(evt.image, "imagein slug--");
  return (
    <Layout title={"Event Details"}>
      <div className={styles.event}>
        {/* <div className={styles.controls}>
          <Link href={`/events/edit/${evt.id}`}>
            <a>
              <FaPencilAlt /> Edit Event
            </a>
          </Link>
          <a
            href="#"
            className={styles.delete}
            onClick={(e) => deleteEvent(e, evt)}
          >
            <FaTimes /> Delete
          </a>
        </div> */}

        <span>
          {new Date(evt.date).toLocaleDateString("en-US")} at {evt.time}
        </span>
        <ToastContainer />
        <h1>{evt.name}</h1>
        <div className={styles.image}>
          {/* <Image
            src={
              evt.image
                ? evt.image.formats.medium.url
                : "/images/event-default.png"
            }
            width={960}
            height={600}
          /> */}
          {evt.image && (
            <div className={styles.image}>
              <Image
                src={evt.image.formats.medium.url}
                width={960}
                height={600}
              />
            </div>
          )}
        </div>
        <h3>Performers:</h3>
        <p>{evt.performers}</p>
        <h3>Description:</h3>
        <p>{evt.description}</p>
        <h3>Venue: {evt.venue}</h3>
        <p>{evt.address}</p>
        {/* <EventMap evt={evt} /> */}
      </div>
    </Layout>
  );
}

// export async function getStaticPaths() {
//   // const res = await fetch("http://localhost:3000/api/events");
//   const res = await fetch(`${API_URL}/events`);
//   const events = await res.json();
//   console.log(events, "events--");
//   const paths = events.map((evt, idx) => ({
//     params: {
//       slug: evt.slug,
//     },
//   }));

//   return {
//     paths,
//     fallback: true,
//   };
// }

// export async function getStaticProps({ params: { slug } }) {
//   // const res = await fetch(`http://localhost:3000/api/events/${slug}`);
//   const res = await fetch(`${API_URL}/events/?slug=${slug}`);
//   const events = await res.json();

//   return {
//     props: {
//       evt: events[0],
//       revaliadate: 1,
//     },
//   };
// }

export async function getServerSideProps({ query: { slug } }) {
  const res = await fetch(`${API_URL}/events?slug=${slug}`)
  const events = await res.json()

  return {
    props: {
      evt: events[0],
    },
  }
}