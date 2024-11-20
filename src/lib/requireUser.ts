import { auth } from "@/auth";
import { redirect } from "next/navigation";

const requireUser = async()=>{
    const session = await auth();
    if(session && session.user){
        return session;
    }else{
        redirect("/signin")
    }
}

export default requireUser;