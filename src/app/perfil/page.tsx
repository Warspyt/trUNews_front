'use client'

import React, {useState, useEffect} from "react";
import { redirect } from "next/navigation";
import { decryptedJWT } from "@/dto/users";
import {getFromLocalStorage} from "@/utils/localStorage";
import verifyToken from "@/utils/utils";
import ProfileInfo from "@/components/profile/ProfileInfo";
import SavedArticles from "@/components/profile/SavedArticlesProfile";
import FollowersPage from "@/components/profile/FollowersProfile";

export default function App({searchParams}:any) {

    const [userInfo,setUserInfo] = useState<decryptedJWT>({userId:-2,rol:-1})
    const [edit, setEdit] = useState<boolean>(false);
    const [followp, setFollow] = useState<boolean>(false);

    async function token(){
        const tok = getFromLocalStorage("token");
        if(tok){
            const rol =await verifyToken();
            setUserInfo(rol);
        }else{
            setUserInfo({userId:-1,rol:-1});
        }
    }

    useEffect(()=>{
        token()
    },[])

    if(userInfo.userId==-2) return
    if(userInfo.userId==-1) redirect('/');
//#D8DCFF- 
  return (<>
    <div className="grid grid-rows-1 grid-cols-1 place-items-center  min-w-full min-h-full bg-[#C1D6E8] gap-4 py-10">

        <ProfileInfo
            edit={edit}
            setEdit={setEdit}
            followp={followp}
            setFollow={setFollow}
            userInfo = {userInfo}
            userView = {searchParams.search}
        />

        {edit? <></>:followp? <FollowersPage/>:<SavedArticles userInfo = {userInfo} userView = {searchParams.search}/>
        }

    </div>

    

    </>
  );
}