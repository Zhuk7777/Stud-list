import React, { useMemo, useState } from 'react';
import './styles/App.css';
import PostList from './components/PostList';
import PostFilter from './components/PostFilter';
import MyModal from './UI/modal/MyModal';
import MyButton from './UI/button/MyButton';
import PostForm from './components/PostForm';
import MyEditModal from './UI/modal/MyEditModal';

function App() {
  const [posts,setPosts]=useState(
    [
      {id: 1, name: 'Иван', surname: 'Иванов', patronymic: 'Иванович', group: '3', faculty: 'ПММ'},
      {id: 2, name: 'Петр', surname: 'Петров', patronymic: 'Петрович', group: '5', faculty: 'ФКН'},
      {id: 3, name: 'Антон', surname: 'Антонов', patronymic: 'Антонович', group: '1', faculty: 'РГФ'}
    ]
  )

  const [studentInfo, setStudentInfo] = useState('')

  const getEditPost = (post) =>{
    setStudentInfo(post)
  }

  const addEditStudent = (editPost, prevId) =>{
    setPosts([...posts, editPost].filter(p => p.id !== prevId))
    setStudentInfo('')
  }

  const removeStudent = (post) =>{
    setPosts(posts.filter(p => p.id !== post.id))

  }

  const addStudent = (newPost) =>{
    setPosts([...posts,newPost])
    setModal(false)
  }

  const [filter, setFilter] = useState({sort: '', query: ''})
  const [modal, setModal] = useState(false)

  const sortedPosts = useMemo(() => {
    if(filter.sort)
    {
      return [...posts].sort((a,b) => a[filter.sort].localeCompare(b[filter.sort]))
    }

    return posts

  }, [filter.sort,posts])

  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter(
      post => [post.surname, post.name, post.patronymic].join(' ').toLowerCase().includes(filter.query.toLowerCase())
      )

  }, [filter.query,sortedPosts])



  //хук useMemo c помощью callback производит вычисление, в нашем случае сортирует массив, запоминает резултат вычисления
  // и кеширует и на каждую перерисовку компонента она не пересчитывает заново(не сортирует заново)
  //она достает отсортированный массив их кеша, но каждый раз, когда какая-то из зависимостей меняется
  // в нашем случае [selectedSort, posts], то функция вновь пересчитывает и кеширует результат

  //const sortPosts = (sort) =>{
    //setSelectedSort(sort)
    //setPosts([...posts].sort((a,b) => a[sort].localeCompare(b[sort])))
    //функция сорт не возрващает отсортированный массив, а мутирует тот, к которому он был применен, а состояния напрямую изменять нельзя
    //поэтому мы разворачиваем посты в новый массив и сортируем его, и этот отсортированный массив передаем в setPosts
    // sort принимает callback, аргументами которого явл два элемента массива
  //}
  
  return (
    <div className="App">
      <MyButton style = {{marginTop: '30px'}} onClick = {() => setModal(true)}>
        Добавить студента
      </MyButton>

      <MyModal visible={modal} setVisible={setModal}>
          <PostForm create={addStudent}/>
      </MyModal>

      <MyEditModal create={addEditStudent} studInfo={studentInfo} setVisible={setStudentInfo}/>

      <PostFilter filter={filter} setFilter={setFilter}/>
      <PostList remove={removeStudent} edit={getEditPost} posts={sortedAndSearchedPosts} title="Список студентов"/> 
    </div>
  );
}

export default App;
