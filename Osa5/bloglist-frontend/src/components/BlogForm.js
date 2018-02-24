import React from 'react'
import PropTypes from 'prop-types'


class BlogForm extends React.Component {
  static propTypes = {
    submitFunction: PropTypes.func.isRequired
  }
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      author: '',
      url: ''
    }
  }
  handleChange =(event)=> {
    if (event.target.name === "title") {
      this.setState({title: event.target.value})
    } else if (event.target.name === 'author') {
      this.setState({author: event.target.value})
    } else if (event.target.name === 'url') {
      this.setState({url : event.target.value})
    }
  }
  submit = (event) => {
    event.preventDefault()
    const blogObject = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url
    }
    console.log(blogObject)
    this.props.submitFunction(blogObject)
    this.setState({title:'',author:'',url:''})
  }

  render() {
    return (
      <div>
      <p> new blog </p>
        <form onSubmit={this.submit}>
          <div>
            title
            <input
              type='text'
              name='title'
              value={this.state.title}
              onChange={this.handleChange}
              />
          </div>
          <div>
            author
            <input
              type='text'
              name='author'
              value={this.state.author}
              onChange={this.handleChange}
            />
          </div>
          <div>
            url
            <input
              type='text'
              name='url'
              value={this.state.url}
              onChange={this.handleChange}
            />
          </div>
          <button type='submit'> submit</button>
        </form>
      </div>
    )
  }
}
export default BlogForm
