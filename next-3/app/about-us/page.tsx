import { Metadata } from "next"

//used for routing needs component to be default export
export const metadata:Metadata = {
  title: "About us",
  description: "this is about us page",
}
export default function AboutUs() {
  return (<>
  <a
    href="/"
    className="text-blue-500"
  >
    home
  </a>
   <div>
  this is about us page
  </div>
</>)
}