import Image from "next/image"
import NotFoundImage from "@/app/public/images/not-found.png"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center w-full justify-center bg-white dark:bg-[#09090b]">
        <div className="text-center">
            <Image
                height={500}
                width={500}
                alt="Not Found Image"
                src={NotFoundImage.src}
            />
            <Link href={"/"}>
            <Button>
                <span><ArrowLeft/></span>
             Go Back To Home
            </Button>
            </Link>
        </div>
    </div>
  )
}

export default NotFound