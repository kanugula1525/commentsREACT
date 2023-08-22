import {Component} from 'react'

import './index.css'
import {v4 as uuidv4} from 'uuid'
import {formatDistanceToNow} from 'date-fns'
import CommentItem from '../CommentItem/index'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here

class Comments extends Component {
  state = {
    commentsList: [],
    noOfComments: 0,
    name: '',
    comment: '',
  }

  onSubmittingComment = event => {
    event.preventDefault()
    const {name, comment} = this.state

    const newComment = {
      id: uuidv4(),
      name,
      comment,
      postedTime: formatDistanceToNow(new Date()),
      isLiked: false,
      color:
        initialContainerBackgroundClassNames[
          Math.floor(
            Math.random(initialContainerBackgroundClassNames.length) *
              initialContainerBackgroundClassNames.length,
          )
        ],
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      name: '',
      comment: '',
      noOfComments: prevState.noOfComments + 1,
    }))
  }

  onDelete = ID => {
    const {commentsList} = this.state
    const revisedList = commentsList.filter(
      eachComment => eachComment.id !== ID,
    )
    this.setState({commentsList: revisedList})
    this.setState(prevState => ({noOfComments: prevState.noOfComments - 1}))
  }

  likeToggle = ID => {
    const {commentsList} = this.state
    const revisedList = commentsList.map(eachComment => {
      if (ID === eachComment.id) {
        return {...eachComment, isLiked: !eachComment.isLiked}
      }
      return eachComment
    })
    this.setState({commentsList: revisedList})
  }

  name = event => {
    this.setState({name: event.target.value})
  }

  comment = event => {
    this.setState({comment: event.target.value})
  }

  render() {
    const {commentsList, noOfComments, name, comment} = this.state

    return (
      <div className="mainContainer">
        <h1 className="title">Comments</h1>

        <div className="commentInputContainer">
          <form onSubmit={this.onSubmittingComment}>
            <p className="caption">Say something about 4.0 technologies</p>
            <div className="nameInputContainer">
              <input
                value={name}
                className="nameInput"
                placeholder="Your Name"
                onChange={this.name}
              />
            </div>
            <div>
              <textarea
                value={comment}
                onChange={this.comment}
                className="commentInput"
                rows="6"
                placeholder="Your Comment"
              />
            </div>
            <button className="button" type="submit">
              Add Comment
            </button>
          </form>
          <img
            className="commentsImage"
            src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            alt="comments"
          />
        </div>
        <hr />
        <div className="commentsCountContainer">
          <p className="commentsCounter">{noOfComments}</p>
          <p className="commentsTitle">Comments</p>
        </div>
        <ul className="commentsContainer">
          {commentsList.map(eachComment => (
            <CommentItem
              key={eachComment.id}
              eachComment={eachComment}
              onDelete={this.onDelete}
              likeToggle={this.likeToggle}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default Comments
