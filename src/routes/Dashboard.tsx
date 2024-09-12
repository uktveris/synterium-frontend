import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface Message {
  owner: string;
  message: string;
}

function Dashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const { setAuthed } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    // setAuthed(false);
    // navigate("/login");
    console.log("log out..");
  };

  const handleNavToSettings = () => {
    navigate("/settings");
  };

  useEffect(() => {
    axios
      .get<Message[]>("http://localhost:8080/api/test")
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
    <>
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
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleNavToSettings}>Go to settings</button>
    </>
  );
}

export default Dashboard;
