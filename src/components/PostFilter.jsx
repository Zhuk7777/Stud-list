import React from "react";
import MyInput from "../UI/input/MyInput";
import MySelect from "../UI/select/MySelect";

const PostFilter = ({filter, setFilter}) =>{

    return (
        <div>
            <MyInput
                value={filter.query}
                onChange={e => setFilter({...filter, query: e.target.value})}
                placeholder='поиск'
            />

            <MySelect 
            value={filter.faculty}
            onChange={f => setFilter({...filter, faculty: f})}
            defaultValue={'Факультет'} 
            options={
                [
                    {value: '', name: 'Все'},
                    {value: 'ПММ', name: 'ПММ'},
                    {value: 'ФКН', name: 'ФКН'},
                    {value: 'РГФ', name: 'РГФ'},

                ]}/>

            <MySelect 
                value={filter.group}
                onChange={g => setFilter({...filter, group: g})}
                defaultValue={'Группа'} 
                options={
                    [
                        {value: '', name: 'Все'},
                        {value: '1', name: '1'},
                        {value: '2', name: '2'},
                        {value: '3', name: '3'},
                        {value: '4', name: '4'},
                        {value: '5', name: '5'},
                        {value: '6', name: '6'},
                        {value: '7', name: '7'},
                        {value: '8', name: '8'},

                    ]}/>
      </div>
    )

}

export default PostFilter;