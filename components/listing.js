import Link from 'next/link'

export default function Listing(props) {
    return (
        <>
            <Link href = {`/listings/${props._id}`}>
                <div>
                    <h1>{props.name}</h1>
                    <p>{props.desc}</p>
                    <p>Category: {props.category}</p>
                    <p>${props.price}</p>
                    <img src={props.imgLink}></img>
                </div>
            </Link>
            </>
    )
}