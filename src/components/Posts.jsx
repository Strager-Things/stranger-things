import { useState, useEffect } from "react";
import { getPosts } from "../API/apiCalls";
export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        setPosts(await getPosts());
      } catch (error) {
        console.log("Error in retrieving posts", error);
      }
    }
    fetchPosts();
  }, []);

  return (
    <>
      <div>
        <h2>All posts</h2>
        {posts.map((post) => {
          return (
            <>
              <div key={post._id}>
                <h3>{post.title}</h3>
                <p>{post.description}</p>
                <p>{post.price}</p>
                <p>{post.location}</p>
                <button>Send Message</button>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
