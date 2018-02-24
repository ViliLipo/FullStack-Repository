import React from 'react'



class AddForm extends React.Component {
  constructor(props) {
    super(props)
    this.store = props.store
  }
  handleChange = (event) => {
    event.preventDefault()
    this.store.dispatch({type:'INPUT', text:event.target.value})
  }
  submit = (event) => {
    event.preventDefault()
    this.store.dispatch({type:'ADD'})
  }

  render() {
    const state = this.store.getState()
    return (
      <div>
        <h1> create new </h1>
        <form onSubmit={this.submit}>
          <input type='text'
           name='content'
           value={state.newContent}
           onChange={this.handleChange}
          />
        <button type='submit'> submit </button>
        </form>
      </div>
    )
  }
}

export default AddForm
