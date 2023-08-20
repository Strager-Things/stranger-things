import { useState, useEffect } from "react";
import { createPost } from "../API/apiCalls";
import { useNavigate } from "react-router-dom";

export default function PostForm({ token }){
    const apiUrl = `https://strangers-things.herokuapp.com/api/2209-acc-pt-web-pt-d`;

    const [create, setCreate] = useState([]);
    const [title, setTitle] = useState(" ");
    const [description, setDescription] = useState(" ");
    const [price, setPrice] = useState(" ");
    const [willDeliver, setWillDeliver] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    async function createTheePost(e){
        e.preventDefault(); 
        console.log(title);
        try{
            const response = await fetch(`${apiUrl}/posts`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                  post: {
                    title: `${title}`,
                    description: `${description}`,
                    price: `${price}`,
                    willDeliver: `${willDeliver}`
                  }
                })
              });
              const result = await response.json();
              console.log(result);
              if(!result.success){
                setError(result.error.message);
              }else{
                  navigate('/posts');
              }
            //   return result;
        } catch (error) {
            setError(error)
            console.error("Error with creating post", error);
        }
            // setCreate(await createPost(token, title, description, price, willDeliver));
            //not sure what I'm doing wrong here, everytime the createPost is called, token gets reset to null
            //also need to create delete so we can remove all of those posts I accidentally added
            // console.log(create);
            // navigate("/posts");

    }
    
    // createTheePost();
    // console.log(create);
    return(
        <>
            <div>post form</div>
            <form onSubmit={createTheePost}> 
                <label>
                    Title: <input required name="title" value={title} onChange={e =>{
                        setTitle(e.target.value);
                    }}/>
                </label>
                <label>
                    Description: <textarea required name="description" value={description} onChange={e =>{
                        setDescription(e.target.value);
                    }}/>
                </label>
                <label>
                    Price: <input required name="price" value={price} onChange={e =>{
                        setPrice(e.target.value);
                    }}/>
                </label>
                <select name="willDeliver" value={willDeliver} onChange={e =>{
                    setWillDeliver(e.target.value);
                }}>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                </select>
                <input type="submit" value="Submit"/>
            </form>
            {error && <p>{error}</p>}
        </>
    )
}