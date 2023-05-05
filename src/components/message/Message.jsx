import React from "react";
import cl from './Message.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const Message = ({children,visible}) => {

    const rootClasses = [cl.message]
    if(visible)
        rootClasses.push(cl.active)
    return (
        <div className={rootClasses.join(' ')}>
            <span>{children} <FontAwesomeIcon icon={faCheck} flip /></span>
        </div>

    )
}

export default Message;