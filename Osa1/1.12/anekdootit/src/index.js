import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux'


const anectdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]
const getId = () => (10000*Math.random()).toFixed(0)
const initialState = () => {
  let i = 0
  let table = []
  for(i = 0; i < anectdotes.length; i++) {
    table.push({content:anectdotes[i], votes:0, id:getId()})
  }
  return {
    selected: table[0],
    anectdotes: table
  }
}

const voteReducer = (state=initialState(), action) => {
  let tempstate = Object.assign({}, state)
  switch(action.type) {
    case 'NEXT':
      tempstate.selected = tempstate.anectdotes[Math.floor(Math.random() * state.anectdotes.length)]
      //console.log(tempstate.selected)
      break
    case 'VOTE':
      //console.log(action)
      const findId =(a) => {
        return a.id === action.target.id
      }
      let anec = tempstate.anectdotes.find(findId)
      anec.votes += 1
      const comparator = (a, b) => {
        if (a.votes > b.votes) {
          return 1
        }else if ( a.votes  < b.votes) {
          return -1
        } else if ( a.votes === b.votes) {
          return 0
        }
      }
      tempstate.anectdotes = tempstate.anectdotes.sort(comparator).reverse()
      break
    default:
      break
  }
  return tempstate
}

const store = createStore(voteReducer)

class App extends React.Component {


  findMax = () => {
    const state = store.getState()
    const maxreducer = (a,b) => {
      if (a.votes > b.votes) {
        return a
      } else {
        return b
      }
    }
    return state.anectdotes.reduce(maxreducer, state.anectdotes[0])
  }
  Anectdote = (props) => {
    return (
      <div>
        <div>
          {props.anectdote.content}
        </div>
        <div>
          has {props.anectdote.votes} votes
          <button onClick={e => store.dispatch({type:'VOTE', target:props.anectdote})}> Vote </button>
        </div>
    </div>
    )
  }

  BestAnectdote = () => {
    let max = this.findMax()
    return (
      <div>
        <h2> Anectdote with most votes : </h2>
        <this.Anectdote anectdote={max}/>
      </div>
    )
  }


  render() {
    const state = store.getState()
    //console.log(state)
    return (
      <div>
        <h1> Anectdotes </h1>
        {state.anectdotes.map(anectdote =>
        <this.Anectdote anectdote={anectdote} key={anectdote.id}/>)
      }
      </div>
    )
  }
}



const renderApp = () => {
  ReactDOM.render(<App anectdotes={anectdotes}/>, document.getElementById('root'));
}
renderApp()
store.subscribe(renderApp)
