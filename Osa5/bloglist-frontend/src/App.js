import React from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Toggleable from './components/Toggleable'
import blogService from './services/blogs'
import loginService from './services/login'
import Notifications from './components/Notification'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      password : '',
      username :'',
      user : null,
      error: null,
      message: null
    }
  }


  componentDidMount() {
    console.log("MOUNTING")
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({user})
      blogService.setToken(user.token)
    }
  }

  handleLoginFieldChange = (event) => {
    console.log(event.target.name)
    if (event.target.name === 'password') {
      this.setState({password: event.target.value})
    } else if (event.target.name === 'username') {
      this.setState({username: event.target.value})
    }
  }
  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      this.setState({user,
      message: `${user.username} logged in`})
      blogService.setToken(user.token)
      setTimeout(() => {
        this.setState({message:null})
      }, 5000)

    } catch (exception){
      this.setState({
        error:'käyttäjätunnus tai salasana virheellinen'
      })
      setTimeout(() => {
        this.setState({ error: null})
      }, 5000)
    }
  }
  logout = async(event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    this.setState({
      username: '',
      password: '',
      user: null
    })
  }
  Blogs = () => {
    const comparator = (a, b) => {
      if (a.likes < b.likes){
        return 1
      }
      if (b.likes < a.likes) {
        return -1
      }
      if(a.likes === b.likes) {
        return 0
      }
    }
    const blogs = this.state.blogs.sort(comparator)

    return (
      <div className="blogs">
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} user={this.state.user} updateBlogFunction={this.updateBlog} deleteFunction={this.deleteBlog}/>
        )}
      </div>
    )
  }

  submitBlog = async (blogObject) => {
    try {
      let submitted  = await blogService.create(blogObject)
      let templist = this.state.blogs.slice(0)
      console.log(submitted)
      templist.push(submitted)
      this.setState({blogs: templist,
      message: `a new blog '${blogObject.title}' by ${blogObject.author} added`})
      setTimeout(() => {
        this.setState({message: null})
      }, 5000)
    }catch (exception) {
      this.setState({error: 'Virheellinen pyyntö'})
      setTimeout(() => {
        this.setState({error:null})
      }, 5000)
    }

  }

  updateBlog = async (blogObject) => {
    try {
      let updated = await blogService.update(blogObject)
      console.log(updated)
      const findById = (a)=> {
        return a.id === updated.id
      }
      const index = this.state.blogs.findIndex(findById)
      console.log("index =", index)
      let tempBlogs = this.state.blogs.slice(0)
      tempBlogs.splice(index, 1, updated)
      this.setState({blogs: tempBlogs })

    } catch (exception) {
      this.setState({error: exception.message})
      setTimeout(() => {
        this.setState({error:null})
      }, 5000)
    }
  }

  deleteBlog = async (blogObject) => {
    try {
      console.log(blogObject)
      let deleted = await blogService.deleteBlog(blogObject)
      console.log(deleted)
      const findById = (a) => {
        return a.id === blogObject.id
      }
      const index = this.state.blogs.findIndex(findById)
      let templist = this.state.blogs.slice(0)
      templist.splice(index, 1)
      this.setState({blogs: templist})

    }catch(exception) {
      console.log(exception)
    }
  }

  render() {
      return (
        <div>
          <Notifications.ErrorNotification message={this.state.error} />
          <Notifications.Notification message={this.state.message} />
          {this.state.user === null ? <LoginForm app={this}/>:
            <div>
                <p> {this.state.user.name} logged in
                  <button type="logout" onClick={this.logout}> logout </button>
                </p>
            </div>
          }
          {this.state.user !== null && this.Blogs()}
          {this.state.user !== null &&
            <Toggleable buttonLabel="new blog" ref={component => this.BlogForm = component}>
              <BlogForm submitFunction={this.submitBlog}/>
            </Toggleable>}

        </div>
      );
  }

}

export default App;
