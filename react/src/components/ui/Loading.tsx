export const Spinner = ({
    className ="  border-b-pink-600 border-t-pink-600",
    size ='size-16'
}:Readonly<{className?: string, size?: string}>) => {
    
    return(
        <>
        <div className="flex flex-col items-center justify-center gap-4">
                <div className={`${className} ${size} border-6 border-white rounded-full animate-spin`}></div>
                <p className="text-gray-600 font-medium">Loading...</p>
            </div>
        </>
    )
}