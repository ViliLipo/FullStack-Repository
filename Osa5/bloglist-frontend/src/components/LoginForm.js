import React from 'react'

const LoginForm =(props) => {
  const app = props.app
  return (
    <div>
    <h1> Log in to application</h1>
      <form onSubmit={app.login}>
        <div>
          käyttäjätunnus
          <input
            type='text'
            name='username'
            value={app.state.username}
            onChange={app.handleLoginFieldChange}
            />
            </div>
            <div>
              salasana
              <input
                type='text'
                name='password'
                value = {app.state.password}
                onChange ={app.handleLoginFieldChange}
                />
            </div>
            <button type="submit"> login</button>
            </form>
        </div>
  )
}


export default LoginForm
