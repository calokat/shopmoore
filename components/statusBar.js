export default function StatusBar({statusName, statusId}) {
    let message;
    if (statusName && statusId) {
        message = (
        <div className="bg-black text-center">
            <span className="text-green-500">&#10003;</span> <span className="text-white">Success! Your listing for {statusName} has been created! <a href={`/listings/${statusId}`} className="underline">View Listing</a></span>
        </div>)
    }
    return (
        <div className="bg-black text-white" id="status">
            {message}
        </div>
    )
}