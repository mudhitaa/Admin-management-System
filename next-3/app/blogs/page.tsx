import { Metadata } from "next"

export const metadata:Metadata = {
  title: "Blogs",
  description: "this is the blogs page",
}

export default function Blogs() {
  return (<>
    <a href="/" className="text-blue-500">
      home
    </a>
  <div>this is the blogs page</div>
  </>)
}