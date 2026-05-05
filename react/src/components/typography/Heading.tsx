
export interface Heading1Props{
    pagetitle:string;
}

export interface Heading2Props{
    maintext:string;
    subtext?:string;
}


export const Heading1=({pagetitle}:Readonly<Heading1Props>)=>{
    return(
        <h1 className="text-4xl font-semibold text-shadow-lg">{pagetitle}</h1>
    )
}


export const Heading2=({maintext,subtext=''}:Readonly<Heading2Props>)=>{
    return(
        <div className={`text-3xl italic ${subtext}`}>{maintext}</div>
    )
}