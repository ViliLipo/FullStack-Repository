import React from 'react'

import PropTypes from 'prop-types'

class Blog extends React.Component {
  // 5.11
  static propTypes = {
    blog: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    updateBlogFunction: PropTypes.func.isRequired,
    deleteFunction: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props)
    this.state = {
      highlighted: false
    }
  }

  toggleHighlight =() => {
    this.setState({highlighted: !this.state.highlighted})

  }

  like = () => {
    this.props.blog.likes +=1
    this.props.updateBlogFunction(this.props.blog)
  }

  del = () => {
    console.log("del")
    console.log(this.props.user)
    console.log(this.props.blog.user)
    this.props.deleteFunction(this.props.blog)
  }



  render() {
    const blog = this.props.blog
    const user = this.props.user
    const style = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }
    if (this.state.highlighted) {
      try {
        return (
          <div style={style}>
          <div className="name" onClick={this.toggleHighlight} >
            {blog.title} {blog.author}
          </div>
          <div className="url">
            <a href={blog.url}> {blog.url}</a>
          </div>
          <div className="likes"> {blog.likes} likes
            <button onClick={this.like}> like </button>
          </div>

            {blog.user.name === undefined &&
              <div>added by {blog.user.name} </div>}
          {(user.username === blog.user.username || blog.user.username === undefined )&&
          <div> <button onClick={this.del}> delete</button> </div>}
          </div>
        )
      }catch (exception) {
        console.log(exception)
      }
    }
    return (
        <div style={style}>
          <div className="name" onClick={this.toggleHighlight}>
            {blog.title} {blog.author}
          </div>
        </div>
      )
    }

}

export default Blog
