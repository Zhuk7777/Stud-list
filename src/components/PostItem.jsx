import React from "react";
import MyButton from "../UI/button/MyButton";

const PostItem = (props) => {
    
    return (
        <div className='post'>
        <div className='post-content'>
          <strong>{props.number}. {props.post.title}</strong>
          <div>
            {props.post.body}
          </div>
        </div>
        <div className='post-delete'>
          <MyButton onClick={() => props.remove(props.post)}>Удалить</MyButton>
        </div>
      </div>
    )

}

export default PostItem;