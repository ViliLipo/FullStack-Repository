import React from 'react'


const Notification = ({message}) => {
  const style = {
    paddingTop: 10,
    paddingLeft: 2,
    border:'solid',
    borderColor: 'green',
    borderWidht: 1,
    marginBottom:5,
    color: 'green'
  }
  if (message === null) {
    return null
  }
  return ( <div style={style}> {message} </div>)
}
const ErrorNotification =({message}) => {
  const style =  {
    paddingTop: 10,
    paddingLeft: 2,
    border:'solid',
    borderColor: 'red',
    borderWidht: 1,
    marginBottom:5,
    color: 'red'
  }
  if (message === null) {
    return null
  }
  return (<div style={style}> {message}</div>)
}

export default {Notification, ErrorNotification}
