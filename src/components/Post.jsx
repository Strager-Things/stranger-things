import { createMessage } from '../API/apiCalls';
import {useParams, useNavigate} from 'react-router-dom'


export default function Post({posts, token}){
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
    
    const navigate = useNavigate();
    //event handler function-------------------
    const handleSubmit = (e)=>{
        //handler when message is subit
        console.log("were in!:",e);
        e.preventDefault();

        //read form data
        const form = e.target;
        console.log("form:",form);
        const formData = new FormData(form);
        console.log("form data:",formData);
        //get entries
        const formJson = Object.fromEntries(formData.entries());
        console.log("message:",typeof(formJson.message));

        //send message 
        console.log("token:",post._id)
        createMessage(post._id, token, formJson.message);
        navigate('/posts');
    }


    return(
        <div key={post._id}>
            <h3>Title: {post.title}</h3>
            <p>Desc.: {post.description}</p>
            <p>Price: {post.price}</p>
            <p>Location: {post.location}</p>

            <form method='post' onSubmit={handleSubmit}>
                <label>Message:
                    <textarea 
                        name="message" 
                        id="message" 
                        cols="30" 
                        rows="10"
                        defaultValue="Message Here.....">                
                    </textarea>
                </label>
                <button
                    type='submit'
                    >{      //when click send form                  
            }       send       
                </button>
            </form>
        </div>
    )
}