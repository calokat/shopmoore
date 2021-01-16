export default function Listing(props) {
    return (
    <div>
        <h1>{props.name}</h1>
        <p>{props.desc}</p>
        <p>${props.price}</p>
        <img src={props.imgLink}></img>
    </div>
    )
}