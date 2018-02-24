import React from 'react'
import {mount} from 'enzyme'
import PropTypes from 'prop-types'
import App from './App'
jest.mock('./services/blogs')
import blogService from './services/blogs'



describe("<App /> when not logged in", ()=> {
  let app
  beforeEach(() => {
    app = mount(<App/>)
  })
  it('Only show login form if not logged in', () => {
    //console.log(app.debug())
    app.update()
    expect(app.text()).toContain("Log in")
    const blogsdiv = app.find('.blogs')
    expect(blogsdiv.length).toBe(0)
  })
})

describe("<App /> when user is logged in", () => {
  let app
  beforeEach(() => {
    const user = {
      username : "tester",
      token: "1234567",
      name: "Testaaja Tommila"
    }
    localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    app = mount(<App/>)
  })
  it ('Shows blogs when logged in ', () => {
    app.update()
    const blogsDiv = app.find(".blogs")
    expect(blogsDiv.length).toBeGreaterThan(0)
  })
})
