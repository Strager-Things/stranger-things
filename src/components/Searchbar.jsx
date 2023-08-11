//this bar helps search for post or add a new one
import {Link} from 'react-router-dom'

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