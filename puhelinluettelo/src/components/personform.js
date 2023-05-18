const PersonForm = (props) => {
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
  }

export default PersonForm;