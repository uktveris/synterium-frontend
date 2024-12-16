import { useEffect, useState } from "react";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface Message {
  owner: string;
  message: string;
}

function Dashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const messagesArr = [
    {
      owner: "first owner",
      message: "first msg",
    },
    {
      owner: "second owner",
      message: "another msg",
    },
    {
      owner: "last owner",
      message: "more msg",
    },
  ];

  const handleNavToHome = () => {
    navigate("/home");
  };

  const handleNavToSettings = () => {
    navigate("/settings");
  };

  useEffect(() => {
    console.log("LOG: dashboard - at: " + accessToken);
    const getMessages = () => {
      axiosPrivate
        .get<Message[]>("/files", { withCredentials: true })
        .then((response) => {
          setLoading(false);
          setMessages(response.data);
        })
        .catch((err) => {
          setLoading(false);
          console.log(
            "LOG: dashboard: error occurred: " + (err as Error).message,
          );
        });
      // setMessages(messagesArr);
    };
    getMessages();
  }, [accessToken, axiosPrivate]);
  return (
    <>
      <h1>This is the dashboard page</h1>
      <p> this is some sample text</p>
      <h4>Messages: </h4>
      {loading && <p>Loading...</p>}
      {!loading && messages.length === 0 && (
        <p>No messages available. or you dont have access to them. </p>
      )}
      {messages.map((m, index) => (
        <div key={index}>
          <p>{m.owner}</p>
          <p>{m.message}</p>
        </div>
      ))}
      <button onClick={handleNavToHome}>Home</button>
      <button onClick={handleNavToSettings}>Go to settings</button>
    </>
  );
}

export default Dashboard;
