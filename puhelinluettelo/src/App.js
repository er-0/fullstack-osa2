import { useState, useEffect } from 'react'
import phonebookService from './services/phonebookservice'
import PersonForm from './components/personform'
import Persons from './components/persons'
import Notification from './components/notification'
import Filter from './components/filter'

/*const Notification = ({message, status}) => {
  if (message === null) {
    return null
  }

  return (
    <div className={status}>
      {message}
    </div>
  )  
}*/

/*const Filter = (props) => {
  return (
    <div>
    filter shown with 
      <input
        value={props.filter}
        onChange={props.onChange} />
    </div>
  )
}*/

/*const PersonForm = (props) => {
  return (
  <div>
    <form onSubmit={props.onSubmit}>
    name:
    <input 
      value={props.newName} 
      onChange={props.onNameChange}/> <br />
    number:
    <input
      value={props.newNumber}
      onChange={props.onNumberChange} />
    <button type="submit">add</button>
    </form>
  </div>
  )
}*/

/*const Entry = ({name, number, handleDelete}) => {
  return (
    <div>
      {name} {number} <button onClick={handleDelete}>delete</button>
    </div>
  )
}*/

/*const Persons = ({lista, handleDelete}) => {
  return (
    <div>
    {lista.map(person => 
      <Entry 
        key={person.id} 
        name={person.name} 
        number={person.number} 
        handleDelete={() => handleDelete(person)}
        />)}
    </div>
  )
}*/

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
	const [filter, setFilter] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState(null)

  useEffect(() => {
    phonebookService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const addName = (event) => {
    event.preventDefault()
    
    const nameObject = {
        name: newName,
        id: newName,
        number: newNumber
    }
    
    if (persons.map((person) => person.name).includes(newName)) {
      const toUpdate = persons.find((p) => p.name === newName)
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) 
      {
      const updated = {...toUpdate, number: newNumber}
      phonebookService
        .update(toUpdate.id, updated)
        .then((returned) => {
          setPersons(persons.map(
            (person) => person.name !== newName ? person : returned))
          setMessage(`Number updated for ${newName}`)
          setStatus("success")
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          })
        .catch(() => {
          setMessage(`Information of ${newName} has already been removed from the server`)
          setStatus("error")
          setTimeout(() => {
            setMessage(null)
            setStatus(null)
          }, 5000)
          setPersons(persons.filter(p => p.name !== newName))
          })
      } 
      setNewName('')
      setNewNumber('')
      
    }
    else {
      phonebookService
        .create(nameObject)
        .then(nameObject => {
        setPersons(persons.concat(nameObject))
        setNewName('')
        setNewNumber('')
        setMessage(`${newName} added to phonebook`)
        setStatus("success")
        setTimeout(() => {
          setMessage(null)
          setStatus(null)
        }, 5000)
        })
      }
    }
    

  const deleteName = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      phonebookService
        .deleteName(person.id)
        .then(() => {
          setPersons(persons.filter(nameObject => nameObject.id !== person.id))
          setMessage(`${person.name} deleted from phonebook`)
          setStatus("success")
          setTimeout(() => {
            setMessage(null)
            setStatus(null)
          }, 5000)
        })
    }

  }

  const handlePersonsChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumbersChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const lista = persons.filter((entry) => new RegExp(filter, "i").test(entry.name))
      
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification 
        message={message}
        status={status} />
      <Filter 
        filter={filter}
        onChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm 
        onSubmit={addName}
				onNameChange={handlePersonsChange}
				onNumberChange={handleNumbersChange}
				newName={newName}
				newNumber={newNumber}/>
      <h2>Numbers</h2>
      <Persons lista={lista} handleDelete={deleteName}/>
    </div>
  )

}

export default App