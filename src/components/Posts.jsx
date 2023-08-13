import { useState, useEffect } from "react";
import { getPosts } from "../API/apiCalls";
import Searchbar from "./Searchbar";
export default function Posts() {
  //user is not authenticated
  const [user, setUser] = useState(false);
  const [posts, setPosts] = useState([]);
  const [barStatus, setBarStatus] = useState(false);//create a state to see if searchbar is active

  useEffect(() => {
    async function fetchPosts() {
      try {
        setPosts(await getPosts());
        console.log("posts:",posts);
      } catch (error) {
        console.log("Error in retrieving posts", error);
      }
    }
    fetchPosts();
  }, [barStatus]);//add a dependency to check for empty input
  


  return (
    <>
      <div id="posts" className="container">
        <h2>All posts</h2>{//send props ---v
      } <Searchbar posts={posts} setPosts={setPosts} barStatus={barStatus} setBarStatus={setBarStatus}/>
        <button
          onClick={(e) => {
            e.preventDefault();
            setUser(!user);
          }}
        >
          User: {`${user}`}
        </button>

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
    </>
  );
}
