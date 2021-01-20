export default function FilterMenu(props) {
    return (
        <>
            <h1>Filter Menu</h1>
            <input type="text" placeholder="Enter category" id="category" onInput={props.onCategoryInput}></input>
            <button onClick={props.onFilter}>Filter</button>
            {props.canResetFilters ? <button onClick={props.resetFilters}>Reset Filters</button> : null}
      </>
    )
}