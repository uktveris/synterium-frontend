import styles from "./fileCard.module.css";
import { axiosPrivate } from "../api/axiosProvider";
import { useState } from "react";
import { formatFromBytes } from "../utils/fileSizeConverter";

interface FileMetadataProps {
  id: string;
  name: string;
  size: number;
  fileType: string;
  uploadedAt: Date;
}

function FileCard({ id, name, size, fileType, uploadedAt }: FileMetadataProps) {
  const [expanded, setExpanded] = useState(false);

  const date = new Date(uploadedAt);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const uploadDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;
  const fileSize = formatFromBytes(size);

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

  return (
    <div className={styles.mainContainer}>
      <h4>{name}</h4>
      <div className={styles.fileInfo}>
        <p>{fileType}</p>
        <p>{fileSize}</p>
        <p>{uploadDateTime}</p>
        <button className={styles.infoButton}>Info</button>
        <button
          className={styles.downloadButton}
          onClick={() => handleDownload(id, name)}
        >
          Download
        </button>
      </div>
    </div>
  );
}

export { FileCard };
