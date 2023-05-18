const Filter = (props) => {
    return (
      <div>
      find countries 
        <input
          value={props.filter}
          onChange={props.onChange} />
        <button onClick={props.reset}>reset</button>
      </div>
    )
  }

export default Filter;