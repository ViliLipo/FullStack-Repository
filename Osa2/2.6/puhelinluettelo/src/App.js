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

  handleChange = (event, type) => {
    //console.log("heii",type)
    this.setState({[type]: event.target.value})
  }


  addPerson = (event) => {
    event.preventDefault()
    console.log('nappula')
    console.log(event.target)
    let name = this.state.newName
    let number = this.state.newNumber
    if(name ==='' || number === '') {
      console.log("älä lisää tyhjää")
      return
    }
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

  Numbers = (props) => {
    const rows =
      this.state.searchTerm === '' ?
        props.list.map(person => <this.Number key={person.name} person={person}/>):
        props.list.filter(person => person.name.toLowerCase().search(this.state.searchTerm.toLowerCase()) !== -1).map(
          person => <this.Number key={person.name} person={person} />
        )
    return (
      <div>
        <h2>Numerot</h2>
        <table>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    )
  }

  Number = (props) => {
    return(
        <tr>
          <td>{props.person.name}</td><td> {props.person.number}</td>
        </tr>
    )
  }

  LimitView = () => {
    return(
      <div>
        rajaa näytettäviä: <input value={this.state.searchTerm}
        onChange={(e) => this.handleChange(e, "searchTerm")} />
      </div>
    )
  }

  NameField = () => {
    return(
      <div>
        nimi: <input value={this.state.newName}
        onChange={(e) => this.handleChange(e, "newName")} />
      </div>
    )
  }

  NumberField = () => {
    return(
      <div>
        numero: <input value={this.state.newNumber}
        onChange={(e) => this.handleChange(e, "newNumber")} />
      </div>
    )
  }
  Field = (props) => {
    return(
      <div>
        {props.text} : <input value={props.i}
        onChange={(e) => this.handleChange(e, props.type)} />
      </div>
    )
  }

  Form = (props) => {
    return (
      <div>
        <h2> Lisää numero </h2>
        <form onSubmit={this.addPerson} >
          <this.Field text="nimi" i={this.state.newName} type="newName" />
          <this.Field text="numero" i={this.state.newNumber} type="newNumber" />
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
      </div>
    )
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
