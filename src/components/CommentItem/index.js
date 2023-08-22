// Write your code here
import './index.css'

const CommentItem = props => {
  const {eachComment, onDelete, likeToggle} = props
  const {id, name, comment, postedTime, isLiked, color} = eachComment
  const likeIcon = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const onDeleteIcon = () => {
    onDelete(id)
  }

  const onLikeToggle = () => {
    likeToggle(id)
  }

  return (
    <li className="commentMainContainer">
      <div className="commentName">
        <p id="letter" className={color}>
          {name[0]}
        </p>

        <div>
          <div className="nameContainer">
            <p className="personName">{name}</p>
            <p className="time">{postedTime}</p>
          </div>
          <p className="commentStyle">{comment}</p>
        </div>
      </div>

      <div className="lastContainer">
        <div className="likeContainer">
          <img src={likeIcon} alt="like" />
          <button
            className={isLiked ? 'liked' : 'unLiked'}
            onClick={onLikeToggle}
            type="button"
          >
            Like
          </button>
        </div>
        <button
          data-testid="delete"
          className="buttonStyle"
          type="button"
          onClick={onDeleteIcon}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
          />
        </button>
      </div>
    </li>
  )
}

export default CommentItem
