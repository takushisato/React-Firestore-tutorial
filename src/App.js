import { useEffect, useState } from "react";
import "./App.css";
import db from "./firebase";
import { collection, getDocs, onSnapshot } from "firebase/firestore";

function App() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    // データベースから取得する
    const postData = collection(db, "posts");
    getDocs(postData).then((snapshot) => {
      // console.log(snapshot.docs.map((doc) => doc.data()));
      // console.log(snapshot.docs.map((doc) => ({ ...doc.data() })));
      setPosts(snapshot.docs.map((doc) => ({ ...doc.data() })));
    });

    // リアルタイムで取得する
    onSnapshot(postData, (post) => {
      setPosts(post.docs.map((doc) => ({ ...doc.data() })));
    });
  }, []);

  return (
    <div className="App">
      <div>
        {posts.map((post) => (
          <div key={post.timestamp}>
            <h1>{post.title}</h1>
            <p>{post.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
