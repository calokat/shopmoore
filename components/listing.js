import Link from 'next/link'

export default function Listing(props) {
    return (
        <>
            <div className="ml-0.5 mb-0.5">
                <div className="bg-black text-white pl-8"><Link href = {`/listings/${props._id}`}>{props.name}</Link></div> 
                <div className="border-4 border-black flex">
                <a href = {`/listings/${props._id}`}><img src={props.imgLink} className="w-48 h-48"></img></a>
                    <div className="ml-16">
                        <p>Category: {props.category}</p>
                        <p>Description: {props.desc}</p>
                        <p>${props.price}</p>
                        <p>Seller email:</p> 
                        <a href={`mailto:${props.email}`} className="hover:underline">{props.email}</a>
                    </div>
                </div>
            </div>
        </>
    )
}