import React, { useState } from "react";
import cl from './MyModal.module.css';
import MyButton from "../button/MyButton";
import MyInput from "../input/MyInput";
import MySelect from "../select/MySelect";

const MyEditModal = ({create, studInfo, setVisible}) => {

    const rootClasses = [cl.myModal]
    if(studInfo !== '')
        rootClasses.push(cl.active)

    const [error ,setError] = useState('')

    const checkingCorrectness = (event) => {
        event.preventDefault()
    
        if(studInfo.name === '' || studInfo.surname === '' || studInfo.patronymic === '' || studInfo.group === '' || studInfo.faculty === '')
            setError('Заполните поля')

        else if (!/^[а-яА-Я ]+$/.test(studInfo.name))
            setError('Недопустимые символы в имени')

        else if (!/^[а-яА-Я ]+$/.test(studInfo.surname))
            setError('Недопустимые символы в фамилии')

        else if (!/^[а-яА-Я ]+$/.test(studInfo.patronymic))
            setError('Недопустимые символы в отчестве')

        else
        {
            setError('')
            addEditStudent()
        }

        }

    const addEditStudent =() => {

        const prevId=studInfo.id
        const newPost =
        {
            ...studInfo,
            id: Date.now()
        }
        create(newPost, prevId)
        }

    return(
        <div className={rootClasses.join(' ')} onClick={() => setVisible('')}>
            <div className={cl.myModalContent} onClick={(e) => e.stopPropagation()}>
            <div>
             <form>
                <MyInput type='text' placeholder='Имя' 
                value={studInfo.name} onChange={e => setVisible({...studInfo, name: e.target.value})}></MyInput>

                <MyInput type='text' placeholder='Фамилия'
                value={studInfo.surname} onChange={e => setVisible({...studInfo, surname: e.target.value})}></MyInput>

                <MyInput type='text' placeholder='Отчество'
                value={studInfo.patronymic} onChange={e => setVisible({...studInfo, patronymic: e.target.value})}></MyInput>

                <MySelect 
                value={studInfo.faculty}
                onChange={e => setVisible({...studInfo, faculty: e})}
                defaultValue={'Факультет'} 
                options={
                    [
                        {value: 'ПММ', name: 'ПММ'},
                        {value: 'ФКН', name: 'ФКН'},
                        {value: 'РГФ', name: 'РГФ'},

                    ]}/>


                <MySelect 
                value={studInfo.group}
                onChange={e => setVisible({...studInfo, group: e})}
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
                <MyButton onClick={checkingCorrectness}>Изменить</MyButton>
            </form>
        </div>
            </div>
        </div>
        //stopPropagation() предотвращает всплытие события(e -событие)
    )

}

export default MyEditModal;