import Entry from "./entry"

const Persons = ({lista, handleDelete}) => {
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
  }

export default Persons;