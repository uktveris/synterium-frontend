import { useEffect, useState } from "react";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import styles from "./dashboard.module.css";

interface FileMetadata {
  id: string;
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

  const handleDownload = async (fileId: string, name: string) => {
    try {
      const response = await axiosPrivate.get(
        "/files/file-download?id=" + fileId,
        { responseType: "blob" },
      );

      const blob = new Blob([response.data], {
        type: response.headers["Content-type"],
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;

      console.log(response.headers["Content-Disposition"]);

      const fileName = name;

      link.setAttribute("download", fileName);

      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);

      console.log(response);
    } catch (err) {
      console.log("ERROR: dashboard: " + (err as Error).message);
    }
  };

  const getMessages = async () => {
    try {
      const response = await axiosPrivate.get("/files");
      const filesArr: FileMetadata[] = [];
      response.data.files.forEach((file) => {
        filesArr.push({
          id: file._id,
          name: file.name,
          size: file.size,
          fileType: file.fileType,
          uploadedAt: file.uploadDateTime,
        });
      });
      console.log(filesArr);
      setLoadingFiles(false);
      setFiles(filesArr);
    } catch (err) {
      setLoadingFiles(false);
      console.log("ERROR: dashboard: " + (err as Error).message);
    }
  };
  useEffect(() => {
    getMessages();
  }, [accessToken, axiosPrivate]);
  return (
    <div className={styles.mainContainer}>
      <Header />
      <h1>Dashboard</h1>
      <p>this is some sample text</p>
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
          <button onClick={() => handleDownload(file.id, file.name)}>
            download
          </button>
          <p>-----------</p>
        </div>
      ))}
      <button onClick={handleNavToHome}>Home</button>
      <button onClick={handleNavToSettings}>Go to settings</button>
    </div>
  );
}

export default Dashboard;
