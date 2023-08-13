//this bar helps search for post or add a new one
import {Link} from 'react-router-dom'
//add state
import { useState, useEffect } from 'react';
//import function
import { getPosts } from "../API/apiCalls";

//function tu create a new list based on input
export const filterList = (query, list)=>{
    console.log("wer in function")
    //set input tu lowercase
    const filterList = [];
    // const newList = list.map(e=>e.title);
    // console.log("new list:", newList);
    // console.log("query:",query)
    list.forEach((e)=>{
        //console.log("element:",e);
        if(e.title.includes(query)){
            console.log(`${e} includes ${query}`)
            filterList.push(e);
        }
    })
    console.log("New List :", filterList)
    return filterList;

}



export default function Searchbar({posts, setPosts, barStatus, setBarStatus}){

    const [query, setQuery] = useState("");
    
    useEffect(()=>{
        async function fetchPosts() {
            try {
                setPosts(await getPosts());
                console.log("posts:",posts);
            } catch (error) {
              console.log("Error in retrieving posts", error);
            }
        }
        if(query){
            const postToRender = filterList(query, posts);
            setPosts(postToRender);    
        }else{
            fetchPosts();
        }
    },[query])


    return(
        <div id="search-bar" className="container">
            <h3>Posts</h3>
            <label id="search">Search:
                <input type="text"
                onChange={e => setQuery(e.target.value)} />
            </label>
            <button><Link to={'new-post'}>Add</Link></button>
        </div>
    )
}