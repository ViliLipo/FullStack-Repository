import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      good: 0,
      neutral: 0,
      bad: 0
    }
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
    let sum = this.state.good + this.state.neutral + this.state.bad
    //console.log('summa', sum)
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
          <this.Statistic text="hyvä" value={this.state.good} />
          <this.Statistic text="neutraali" value={this.state.neutral} />
          <this.Statistic text="huono" value={this.state.bad} />
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
    const positive = this.state.good
    const neutral = this.state.neutral
    const negative = this.state.bad
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
    let all = this.state.good + this.state.neutral + this.state.bad
    if (all === 0) {
      return 0
    }
    return Math.round((this.state.good/all)*100)
  }

  render() {
    return(
      <div>
        <h1> {this.heading} </h1>
        <this.Button f={this.Click("good")} text="hyvä"/>
        <this.Button f={this.Click("neutral")} text="neutraali"/>
        <this.Button f={this.Click("bad")} text="huono"/>
        <h2> {this.statistics} </h2>
        < this.Numbers />
      </div>
      )
  }
}


ReactDOM.render(<App />, document.getElementById('root'));
