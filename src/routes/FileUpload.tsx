import Header from "../components/Header";
import { FileUploader } from "../components/FileUploader";
import styles from "./fileUpload.module.css";

function FileUpload() {
  return (
    <div>
      <Header />
      <div className={styles.mainContainer}>
        <h1>The file uploader</h1>
        <FileUploader />
      </div>
    </div>
  );
}

export default FileUpload;
