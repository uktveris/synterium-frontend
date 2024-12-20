import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";

function Settings() {
  const { authed } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [fileTest, setFileTest] = useState<{ title: string; desc: string }[]>(
    [],
  );
  const [loading, setLoading] = useState(true);

  const handleClick = async () => {
    if (!authed) {
      return;
    }

    try {
      const response =
        await axiosPrivate.get<{ title: string; desc: string }[]>(
          "/files/files-test",
        );
      setLoading(false);
      setFileTest(response.data);
    } catch (err) {
      setLoading(false);
      console.log("ERROR: settings: " + (err as Error).message);
    }
  };

  return (
    <>
      <h1>The settings page here</h1>
      <p>Some settings to play aroud here</p>
      <button onClick={handleClick}>click for fileTests</button>
      <p>fileTests:</p>
      {loading && <p>Loading fileTests..</p>}
      {!loading && fileTest.length === 0 && (
        <p>No fileTests are available, or you do not have access to them</p>
      )}
      {fileTest.map((f, index) => (
        <div key={index}>
          <h5>{f.title}</h5>
          <p>{f.desc}</p>
        </div>
      ))}
    </>
  );
}

export { Settings };
