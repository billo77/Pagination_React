import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios'
import Posts from './components/Posts';
import Pagination from './components/Pagination';
import Pagination2 from './components/example/Example';

const App = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(7)

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts')
      setPosts(res.data)
      setLoading(false)
    }

    fetchPosts();
  }, [])

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  console.log(posts);
  return (
    <div className="container">
      <h1 className="text-primary mb-1">My Blog</h1>
      <Posts posts={currentPosts} loading={loading} />
      <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} />

      <h2>2. Example</h2>
      <Pagination2 />
    </div>
  )
}

export default App
