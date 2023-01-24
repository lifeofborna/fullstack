const PersonForm = ({newName, newNumber, handleSubmit, handleNameChange, handleNumChange}) => {
    return (
      <form onSubmit={handleSubmit}>
        <div>name: <input value={newName} onChange={handleNameChange} /></div>
        <div>number: <input value={newNumber} onChange={handleNumChange}/></div>
        <div><button type="submit">add</button></div>
      </form>
    )
  }

export default PersonForm
  