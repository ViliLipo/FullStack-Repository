import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props)
    let table = []
    var i =  0
    for(i = 0; i < this.props.anecdotes.length; i++) {
      table.push(0)
    }
    this.state = {
      selected: 0,
      score: table
    }
  }

  Button = (props) => {
    return (
        <button onClick={props.f}> {props.text} </button>
    )
  }

  nextClick = () => {
    const i = Math.floor(Math.random() * 6)
    console.log("Random number is ", i)
    this.setState({
      selected: i
    })
  }
  voteClick = () => {
    let table = this.state.score
    table[this.state.selected] = table[this.state.selected] +1
    this.setState( {
      score: table
    })
  }
  findMax = () => {
    let maxValue = -10000
    let canditate = 0
    let i = 0
    for(i = 0; i < this.state.score.length; i++) {
      console.log(i)
      if (this.state.score[i] > maxValue) {
        maxValue = this.state.score[i]
        canditate = i
      }

    }
    return canditate
  }

  BestAnectdote = () => {
    let max = this.findMax()
    return (
      <div>
        <h2> Anectdote with most votes : </h2>
        {this.props.anecdotes[max]}
        <p> has {this.state.score[max]} votes </p>
      </div>
    )
  }


  render() {
    return (
      <div>
        {this.props.anecdotes[this.state.selected]}
        <div>
          <p> has {this.state.score[this.state.selected]} points </p>
        </div>
        <div>
          <this.Button f={this.nextClick} text="Next anectdote" />
          <this.Button f={this.voteClick} text="Vote" />
        </div>
        <this.BestAnectdote />
      </div>
    )
  }
}
const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]



ReactDOM.render(<App anecdotes={anecdotes}/>, document.getElementById('root'));
