//this bar helps search for post or add a new one
import {Link} from 'react-router-dom'
//add state
import { useState, useEffect } from 'react';
//import function
import { getPosts } from "../API/apiCalls";

//function tu create a new list based on input
export const filterList = (query, list)=>{
    console.log("wer in function")
    //create new array to store filter items
    const filterList = [];
    // loop tru each element and add it to the list console.log("query:",query)
    list.forEach((e)=>{
        //console.log("element:",e);
        if(e.title.includes(query)){//check if the search input matches any title
            console.log(`${e} includes ${query}`)
            filterList.push(e);//add to list
        }
    })
    console.log("New List :", filterList)
    return filterList;//return the new list
}

export default function Searchbar({posts, setPosts, barStatus, setBarStatus}){
    const [query, setQuery] = useState("");//set state from input each time it changes
    
    useEffect(()=>{//bug found when a letter is deleted and another one is added it wont show post
        async function fetchPosts() { //async function from posts 
            try {
                setPosts(await getPosts());
                console.log("posts:",posts);
            } catch (error) {
              console.log("Error in retrieving posts", error);
            }
        }
        if(query){//if the input is not empty 
            const postToRender = filterList(query, posts);//query for lists
            setPosts(postToRender);    //change state of posts
        }else{
            fetchPosts();//fetch old posts
        }
    },[query])//dependency changes every type

    return(
        <div id="search-bar" className="container">
            <h3>Posts</h3>
            <label id="search">Search:
                <input 
                type="text"
                onChange={e=>setQuery(e.target.value)} />
            </label>
            <button><Link to={'new-post'}>Add</Link></button>
        </div>
    )
}