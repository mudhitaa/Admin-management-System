export const ucFirst =(text: string)=>{ 
    const first =text.charAt(0).toUpperCase()
    return first+text.substring(1)
}

export const nameImage = (name: string)=>{
    const names= name.split(" ")
    const firstLetters = names.map(str => str[0])
    return firstLetters.join("").toUpperCase()
}