import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/test")
      .then((response) => {
        console.log(response.data);
        setMessages(response.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log("error: " + (err as Error).message);
      })
      .then(() => {
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <h1>This is the dashboard page</h1>
      <p> this is some sample text</p>
      <h4>Messages: </h4>
      {loading && <p>Loading...</p>}
      {!loading && messages.length === 0 && <p>No messages available. </p>}
      {messages.map((m, index) => (
        <div key={index}>
          <p>{m.owner}</p>
          <p>{m.message}</p>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
