import React from 'react';
import personService from './services/persons'
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'null', number: 'nill' },
      ],
      newName: '',
      newNumber: '',
      searchTerm:'',
      message: null
    }
  }

  componentWillMount() {
    personService.getAll()
      .then(response => {
        console.log("promise fulfilled")
        this.setState({persons: response.data})
      })

  }

  handleChange = (event, type) => {
    //console.log("heii",type)
    event.preventDefault()
    this.setState({[type]: event.target.value})
  }

  addPerson = (event) => {
    event.preventDefault()
    //console.log('nappula')
    let name = this.state.newName
    let number = this.state.newNumber
    if(name ==='' || number === '') {
      console.log("älä lisää tyhjää")
      return
    }
    //console.log(this.state.persons.indexOf(name))
    let persons = ""
    const names = this.state.persons.map(person => person.name )
    let personObject = {
      name,
      number
    }
    if(names.indexOf(name) === -1) {
      personService.create(personObject).then(response => {
        console.log(response.data)
        personObject = response.data
        this.setState({
                persons : this.state.persons.concat(personObject),
                newName : '',
                newNumber: '',
                message: `Lisättiin ${personObject.name} onnistuneesti.`
              })
      })
    }else {
      if(window.confirm(`${name} on jo luettelossa korvataanko vanha numero uudella`)) {
        persons = this.state.persons.slice()
        //console.log(persons)
        var index = names.indexOf(name)
        persons[index] = {
          name,
          number,
          id : this.state.persons[index].id
        }
        this.setState({
          persons,
          newName: '',
          newNumber: '',
          message: `Henkilon ${persons[index].name} numero on päivitetty.`
        })
        personService.update(this.state.persons[index].id, this.state.persons[index]).then(response => {
          console.log('succes!', response)
        }).catch(error => {
          console.log('fail')
          personService.create(persons[index]).then(response => {
            console.log('Hlo lisättiin uudelleen')
          })
        })
      }
      //console.log("lisättiin sama nimi uudestaan")
    }
    setTimeout(() => {
      this.setState({message:null})
    }, 5000)
  }

  removePerson = (e, personObject) => {
    //console.log(e)
    if(window.confirm(`Oletko varma, että haluat poistaa yhteystiedon ${personObject.name}?`)) {
      var persons = this.state.persons.slice()
      const index = persons.indexOf(personObject)
      persons.splice(index, 1)
      personService.remove(personObject.id).then(response => {
        console.log(response)
        this.setState({message: `Poistettiin ${personObject.name} onnistuneesti.`,
                      persons,
        })
      })

      setTimeout(() => {
        this.setState({message:null})
      }, 5000)
    }
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
          <td>{props.person.name}</td>
          <td> {props.person.number}</td>
          <td>
            <button onClick={(e) => this.removePerson(e, props.person)}> poista</button>
          </td>
        </tr>
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
        <form onSubmit={this.addPerson.bind(this)} >
          <this.Field text="nimi" i={this.state.newName} type="newName" />
          <this.Field text="numero" i={this.state.newNumber} type="newNumber" />
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
      </div>
    )
  }
  Notification = ({ message }) => {
    if(message === null) {
      return null
    }
    return (
      <div className="notification">
        {message}
      </div>
    )
  }

  render() {
    return (
      <div>
        <this.Notification message={this.state.message}/>
        <h2>Puhelinluettelo</h2>
        <this.Field text="rajaa näytettäviä" i={this.state.searchTerm} type="searchTerm" />
        <this.Form />
        <this.Numbers list={this.state.persons} />
      </div>
    )
  }
}

export default App
