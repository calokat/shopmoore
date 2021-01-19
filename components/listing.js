import Link from 'next/link'

export default function Listing(props) {
    return (
        <>
            <Link href = {`/listings/${props._id}`}>
                <div className="max-w-sm max-h-md">
                    <div className="border-4 border-black">
                        <img src={props.imgLink}></img>
                        <p className="bg-black text-white">{props.name}</p>    
                    </div>
                    {/* <p>{props.desc}</p>
                    <p>Category: {props.category}</p>
                    <p>${props.price}</p> */}
                </div>
            </Link>
            </>
    )
}