const Filter = ({filter, handleFilterChange}) => {
    return (
      <form>
        filter shown with <input value={filter} onChange={handleFilterChange} />
      </form>
    )

}


export default Filter