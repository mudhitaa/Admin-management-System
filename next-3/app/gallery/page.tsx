import { Metadata } from "next"

export const metadata:Metadata = {
  title: "Gallery",
  description: "this is the gallery page",
}

export default function Gallery() {
  return (<>
    <a href="/" className="text-blue-500">
      home
    </a>
  <div>this is the gallery page</div>
  </>)
}