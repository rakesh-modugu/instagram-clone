import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'

import LoaderSpinner from '../LoaderSpinner'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const settings = {
  dots: false,
  infinite: false,
  slidesToShow: 8,
  slidesToScroll: 1,
  responsive: [
    {breakpoint: 1300, settings: {slidesToShow: 8}},
    {breakpoint: 1200, settings: {slidesToShow: 7}},
    {breakpoint: 1100, settings: {slidesToShow: 6}},
    {breakpoint: 900, settings: {slidesToShow: 5}},
    {breakpoint: 768, settings: {slidesToShow: 4}},
    {breakpoint: 512, settings: {slidesToShow: 3}},
  ],
}

const UserStories = () => {
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [userStories, setUserStories] = useState([])

  const getUserStories = async () => {
    setApiStatus(apiStatusConstants.inProgress)
    const jwtToken = Cookies.get('jwt_token')

    const userStoriesApiUrl = 'https://apis.ccbp.in/insta-share/stories'
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }

    try {
      const response = await fetch(userStoriesApiUrl, options)

      if (response.ok) {
        const fetchedData = await response.json()
        const updatedData = fetchedData.users_stories.map(userStory => ({
          storyUrl: userStory.story_url,
          userId: userStory.user_id,
          userName: userStory.user_name,
        }))
        setUserStories(updatedData)
        setApiStatus(apiStatusConstants.success)
      } else if (response.status === 401) {
        setApiStatus(apiStatusConstants.failure)
      } else {
        setApiStatus(apiStatusConstants.failure)
      }
    } catch (error) {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    getUserStories()
  }, [])

  const renderLoadingView = () => (
    <div className="main-container">
      <LoaderSpinner />
    </div>
  )

  const renderSlider = () => (
    <div className="slick-container">
      <Slider {...settings}>
        {userStories.map(({userId, storyUrl, userName}) => (
          <div className="slick-item" key={userId}>
            <img className="logo-image" src={storyUrl} alt={userName} />
            <p className="user-story-name">{userName}</p>
          </div>
        ))}
      </Slider>
    </div>
  )

  const renderSuccessView = () => (
    <div className="main-container">{renderSlider()}</div>
  )

  const renderFailureView = () => (
    <div className="main-container">
      <h1>Failure View</h1>
      <button type="button" onClick={getUserStories}>
        Retry
      </button>
    </div>
  )

  const renderView = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderSuccessView()
      case apiStatusConstants.failure:
        return renderFailureView()
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      default:
        return null
    }
  }

  return renderView()
}

export default UserStories
