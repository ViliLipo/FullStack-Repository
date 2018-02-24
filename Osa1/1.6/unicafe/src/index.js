import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux'
import counterReducer from './counterReducer'

const store = createStore(counterReducer)

class App extends React.Component {
  constructor(props) {
    super(props)
    this.heading = 'Anna palautetta'
    this.statistics = 'Statistiikka'
  }
  /*No eihän tää hirveen siisti ole, mutta on tämä yhdessä handlerissa koko potti 1.10 */
  Click = option => {
    //console.log(option ,this.state[option])
    if (option === "good") {
      return () => {
        this.setState({
          good: this.state[option] +1
        })
      }
    } else if (option === "neutral") {
      return () => {
        this.setState({
          neutral: this.state[option] +1
        })
      }
    } else if (option === "bad") {
      return () => {
        this.setState({
          bad: this.state[option] +1
        })
      }
    }
  }

// On niikuin statistics mut on vaan numbers 1.8
  Numbers = () => {
    const state = store.getState()
    let sum = state.good + state.ok + state.bad
    console.log('summa', sum)
    if(sum === 0) {
      return (
        <div>
          <p> Yhtään statistiikkaa ei ole annettu</p>
        </div>
      )
    }
    return(
      // 1.11
      <table>
        <tbody>
          <this.Statistic text="hyvä" value={state.good} />
          <this.Statistic text="neutraali" value={state.ok} />
          <this.Statistic text="huono" value={state.bad} />
          <this.Statistic text="keskiarvo" value={this.Average()} />
          <this.Statistic text="positiivisia" value={this.Positivity()} special="%" />
        </tbody>
      </table>
    )
  }
  //1.8
  Statistic = (props) => {
    return(
      <tr>
          <td> {props.text} </td>
          <td> {props.value} {props.special}</td>
      </tr>

    )
  }

// 1.8
  Button = (props) => {
    return (
        <button onClick={props.f}> {props.text} </button>
    )
  }
//1.7
  Average = () => {
    const state = store.getState()
    const positive = state.good
    const neutral = state.ok
    const negative = state.bad
    let all = positive + neutral + negative
    if (all === 0) {
      return 0
    }
    let score = positive -negative
    let avg = score/all
    return Math.round((avg)*100)/100
  }
  //1.7
  Positivity = () => {
    const state = store.getState()
    let all = state.good + state.ok + state.bad
    if (all === 0) {
      return 0
    }
    return Math.round((state.good/all)*100)
  }

  render() {
    const state = store.getState()
    console.log(state)
    return(
      <div>
        <h1> {this.heading} </h1>
        <this.Button f={e => store.dispatch({type:'GOOD'})} text="hyvä"/>
        <this.Button f={e => store.dispatch({type:'OK'})} text="neutraali"/>
        <this.Button f={e => store.dispatch({type:'BAD'})} text="huono"/>
        <h2> {this.statistics} </h2>
        < this.Numbers />
      </div>
      )
  }
}


const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
}
renderApp()
store.subscribe(renderApp)
