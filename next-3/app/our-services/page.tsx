import { Metadata } from "next"

export const metadata:Metadata = {
  title: "Our Services",
  description: "this is the our services page",
}

export default function OurServices() {
  return (<>
    <a href="/" className="text-blue-500">
      home
    </a>
  <div>this is the our services page</div>
  </>)
}