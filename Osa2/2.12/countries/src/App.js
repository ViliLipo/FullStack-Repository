import React from 'react';
import './App.css';
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [{
          name: "nada"
        }
      ],
      highLighted: '',
      filter: ''
    }

  }

  componentWillMount(){
    axios
         .get('https://restcountries.eu/rest/v2/all')
         .then(response => {
           console.log('promise fulfilled')
          this.setState({countries: response.data})
        })
  }

  handleChange = (event, type) => {
    //console.log("heii",type, event.target.value)
    event.preventDefault()
    this.setState({[type]: event.target.value})
  }
  handleClick = (event, country) => {
    event.preventDefault()
    //console.log(event.target)
    this.setState({highLighted: country,
                    filter: ''})
  }
  Field = (props) => {
    return(
      <div>
        {props.text} : <input value={props.i}
        onChange={(e) => this.handleChange(e, props.type)}
        onClick={(e) => this.handleClick(e, '')}
        onSubmit={(e) => e.preventDefault()}/>
      </div>
    )
  }

  Form = (props) => {
    return (
      <div>
        <form>
          <this.Field text="find countries" i={this.state.filter} type="filter"  />
        </form>
      </div>
    )
  }

  Countries = () => {
    if(this.state.highLighted !== '') {
      return (
        <this.DetailedCountry country={this.state.highLighted} />
      )
    }
    if (this.state.filter === "") {
      //console.log("filter")
      return(
        <p> too many matches, specify </p>
      )
    }
    const rows = this.state.countries.filter(country => country.name.toLowerCase().search(this.state.filter.toLowerCase()) !== -1)
    //console.log(rows.length)
    if(rows.length > 10) {
      return(
        <p> too many matches, specify </p>
      )
    } else if (rows.length === 1) {
      return (
        <this.DetailedCountry country={rows[0]} />
      )

    }else if (rows.length > 1){
      return (
        <div>
          <ul>{rows.map(
            country => <this.Country key={country.name} country={country}/>
          )}
          </ul>
        </div>
      )
    } else if (rows.length === 0) {
      return(
        <p> Check the filter </p>
      )
    }
  }

  Country = (props) => {
    return(
      <li onClick={(e) => this.handleClick(e, props.country)}> {props.country.name} </li>
    )
  }
  DetailedCountry = (props) => {
    return(
      <div className="App-DetailedCountry">
        <h2> {props.country.name} </h2>
        <p> capital: {props.country.capital} </p>
        <p> population : {props.country.population} </p>
        <img src={props.country.flag}  height="100" width="200" alt="flag"/>
        <div>
        <button onClick={(e) => this.handleClick(e,'')}>
        back</button>
        </div>
      </div>
    )

  }

  render() {
    return (
      <div className="App">
        <this.Form />
        <this.Countries />
      </div>
    );
  }
}

export default App;
