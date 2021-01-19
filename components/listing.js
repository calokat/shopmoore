import Link from 'next/link'

export default function Listing(props) {
    return (
        <>
            <div>
                <div className="bg-black text-white"><Link href = {`/listings/${props._id}`}>{props.name}</Link></div> 
                <div className="border-4 border-black flex">
                    <img src={props.imgLink} className="w-48 h-48"></img>
                    <div className="ml-16">
                        <p>Category: {props.category}</p>
                        <p>Description: {props.desc}</p>
                        <p>${props.price}</p>
                    </div>
                </div>
            </div>
        </>
    )
}