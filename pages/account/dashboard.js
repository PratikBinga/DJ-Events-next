import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import { parseCookies } from "@/helpers/index";
import styles from "@/styles/Dashboard.module.css";
import DashboardEvent from "@/components/DashboardEvent";
import { useRouter } from "next/router";

export default function Dashboard({ events, token }) {
  const router = useRouter();

  const deleteEvent = async (e, id) => {
    console.log(e, id, "delete id ");
    if (confirm("Are you sure?")) {
      const res = await fetch(`${API_URL}/events/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
      } else {
        router.reload();
      }
    }
  };

  console.log(events, "dashboard events");

  return (
    <Layout title={"User Dashboard"}>
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h3>My Events</h3>

        {events.map((evt) => (
          <DashboardEvent
            key={evt.id}
            evt={evt}
            handleDelete={(e) => deleteEvent(e, evt.id)}
          />
          // <h3>{evt.name}</h3>
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);
  console.log(token, "token dashboard");

  const res = await fetch(`${API_URL}/events/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const events = await res.json();
  return {
    props: {
      events,
      token,
    },
  };
}
