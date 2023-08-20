import { useState, useEffect } from "react";
import { createPost } from "../API/apiCalls";
import { useNavigate } from "react-router-dom";

export default function PostForm({ token }){
    const [create, setCreate] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [willDeliver, setWillDeliver] = useState(false);

    const navigate = useNavigate();

    async function createTheePost(){
        // console.log(title);
       await createPost(token, title, description, price, willDeliver);
       //not sure what I'm doing wrong here, everytime the createPost is called, token gets reset to null
       //also need to create delete so we can remove all of those posts I accidentally added
       navigate("/posts");
    }
    // createTheePost();
    // console.log(create);
    return(
        <>
            <div>post form</div>
            <form onSubmit={createTheePost}> 
                <label>
                    Title: <input required value={title} onChange={e =>{
                        setTitle(e.target.value);
                    }}/>
                </label>
                <label>
                    Description: <input required value={description} onChange={e =>{
                        setDescription(e.target.value);
                    }}/>
                </label>
                <label>
                    Price: <input required value={price} onChange={e =>{
                        setPrice(e.target.value);
                    }}/>
                </label>
                <label>
                    <select value={willDeliver} defaultValue={false} onChange={e =>{
                        setWillDeliver(e.target.value);
                    }}>
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </select>
                </label>
                <input type="submit" value="Submit"/>
            </form>
        </>
    )
}