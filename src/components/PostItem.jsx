import React from "react";
import MyButton from "../UI/button/MyButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark , faPen} from "@fortawesome/free-solid-svg-icons";

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
          <MyButton onClick={() => props.remove(props.post)}><FontAwesomeIcon icon={faCircleXmark}/></MyButton>
          <MyButton onClick={() => props.edit(props.post)} style = {{marginTop: '5px'}}> <FontAwesomeIcon icon={faPen} /></MyButton>
        </div>
      </div>
    )

}

export default PostItem;