import React from "react";
import cl from './MyModal.module.css';
import MyButton from "../button/MyButton";
import MyInput from "../input/MyInput";

const MyEditModal = ({create, studInfo, setVisible}) => {

    const rootClasses = [cl.myModal]
    if(studInfo !== '')
        rootClasses.push(cl.active)

    const addEditStudent =(event) => {
        event.preventDefault()

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

                <MyInput type='text' placeholder='Факультет'
                value={studInfo.faculty} onChange={e => setVisible({...studInfo, faculty: e.target.value})}></MyInput>


                <MyInput type='text' placeholder='Группа'
                value={studInfo.group} onChange={e => setVisible({...studInfo, group: e.target.value})}></MyInput>

                <MyButton onClick={addEditStudent}>Изменить</MyButton>
            </form>
        </div>
            </div>
        </div>
        //stopPropagation() предотвращает всплытие события(e -событие)
    )

}

export default MyEditModal;