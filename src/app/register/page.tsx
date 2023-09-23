'use client'

import SignUpCard from "@/components/SignUpCard";
import HomeBubble from "@/components/homeBubble";
import { useRouter } from "next/navigation";

const SignUp=()=>{

    const router = useRouter()

    if(localStorage.getItem('token')){

        router.push('/')

    }else{

        return <>
            <div className="grid place-items-center h-screen bg-[#0079DC] ">
                <HomeBubble/>
                <SignUpCard/>

            </div>
        </>
    }
}

export default SignUp;