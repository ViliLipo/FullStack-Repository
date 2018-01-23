import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Martti Tienari', number: '040-123456' },
        { name: 'Arto Järvinen', number: '040-123456' },
        { name: 'Lea Kutvonen', number: '040-123456' }
      ],
      newName: '',
      newNumber: '',
      searchTerm:''
    }
  }

  handleNameChange = (event) => {
    this.setState({newName: event.target.value})
  }

  handleNumberChange = (event) => {
    this.setState({newNumber: event.target.value})
  }
  handleSearchTermChange = (event) => {
    this.setState({searchTerm: event.target.value})
  }

  Numbers = (props) => {
    const rows = () => props.list.map(person => <this.Number key={person.name} person={person}/>)
    return (
      <div>
        <h2>Numerot</h2>
        <table>
          <tbody>
            {rows()}
          </tbody>
        </table>
      </div>
    )
  }
  Number = (props) => {
    const name = props.person.name.toLowerCase()
    const searchTerm = this.state.searchTerm.toLowerCase()
    if (searchTerm === '' || name.search(searchTerm) !== -1) {
      return(
          <tr>
            <td>{props.person.name}</td><td> {props.person.number}</td>
          </tr>
      )
    } else {
      return null
    }
  }

  LimitView = () => {
    return(
      <div>
        rajaa näytettäviä: <input value={this.state.searchTerm}
        onChange={this.handleSearchTermChange} />
      </div>
    )
  }

  Form = (props) => {
    return (
      <div>
        <h2> Lisää numero </h2>
        <form onSubmit={this.addPerson} >
          <div>
            nimi: <input value={this.state.newName}
            onChange={this.handleNameChange} />
          </div>
          <div>
            numero: <input value={this.state.newNumber}
            onChange={this.handleNumberChange} />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
      </div>
    )
  }

  addPerson = (event) => {
    event.preventDefault()
    console.log('nappula')
    console.log(event.target)
    let name = this.state.newName
    let number = this.state.newNumber
    //console.log(this.state.persons.indexOf(name))
    let persons = ""
    const names = this.state.persons.map(person => person.name )
    if(names.indexOf(name) === -1) {
      let personObject = {
        name,
        number
      }
      persons = this.state.persons.concat(personObject)
    }else {
      persons = this.state.persons
      console.log("lisättiin sama nimi uudestaan")
    }
    this.setState({
      persons,
      newName : '',
      newNumber: ''
    })

  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <this.LimitView />
        <this.Form />
        <this.Numbers list={this.state.persons} />
      </div>
    )
  }
}

export default App
