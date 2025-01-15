import { useEffect, useState } from "react";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import styles from "./dashboard.module.css";
import Header from "../components/Header";
import { FileCard } from "../components/FileCard";

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
        <h1>Your files</h1>
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
        {/* {files.map((file, index) => (
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
        ))} */}
      </div>
    </div>
  );
}

export default Dashboard;
