import styles from "./fileCard.module.css";
import { axiosPrivate } from "../api/axiosProvider";
import { useState } from "react";

interface FileMetadataProps {
  id: string;
  name: string;
  size: number;
  fileType: string;
  uploadedAt: Date;
}

function FileCard({ id, name, size, fileType, uploadedAt }: FileMetadataProps) {
  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded(expanded ? false : true);
  };

  const fileSize =
    size < 1000
      ? size + " B"
      : size >= 1000 && size < 1000000
        ? size / 1000 + " KB"
        : size >= 1000000 && size < 1000000000
          ? size / 1000000 + " MB"
          : size / 1000000000 + " GB";

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
    // <div className={styles.mainContainer}>
    <div
      className={`${styles.mainContainer} ${expanded ? styles.expanded : ""}`}
    >
      <h4>{name}</h4>
      <div className={styles.fileInfo}>
        <p>{fileSize}</p>
        <button className={styles.infoButton} onClick={handleExpand}>
          Info
        </button>
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
