export default function FilterMenu(props) {
    return (
        <>
            <h1>Filter Menu</h1>
            <input type="text" placeholder="Enter category" id="category" onInput={props.onCategoryInput}></input>
            <button onClick={props.onFilter} className="ml-5">Filter</button>
            {props.canResetFilters ? <button onClick={props.resetFilters} className="ml-5">Reset Filters</button> : null}
      </>
    )
}