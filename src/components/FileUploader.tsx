import React, { useState } from "react";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import styles from "./fileUploader.module.css";
import { formatFromBytes } from "../utils/fileSizeConverter";

function FileUploader() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const axiosPrivate = useAxiosPrivate();
  const { authed } = useAuth();

  const addToFileArr = (newFiles: File[]) => {
    setUploadedFiles((files) => {
      const uniqueFiles = newFiles.filter((newFile) => {
        return !files.some((file) => {
          return file.name === newFile.name && file.size === newFile.size;
        });
      });
      return [...files, ...uniqueFiles];
    });
  };

  const removeFile = (name: string, size: number) => {
    setUploadedFiles((files) => {
      const filtered = files.filter((f) => {
        return f.name !== name && f.size !== size;
      });
      return filtered;
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handle file change");
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      addToFileArr(newFiles);
    }
  };

  const handleUpload = async () => {
    if (!uploadedFiles) {
      console.log("ERROR: fileUploader: no file selected..");
      return;
    }

    if (!authed) {
      console.log("ERROR: not authed..");
      return;
    }

    const formData = new FormData();
    uploadedFiles.forEach((f) => formData.append("files", f));
    try {
      const response = await axiosPrivate.post("/files/file-upload", formData, {
        headers: { "Content-type": "multipart/form-data" },
      });
      console.log("LOG: fileUploader: response received:");
      console.log(response.data);

      setUploadedFiles([]);
    } catch (err) {
      console.log("Error from fileuploader: " + (err as Error).message);
    }
  };

  const handleFileClick = () => {
    document.getElementById("fileInput")?.click();
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (event.dataTransfer.files) {
      if (event.dataTransfer.files) {
        const newFiles = Array.from(event.dataTransfer.files);
        addToFileArr(newFiles);
      }
    }
  };

  const fileContainerStylesObj = {
    transform: uploadedFiles.length === 0 ? "translateX(120%)" : "",
    transition: "transform 0.4s ease-in-out",
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.fileUploadContainer}>
        <input
          id="fileInput"
          type="file"
          multiple
          onChange={handleFileChange}
        />
        <div
          onClick={handleFileClick}
          onDragOver={handleDragOver}
          onDrop={handleFileDrop}
          className={styles.fileBox}
        >
          Choose or drag file(s)
        </div>
        <button onClick={handleUpload}>Upload</button>
      </div>
      <div className={styles.fileListContainer} style={fileContainerStylesObj}>
        <h4>Uploaded files</h4>
        <div className={styles.fileList}>
          {uploadedFiles.length > 0 &&
            uploadedFiles.map((f, key) => (
              <div key={key} className={styles.fileEntry}>
                <h5>{f.name}</h5>
                <p>{formatFromBytes(f.size)}</p>
                <button onClick={() => removeFile(f.name, f.size)}>
                  Remove
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export { FileUploader };
