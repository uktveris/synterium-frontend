import { useEffect, useState } from "react";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [messages, setMessages] = useState<string[]>([]);
  const [loadingMsg, setLoadingMsg] = useState(true);
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  // test
  const [inputValue, setInputValue] = useState("");

  const handleNavToHome = () => {
    navigate("/home");
  };

  const handleNavToSettings = () => {
    navigate("/settings");
  };

  const postNewMsg = async () => {
    if (inputValue.trim() === "") {
      console.log("msg cannot be empty..");
      return;
    }
    try {
      const response = await axiosPrivate.post("/files/post-message", {
        inputValue,
      });
      getMessages();
      console.log("dashboard: post message response: " + response.data);
    } catch (err) {
      console.log("ERROR: dashboard: " + (err as Error).message);
    }
  };

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const getMessages = async () => {
    try {
      const response = await axiosPrivate.get("/files");
      console.log("messages response:");
      console.log(response.data);
      setLoadingMsg(false);
      setMessages(response.data.mappedMsg);
    } catch (err) {
      setLoadingMsg(false);
      console.log("ERROR: dashboard: " + (err as Error).message);
    }
  };
  useEffect(() => {
    console.log("LOG: dashboard - at: " + accessToken);
    getMessages();
  }, [accessToken, axiosPrivate]);
  return (
    <>
      <h1>This is the dashboard page</h1>
      <p> this is some sample text</p>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="message.."
      />
      <button onClick={postNewMsg}>add message</button>
      <h4>Messages: </h4>
      {loadingMsg && <p>Loading...</p>}
      {!loadingMsg && messages.length === 0 && (
        <p>No messages available. or you dont have access to them. </p>
      )}
      {messages.map((message, index) => (
        <div key={index}>
          <p>{message}</p>
        </div>
      ))}
      <button onClick={handleNavToHome}>Home</button>
      <button onClick={handleNavToSettings}>Go to settings</button>
    </>
  );
}

export default Dashboard;
