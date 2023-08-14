import Posts from "./Posts"
import {useParams} from 'react-router-dom'




export default function Post({posts}){
    const filter = [];
    let userId = useParams();
    console.log("userid from url:",userId.id);
    console.log("posts", posts);
    posts.map((e)=>{ 
        if(e._id == userId.id){
            filter.push(e);
        }

    });
    const post = filter[0];
    console.log("post:",post);
    
    return(
        <div key={post._id}>
            <h3>Title: {post.title}</h3>
            <p>Desc.: {post.description}</p>
            <p>Price: {post.price}</p>
            <p>Location: {post.location}</p>
        </div>
    )
}