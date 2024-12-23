import { useEffect, useState } from "react";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface FileMetadata {
  name: string;
  size: number;
  fileType: string;
  uploadedAt: Date;
}

function Dashboard() {
  const [files, setFiles] = useState<FileMetadata[]>([]);
  const [loadingFiles, setLoadingFiles] = useState(true);
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const handleNavToHome = () => {
    navigate("/home");
  };

  const handleNavToSettings = () => {
    navigate("/settings");
  };

  const getMessages = async () => {
    try {
      const response = await axiosPrivate.get("/files");
      const filesArr: FileMetadata[] = [];
      response.data.files.forEach((file) => {
        filesArr.push({
          name: file.name,
          size: file.size,
          fileType: file.fileType,
          uploadedAt: file.uploadDateTime,
        });
      });
      console.log(files);
      setLoadingFiles(false);
      setFiles(filesArr);
    } catch (err) {
      setLoadingFiles(false);
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
      <h4>Messages: </h4>
      {loadingFiles && <p>Loading...</p>}
      {!loadingFiles && files.length === 0 && (
        <p>No files available. or you dont have access to them. </p>
      )}
      {files.map((file, index) => (
        <div key={index}>
          <p>file: {file.name}</p>
          <p>size: {file.size}</p>
          <p>type: {file.fileType}</p>
          <p>uploaded at: {file.uploadedAt.toString()}</p>
        </div>
      ))}
      <button onClick={handleNavToHome}>Home</button>
      <button onClick={handleNavToSettings}>Go to settings</button>
    </>
  );
}

export default Dashboard;
