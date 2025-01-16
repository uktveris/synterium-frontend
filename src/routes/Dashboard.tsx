import { useEffect, useState } from "react";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import styles from "./dashboard.module.css";
import Header from "../components/Header";
import { FileCard } from "../components/FileCard";
import { useNavigate } from "react-router-dom";

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
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

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
      <div className={styles.content}>
        <div className={styles.topContainer}>
          <h1>Your files</h1>
          <button
            className={styles.uploadFile}
            onClick={() => navigate("/file-upload")}
          >
            Upload Files
          </button>
        </div>
        <p>File that you have uploaded will appear here.</p>
        {loadingFiles && <p>Loading...</p>}
        {!loadingFiles && files.length === 0 && (
          <p>No files available. or you dont have access to them. </p>
        )}
        <div className={styles.fileContainer}>
          {files.map((file, index) => (
            <FileCard
              key={index}
              id={file.id}
              name={file.name}
              size={file.size}
              fileType={file.fileType}
              uploadedAt={file.uploadedAt}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
