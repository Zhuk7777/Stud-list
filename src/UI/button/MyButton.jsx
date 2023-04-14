import React from "react";
import classes from './MyButton.module.css'
const MyButton =({children, ...props}) =>{//выцепляем пропс children, остальные пропсы оставляем как есть

    return(
        <button {...props} className={classes.myBtn}>
            {children}
        </button>//пропс children нужен для того, чтобы передавать, что написано внутри тега(изначально написал props.children)
    )
}

export default MyButton;