import React from 'react'
import {shallow, mount} from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
  it('renders content', () => {
    const blog = {
      title: "ESIM",
      author: "HC",
      likes: 10
    }
    const mockhandler = jest.fn()
    const simpleblogcomponent = mount(<SimpleBlog blog={blog} onClick={mockhandler} />)
    //console.log(simpleblogcomponent.debug())
    const mainDiv = simpleblogcomponent.find('.titleAndAuthor')
    //console.log(mainDiv.debug())
    expect(mainDiv.text()).toContain(blog.title)
  })
  it('clicking button works', () => {
    const blog = {
      title: "ESIM",
      author: "HC",
      likes: 10
    }
    const mockhandler = jest.fn()
    const simpleblogcomponent = mount(<SimpleBlog blog={blog} onClick={mockhandler} />)
    const button = simpleblogcomponent.find('button')
    button.simulate('click')
    button.simulate('click')
    expect(mockhandler.mock.calls.length).toBe(2)
  })
})
