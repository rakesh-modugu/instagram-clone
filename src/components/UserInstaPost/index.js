import {useState} from 'react'
import {Link} from 'react-router-dom'
import {BsHeart, BsHeartFill} from 'react-icons/bs'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import Cookies from 'js-cookie'

import './index.css'

const UserInstaPost = ({userPost}) => {
  const [isLiked, setIsLiked] = useState(false)

  const toggleLike = async () => {
    const newLikeStatus = !isLiked
    setIsLiked(newLikeStatus)

    const {postId} = userPost
    const jwtToken = Cookies.get('jwt_token')

    const likedRequestBody = {
      like_status: newLikeStatus,
    }

    const likedPostUrl = `https://apis.ccbp.in/insta-share/posts/${postId}/like`

    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'POST',
      body: JSON.stringify(likedRequestBody),
    }

    try {
      const response = await fetch(likedPostUrl, options)
      const fetchedData = await response.json()
      console.log(fetchedData)
    } catch (error) {
      console.error('Error liking post:', error)
    }
  }

  const {
    profilePic,
    userName,
    userId,
    likesCount,
    comments,
    createdAt,
    postDetails,
  } = userPost

  return (
    <li className="user-post-list-item">
      <Link to={`/users/${userId}`} className="profile-link">
        <div className="profile-section">
          <div className="image-container">
            <img
              src={profilePic}
              alt="post author profile"
              className="profile-pic"
            />
          </div>
          <p className="profile-user-name">{userName}</p>
        </div>
      </Link>

      <img src={postDetails.image_url} alt="post" className="profile-post" />

      <div className="post-detail-and-stats-container">
        <div>
          {!isLiked ? (
            <button
              type="button"
              onClick={toggleLike}
              className="user-post-button"
            >
              <BsHeart size={20} color="#262626" />
            </button>
          ) : (
            <button
              type="button"
              onClick={toggleLike}
              className="user-post-button"
            >
              <BsHeartFill size={20} color="red" />
            </button>
          )}

          <button type="button" className="user-post-button">
            <FaRegComment size={20} color="#475569" />
          </button>
          <button type="button" className="user-post-button">
            <BiShareAlt size={20} color="#475569" />
          </button>
        </div>

        <p className="likes">{isLiked ? likesCount + 1 : likesCount} likes</p>
        <p className="caption">{postDetails.caption}</p>

        {comments.map(comment => (
          <p key={`${comment.user_id}-${comment.comment}`} className="comments">
            <span className="commented-user">{comment.user_name} </span>
            <span className="user-comment">{comment.comment}</span>
          </p>
        ))}

        <p className="created-date">{createdAt}</p>
      </div>
    </li>
  )
}

export default UserInstaPost
