import { useEffect, useState } from "react";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import styles from "./fileUploader.module.css";

function FileUploader() {
  const [files, setFiles] = useState<FileList | null>(null);
  const axiosPrivate = useAxiosPrivate();
  const { authed } = useAuth();

  const handleFileChange = (event) => {
    setFiles(event.target.files);
  };

  const handleUpload = () => {
    if (!files) {
      console.log("ERROR: fileUploader: no file selected..");
      return;
    }

    if (!authed) {
      console.log("ERROR: not authed..");
      return;
    }

    const formData = new FormData();
    Array.from(files).forEach((f) => formData.append("files", f));
    axiosPrivate
      .post("/files/file-upload", formData, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then((response) => {
        console.log("LOG: fileUploader: response received:");
        console.log(response.data);
      })
      .catch((err) =>
        console.log("ERROR: fileUploader: error - " + (err as Error).message),
      );
  };

  return (
    <div className={styles.mainContainer}>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload}>upload</button>
    </div>
  );
}

export { FileUploader };
