import { useState, useEffect } from "react";
import { getPosts } from "../API/apiCalls";
import Searchbar from "./Searchbar";

export default function Posts({token, username, loggedIn, setLoggedIn, loggedOut, setLoggedOut}) {
  //user is not authenticated
  const [user, setUser] = useState(false);
  const [posts, setPosts] = useState([]);

  
  useEffect(() => {
    async function fetchPosts() {
      try {
        // console.log(token)
        setPosts(await getPosts());
        console.log("Token:", token)
        if(token){setLoggedIn(true);} //set user true to show the send messege button
        // console.log(loggedIn);
      } catch (error) {
        console.log("Error in retrieving posts", error);
      }
    }
    fetchPosts();
  }, [token]);//add a dependency
  // console.log("Posts token: ", sessionStorage.getItem("token"));
  return (
    <>
      <div id="posts" className="container">
        <h2>All posts</h2>
        <Searchbar/>
        <button
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          User: {`${username}`}
        </button>

        {posts.map((post) => {
          return (
            <>
              <div key={post._id}>
                <h3>Title: {post.title}</h3>
                <p>Desc.: {post.description}</p>
                <p>Price: {post.price}</p>
                <p>Location: {post.location}</p>
                {loggedIn && <button>Send Message</button>}
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
