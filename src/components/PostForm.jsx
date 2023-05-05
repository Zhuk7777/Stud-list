import React, { useState } from "react";
import MyButton from "../UI/button/MyButton";
import MyInput from "../UI/input/MyInput";

const PostForm = ({create}) => {

    const [post ,setPost] = useState({name: '', surname: '', patronymic: '', group: '', faculty: ''})

    const addStudent =(event) => {
        event.preventDefault()

        const newPost =
        {
            ...post,
            id: Date.now()
        }
        create(newPost)
        setPost({name: '', surname: '', patronymic: '', group: '', faculty: ''})
    
      }

    return(
        <div>
             <form>
                <MyInput type='text' placeholder='Имя' 
                value={post.name} onChange={e => setPost({...post, name: e.target.value})}></MyInput>

                <MyInput type='text' placeholder='Фамилия'
                value={post.surname} onChange={e => setPost({...post, surname: e.target.value})}></MyInput>

                <MyInput type='text' placeholder='Отчество'
                value={post.patronymic} onChange={e => setPost({...post, patronymic: e.target.value})}></MyInput>

                <MyInput type='text' placeholder='Факультет'
                value={post.faculty} onChange={e => setPost({...post, faculty: e.target.value})}></MyInput>


                <MyInput type='text' placeholder='Группа'
                value={post.group} onChange={e => setPost({...post, group: e.target.value})}></MyInput>

                <MyButton onClick={addStudent}>Добавить</MyButton>
            </form>
        </div>
    )
}

export default PostForm;