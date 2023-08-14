
import {useParams} from 'react-router-dom'

export default function Post({posts}){
    const filter = [];//array with the post we are looking for
    let userId = useParams();//look for the dynamic segment
    console.log("userid from url:",userId.id);
    //console.log("posts", posts);
    posts.map((e)=>{ 
        if(e._id == userId.id){
            filter.push(e);//add the element that fits the condition
        }
    });
    const post = filter[0]; //get the object
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