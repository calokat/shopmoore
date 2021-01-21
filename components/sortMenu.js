export default function SortMenu(props) {
    return (
        <>
            Sort with{"    "}<select id="sortWith" onChange={props.onSortWithChange}>
                <option value="name">Name</option>
                <option value="price">Price</option>
            </select>{"    "}
            by {"    "}<select id="sortBy" onChange={props.onSortByChange}>
                    <option value="low-high">{props.sortWithPrefix}Lowest to Highest</option>
                    <option value="high-low">{props.sortWithPrefix}Highest to Lowest</option>
                </select>
            <button onClick={props.onSort} className="ml-5">
                Sort
            </button>
        </>
    )
}