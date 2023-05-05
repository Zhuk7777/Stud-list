import React from "react";
import PostItem from "./PostItem";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const PostList =({posts, title, remove, edit}) => {

    if(!posts.length)
    {
        return (
        <h1 style={{textAlign: 'center'}}>Студентов нет</h1>
        )
    }

    return (
        <div>
            <h1 style={{textAlign: 'center'}}>{title}</h1>
            <TransitionGroup>
                {posts.map(post =>
                    <CSSTransition
                     key={post.id}
                     timeout={450}
                     classNames="post"
                   >
                        <PostItem remove={remove} edit={edit} post={post}/>
                    </CSSTransition>
      )}
            </TransitionGroup>
        </div>
    )

    //ключ нужен при работе со списками, не рекомендуется использовать index массива
          //ключи позволяют алгоритмам react наиболее эффективно делать рендеринг и перерисовывать не весь список, а только те элементы, в которых произошли изменения
          //раньше было так <PostItem remove={remove} number={index+1} post={post} key={post.id}/>
}

export default PostList;