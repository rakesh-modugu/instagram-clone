import UserPosts from '../UserPosts'
import UserStories from '../UserStories'
import Header from '../Header'

import './index.css'

const Home = () => (
  <>
    <Header />
    <main className="home-container">
      <UserStories />
      <UserPosts />
    </main>
  </>
)

export default Home
