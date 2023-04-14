import React, { useState } from "react";
import MyButton from "../UI/button/MyButton";
import MyInput from "../UI/input/MyInput";

const PostForm = ({create}) => {

    const [post ,setPost] = useState({title: '', body: ''})

    const addNewPost =(event) => {
        event.preventDefault()

        const newPost =
        {
            ...post,
            id: Date.now()
        }
        create(newPost)
        setPost({title: '', body: ''})
    
      }

    return(
        <div>
             <form>
                <MyInput type='text' placeholder='Название поста' 
                value={post.title} onChange={e => setPost({...post, title: e.target.value})}></MyInput>

                <MyInput type='text' placeholder='Описание поста'
                value={post.body} onChange={e => setPost({...post, body: e.target.value})}></MyInput>

                <MyButton onClick={addNewPost}>Создать пост</MyButton>
            </form>
        </div>
    )
}

export default PostForm;