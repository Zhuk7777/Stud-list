import React, { useState } from "react";
import MyButton from "../UI/button/MyButton";
import MyInput from "../UI/input/MyInput";
import MySelect from "../UI/select/MySelect";

const PostForm = ({create}) => {

    const [post ,setPost] = useState({name: '', surname: '', patronymic: '', group: '', faculty: ''})
    const [error ,setError] = useState('')

    const checkingCorrectness = (event) => {
        event.preventDefault()

        if(post.name === '' || post.surname === '' || post.patronymic === '' || post.group === '' || post.faculty === '')
            setError('Заполните поля')

        else if (!/^[а-яА-Я ]+$/.test(post.name))
            setError('Недопустимые символы в имени')

        else if (!/^[а-яА-Я ]+$/.test(post.surname))
            setError('Недопустимые символы в фамилии')

        else if (!/^[а-яА-Я ]+$/.test(post.patronymic))
            setError('Недопустимые символы в отчестве')
        
        else
        {
            setError('')
            addStudent()
        }
    }


    const addStudent =() => {

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

                <MySelect 
                value={post.faculty}
                onChange={e => setPost({...post, faculty: e})}
                defaultValue={'Факультет'} 
                options={
                    [
                        {value: 'ПММ', name: 'ПММ'},
                        {value: 'ФКН', name: 'ФКН'},
                        {value: 'РГФ', name: 'РГФ'},

                    ]}/>


                <MySelect 
                value={post.group}
                onChange={e => setPost({...post, group: e})}
                defaultValue={'Группа'} 
                options={
                    [
                        {value: '1', name: '1'},
                        {value: '2', name: '2'},
                        {value: '3', name: '3'},
                        {value: '4', name: '4'},
                        {value: '5', name: '5'},
                        {value: '6', name: '6'},
                        {value: '7', name: '7'},
                        {value: '8', name: '8'},

                    ]}/>
                
                <div style={{background: 'rgb(201, 72, 72)', color: 'black'}}>{error}</div>

                <MyButton onClick={checkingCorrectness}>Добавить</MyButton>

            </form>
        </div>
    )
}

export default PostForm;