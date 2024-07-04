import styles from '../styles/Home.module.css';
import UploadForm from '.uploadImage.tsx'

export default function Home() {
  return (
    <div className={styles.container}>
      <div>
        <h1>Upload a Picture! We will tell you what Pokemon it looks like!</h1>
        <UploadForm />
      </div>
    </div>
  );
}

