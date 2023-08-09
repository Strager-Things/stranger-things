import { useState, useEffect } from "react";
import { getPosts } from "../API/apiCalls";
export default function Posts() {
  //user is not authenticated
  const [user, setUser] = useState(false);
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
      <div className="postContainer">
        <div className="titleContainer">
          <h2>All posts</h2>
          <button
            onClick={(e) => {
              e.preventDefault();
              setUser(!user);
            }}
          >
            User: {`${user}`}
          </button>
        </div>
        <div className="postMenu">
          <div className="searchBarContainer">
            <label>
              Search Bar: <input type="text" placeholder="Search..." />
            </label>
          </div>
          <div className="addBtnContainer">
            {user && <button>Add Post</button>}
          </div>
        </div>
        <div className="listings">
          {posts.map((post) => {
            return (
              <>
                <div key={post._id}>
                  <h3>Title: {post.title}</h3>
                  <p>Desc.: {post.description}</p>
                  <p>Price: {post.price}</p>
                  <p>Location: {post.location}</p>
                  {user && <button>Send Message</button>}
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
