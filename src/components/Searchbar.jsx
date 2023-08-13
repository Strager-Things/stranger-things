//this bar helps search for post or add a new one
import {Link} from 'react-router-dom'

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

export default function Searchbar(){

    return(
        <div id="search-bar" className="container">
            <h3>Posts</h3>
            <label id="search">Search:
                <input type="text" />
            </label>
            <button><Link to={'new-post'}>Add</Link></button>
        </div>
    )
}