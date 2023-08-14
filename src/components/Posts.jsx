/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { getPosts } from "../API/apiCalls";
import Searchbar from "./Searchbar";

export default function Posts({ token }) {
  //user is not authenticated
  const [user, setUser] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        setPosts(await getPosts());
        if (token) {
          setUser(true);
        } //set user true to show the send messege button
      } catch (error) {
        console.log("Error in retrieving posts", error);
      }
    }
    fetchPosts();
  }, [token]); //add a dependency
  console.log(sessionStorage.getItem("token"));
  return (
    <>
      <div id="posts" className="container">
        <h2>All posts</h2>
        <Searchbar />

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
