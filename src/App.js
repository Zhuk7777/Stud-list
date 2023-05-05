import React, { useEffect, useMemo, useState } from 'react';
import './styles/App.css';
import PostList from './components/PostList';
import PostFilter from './components/PostFilter';
import MyModal from './UI/modal/MyModal';
import MyButton from './UI/button/MyButton';
import PostForm from './components/PostForm';
import MyEditModal from './UI/modal/MyEditModal';
import Message from './components/message/Message';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { ref, set, get, remove } from "firebase/database";
import database from './firebase';


function App() {

  const [posts,setPosts]=useState([])

  const [studentInfo, setStudentInfo] = useState('')

  const getEditPost = (post) =>{
    setStudentInfo(post)
  }

  const addEditStudent = (editPost, prevId) =>{
    setPosts([...posts, editPost].filter(p => p.id !== prevId))
    setStudentInfo('')

    const dbRefSet = ref(database, 'posts/' + editPost.id);
    const dbRefRemove = ref(database, 'posts/' + prevId)
    set(dbRefSet, editPost);
    remove(dbRefRemove);
  }

  const removeStudent = (post) =>{
    setPosts(posts.filter(p => p.id !== post.id))

    const dbRef = ref(database, 'posts/' + post.id);
    remove(dbRef);

  }

  const addStudent = (newPost) =>{
    setPosts([...posts,newPost])

    const dbRef = ref(database, 'posts/' + newPost.id);
    set(dbRef, newPost);
    setModal(false)

    setAddStudentMessage(true)
    setTimeout(() => setAddStudentMessage(false), 4000);
  }

  const [filter, setFilter] = useState({faculty: '', group: '', query: ''})
  const [modal, setModal] = useState(false)

  const sortedPosts = useMemo(() => {
    let newPosts = [...posts]

    if(filter.faculty)
    {
      newPosts = newPosts.filter(p => p.faculty === filter.faculty)
    }

    if(filter.group)
    {
      newPosts = newPosts.filter(p => p.group === filter.group)
    }
    

    return newPosts

  }, [filter.faculty, filter.group, posts])

  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter(
      post => [post.surname, post.name, post.patronymic].join(' ').toLowerCase().includes(filter.query.toLowerCase())
      )

  }, [filter.query, sortedPosts])



  //хук useMemo c помощью callback производит вычисление, в нашем случае сортирует массив, запоминает резултат вычисления
  // и кеширует и на каждую перерисовку компонента она не пересчитывает заново(не сортирует заново)
  //она достает отсортированный массив их кеша, но каждый раз, когда какая-то из зависимостей меняется
  // в нашем случае [selectedSort, posts], то функция вновь пересчитывает и кеширует результат


  const [addStudentMessage, setAddStudentMessage] = useState(false)

  useEffect(() => {
    const dbRef = ref(database, 'posts');
      get(dbRef).then((data) => {
        if (data.exists()) {
          setPosts(Object.values(data.val()))
        } 
      }).catch((error) => {
      console.error(error);
      });

  },[])
  
  return (
    <div className="App">
      <MyButton style = {{marginTop: '30px'}} onClick = {() => setModal(true)}>
        Добавить студента   <FontAwesomeIcon icon={faUserPlus} />
      </MyButton>

      <Message visible={addStudentMessage}>Студент добавлен</Message>

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
