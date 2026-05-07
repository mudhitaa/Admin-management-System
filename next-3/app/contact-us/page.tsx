import { Metadata } from "next"

export const metadata:Metadata = {
  title: "Contact Us",
  description: "this is the contact us page",
}

export default function ContactUs() {
  return (<>
    <a href="/" className="text-blue-500">
      home
    </a>
  <div>this is the contact us page</div>
  </>)
}