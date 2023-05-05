import React from "react";
import MyButton from "../UI/button/MyButton";

const PostItem = (props) => {

    return (
        <div className='post'>
        <div className='post-content'>
          <strong>{props.post.surname} {props.post.name} {props.post.patronymic}</strong>
          <div>
            {props.post.group} группа,  факультет {props.post.faculty}
          </div>
        </div>
        <div className='post-button'>
          <MyButton onClick={() => props.remove(props.post)}>Удалить</MyButton>
          <MyButton onClick={() => props.edit(props.post)} style = {{marginTop: '5px'}}>Редактировать</MyButton>
        </div>
      </div>
    )

}

export default PostItem;