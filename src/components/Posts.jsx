import { useState, useEffect} from "react";
import { getPosts } from "../API/apiCalls";
import Searchbar from "./Searchbar";

import {Link} from 'react-router-dom';

//Single post render
export function Post({post, user}){

  return(
    <div key={post._id}>
      <h3>Title: {post.title}</h3>
      <p>Desc.: {post.description}</p>
      <p>Price: {post.price}</p>
      <p>Location: {post.location}</p>
      {user && <Link to={`${post._id}/message`}><button>Send Message</button></Link>}
    </div>
  )
}
//Page component





export default function Posts({token,posts, setPosts, username, loggedIn, setLoggedIn, loggedOut, setLoggedOut}) {

  //user is not authenticated
  const [user, setUser] = useState(false);

  useEffect(() => {
    async function fetchPosts() {
      try {
        // console.log(token)
        setPosts(await getPosts());


        if(token){setUser(true);} //set user true to show the send messege button

        console.log("Token:", sessionStorage.getItem("token"))
        if(token){setLoggedIn(true);} //set user true to show the send messege button
        // console.log(loggedIn);
      } catch (error) {
        console.log("Error in retrieving posts", error);
      }
    }
    fetchPosts();
  }, [token]);//add a dependency
  return (
    <>
      <div id="posts" className="container">
        <h2>All posts</h2>
        <Searchbar posts={posts} setPosts={setPosts} />
        <button
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          User: {`${username}`}
        </button>

        {posts.map((post)=>{
          return(
            <Post key={post._id} post={post} user={user}/>
          )

        })}

      </div>
    </>
  );
}
