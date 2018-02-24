import React from 'react'
import {shallow, mount} from 'enzyme'
import PropTypes from 'prop-types'
import Blog from './Blog'



describe.only("<Blog />", () => {
  it('Highlight works', () => {
    const user = {username:"kekkerit",name:"Keijo Keinonen", _id:"notanrealid"}
    const blogEx = {
      title: "ESIM",
      author: "HC",
      likes: 10,
      url: 'www.notarealulr.ly',
      user: user
    }
    const mockhandler = jest.fn()
    //console.log(testlel)
    const component = mount(<Blog blog={blogEx} user={user}
       updateBlogFunction={mockhandler} deleteFunction={mockhandler}/>)
    // DEBUG: console.log(component.debug())
    expect(component.text()).toContain(blogEx.title)
    expect(component.text()).not.toContain(blogEx.likes)
    const mainDiv = component.find('.name')
    // DEBUG: console.log(mainDiv.debug())
    mainDiv.simulate('click')
    // DEBUG:console.log(component.debug())
    const likediv = component.find('.likes')
    expect(likediv.text()).toContain(blogEx.likes)
    const urldiv = component.find('.url')
    expect(urldiv.text()).toContain(blogEx.url)
  })
})
