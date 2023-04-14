import React, { useMemo, useState } from 'react';
import './styles/App.css';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import PostFilter from './components/PostFilter';
import MyModal from './UI/modal/MyModal';
import MyButton from './UI/button/MyButton';

function App() {
  const [posts,setPosts]=useState(
    [
      {id:1, title:'js', body:'js плох'},
      {id:2, title:'python', body:'еще хуже'},
      {id:3, title:'c++', body:'норм'}
    ]
  )

  const createPost = (newPost) =>{
    setPosts([...posts,newPost])
    setModal(false)
  }

  const removePost = (post) =>{
    setPosts(posts.filter(p => p.id != post.id))

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
    return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query.toLowerCase()))

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
        Создать запись
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost}/>
      </MyModal>
      <hr style={{margin: '15px 0'}}/>
      <PostFilter filter={filter} setFilter={setFilter}/>
      <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Список постов"/> 
    </div>
  );
}

export default App;
