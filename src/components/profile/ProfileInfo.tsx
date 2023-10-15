import React, {useState, useEffect, useRef} from "react";
import { FaPenNib } from "react-icons/fa";
import {GiBookCover} from "react-icons/gi"
import { FiEdit } from "react-icons/fi";
import {ImCross, ImCheckmark} from "react-icons/im"
import {Avatar, Button, Input, Textarea} from "@nextui-org/react";
import { decryptedJWT, getUserType, imageType } from "@/dto/users";
import { getProfile, updateProfile, squareImage, follow, unfollow} from "@/utils/fetchs";
import { alert } from "@/utils/alertHandeler";
import ModalCard from "./ModalCard";
import { animated, useSpring} from "react-spring";


const   ProfileInfo=({edit,setEdit,followp,setFollow, userInfo, userView,fixFollows, setArticleWriter, articlesPage, setArticlesPage}:{'edit':any, 'setEdit':any , 'followp':any, 'setFollow':any, 'userInfo':decryptedJWT, 'userView':number, 'fixFollows':any, 'setArticleWriter':any, 'articlesPage':any, 'setArticlesPage':any})=>{
    
    const ani = useSpring({
        from: { width: '40%', opacity: 0 },
        to: { width: '80%', opacity: 1 },
        config: { duration: 500 },
        reset: true,
    })



    const [image,setImage] = useState<string>("https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg");
    const [newImage, setNewImage] = useState<string>("https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg");
    const [infoImage, setInfoImage]=useState<imageType>();
    const [profileInfo,setProfileInfo] = useState<getUserType>({
        'id_user':-1,
        'username':'',
        'name':'',
        'lastname':'',
        'rol':0,
        'profession':'',
        'description':'',
        'image_url':'',
        'followersCount':0,
        'followingsCount':0,
        'isFollowing':false,
        'articlesByUser':[]
    });
    const imageInputRef = useRef<HTMLInputElement>(null);
    const [height, setHeight] = useState<number>(0);
    const divRef = useRef<any>(null);
    

    const getImageMeta = async (
        file: File
    ): Promise<{
        width: number,
        fileExtension: string|undefined,
    }> => {
        const { name } = file
        const fileExtension = name.split('.').pop()
        const localUrl = URL.createObjectURL(file)
        // reading a file to get height and width
        async function getImageParams(file: File) {
            return new Promise((resolve, reject) => {
                var reader = new FileReader()

                reader.onload = async (e: any) => {
                    var image = new Image()
                    image.src = e.target.result
                    await image.decode()

                    resolve({ width: image.width, height: image.height })
                }
                reader.readAsDataURL(file)
            })
        }
        const { width, height } = await getImageParams(file) as any

        return { width,  fileExtension}
    }

    const handleImageChange = async(event:any) => {
        const image = event.target.files[0];
        const data = await getImageMeta(image)
        if (image) {
            const reader = new FileReader();
            reader.onload = function(evt:any) { 
                const metadata = `name: ${image.name}, type: ${image.type}, size: ${image.size}, width: ${image}, contents:`;
                const contents = evt.target.result;
                setInfoImage({ ...infoImage, 'contenido':contents, 'extension': '.'+data.fileExtension, 'width': data.width, 'ratio':'1:1'});
            };
            reader.readAsDataURL(image);
        }
    };

    const submitForm=async (event:any)=>{
        event.preventDefault();
        const tar = event.target;
        const sentData={ ...profileInfo, 
            'name':tar.name.value,
            'lastname':tar.lastname.value,
            'username':tar.username.value,
            'profession':tar.profession.value,
            'description':tar.description.value
        } as getUserType
        console.log(newImage)
        alert('question', 'You are going to modify your profile','success',async ()=>{
            var res;
            if(newImage!==image){
                 res = await updateProfile(sentData,newImage)
            }else{
                res = await updateProfile(sentData,null)
            }
            if(!res.error){
                setProfileInfo(sentData)
                if(res.image_url){
                    console.log(res.image_url)
                    setImage(res.image_url); setNewImage(res.image_url);
                }
                setTimeout(()=>{},2800)
                setEdit(false)
            }
        })
        
    }

    useEffect(() => {
        (async () => {
            if(infoImage?.contenido){
                const res = await squareImage(infoImage);
                if(!res.error) setNewImage(res.image)
            }
        })();
    },[infoImage])

    useEffect(() => {
        (async () => {
            console.log(userView)
            const users = await getProfile(userView);
            console.log(users)
            setProfileInfo(users);
            if(users.image_url)setImage(users.image_url);setNewImage(users.image_url);
            if(users.articlesByUser)setArticleWriter(users.articlesByUser);
        })();
    },[])

    if(edit){

        return <animated.div className="bg-white w-[40%] rounded-[17px] shadow-xl opacity-0" style={ani}>

            <div className="flex flex-wrap sm:flex-row justify-start h-[50%] sm:h-full w-full py-5 px-5 sm:px-16 sm:py-10 gap-4">
                <form className="flex flex-wrap sm:flex-row h-full w-full gap-10 items-center justify-center" onSubmit={submitForm}>
                    
                    <div className="flex flex-col items-center justify-center w-full sm:w-[60%] h-full">
                        <div className="flex flex-col justify-center mx-7 w-full gap-4">
                            <p className='font-bold text-4xl pb-4'>Mi perfil</p>
                            <div className="flex flex-wrap gap-4  md:gap-2 md:flex-nowrap">
                                <Input className="border-2 sky-600 rounded-[13px] " defaultValue={profileInfo.name} color='primary' variant='bordered' type='text' name="name" placeholder='Nombres'  isRequired />
                                <Input className="border-2 sky-600 rounded-[13px] " defaultValue={profileInfo.lastname} color='primary' variant='bordered' type='text' name="lastname" placeholder='Apellidos'  isRequired />
                            </div>
                            <Input className=" border-2 sky-600 rounded-[13px] " defaultValue={profileInfo.username} color='primary' variant='bordered' type='text' name="username" radius = {"md"} placeholder='Usuario'  isRequired />
                            <Input className=" border-2 sky-600 rounded-[13px] " defaultValue={profileInfo.profession} color='primary' variant='bordered' type='text' name="profession" placeholder='Profesión'  />
                            <Textarea
                                className="w-full sky-600 text-black "
                                defaultValue={profileInfo.description}
                                variant='bordered'
                                minRows={1}
                                placeholder="Descripción"
                                name='description'
                                color="primary"
                                />
                            
                        </div>
                        
                    </div>
                    <div className="w-full sm:w-[30%] h-full">  
                        <Avatar showFallback src={newImage}  className="w-full h-full text-large object-cover" onClick={()=>{imageInputRef.current?.click()}} isBordered/>
                        <input key='1' type='file' className='hidden' ref={imageInputRef} onChange={handleImageChange} accept='image/*'/>
                        <div className="flex flex-column gap-4 items-center justify-center py-4">
                            <Button  isIconOnly  className="bg-[#0CDD4E] text-[#F8F8F8] shadow-2xl" type="submit">
                            <ImCheckmark size='1.5em' />
                            </Button>
                            <Button  isIconOnly  className=" text-[#F8F8F8] shadow-2xl"color="danger"  onClick={()=>{alert('question','Your changes will discard','',()=>{setEdit(false); setNewImage(image)})}}>
                            <ImCross size='1.5em' />
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        

        </animated.div>

    }

    return <>

    <div className="w-[80%]">

    <div className="grid grid-rows-3 gird-cols-1 lg:grid-rows-1 lg:grid-cols-3 lg:place-items-center  w-full min-h-full bg-[#C1D6E8] gap-1 lg:gap-4 lg:items-center">
    
        <div className="bg-[#F0F2F4] w-full rounded-[17px] row-span-2 lg:row-span-1 lg:col-span-2 shadow-lg" ref={divRef} >
            <div className="flex flex-wrap sm:flex-row justify-start h-[50%] sm:h-full w-full p-5 md:pl-14 lg:pl-28 sm:py-10 gap-4">
                <div className="flex flex-wrap sm:flex-row h-full w-full gap-14 sm:gap-10 items-center justify-center ">
                    <div className="w-[60%] sm:w-[30%] h-full">
                        <Avatar showFallback src={image} className="w-full h-auto text-large" isBordered />
                        <div className="flex flex-col gap-2 items-center justify-center py-4">
                            {
                            profileInfo.rol==0?
                            <Button>
                            <GiBookCover size='1.5em'  /> 
                                Reader
                            </Button>
                            :
                            <Button>
                            <FaPenNib size='1.5em' /> 
                                Writer
                            </Button>
                            }
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center w-full sm:w-[60%] h-full">
                        <div className="flex flex-col item-center w-full items-center sm:items-start">
                            <p className='font-bold text-4xl font-sans'>{profileInfo.name} {profileInfo.lastname}</p>
                            <p className='text-sm mb-4 font-sans'>{profileInfo.username}</p>
                            {profileInfo.profession?<p className='text-lg'><b className="text-[#37393B]">Profession:</b> {profileInfo.profession}</p>:<></>}
                            {profileInfo.description?<p className='text-lg'><b className="text-[#37393B]">Description:</b> {profileInfo.description}</p>:<></>}
                        </div>
                        
                    </div>
                </div>
                    
            </div>
        

        </div>
        <div className={`flex flex-row bg-[#F0F2F4] w-full rounded-[17px] justify-center lg:h-full shadow-lg`} >
            <div className=" flex flex-wrap lg:flex-col items-center justify-center gap-4 md:gap-8 lg:gap-4 w-full sm:w-[90%]">

                        <div className=" flex flex-wrap md:flex-row items-center justify-center gap-4 2xl:gap-6 min-h-[20%]">
                            {profileInfo.rol==1?
                                <p className='text-lg font-sans flex flex-wrap sm:flex-col text-center hover:text-blue-500 cursor-pointer' title="View user writings" onClick={()=>{setArticlesPage(!articlesPage);setFollow([false,false])}}>{articlesPage? 'Your':profileInfo.articlesByUser?.length}  <a>{articlesPage?'Saves':'Articles'}</a></p>
                            :
                                <p className='text-lg font-sans flex flex-wrap sm:flex-col text-center hover:text-blue-500 cursor-pointer' title="View user saved articles" onClick={()=>{setFollow([false,false])}}>Your<a>Articles</a></p>
                            }
                            <p id = "0" title="View user followers" className='text-lg font-sans flex flex-col text-center hover:text-blue-500 cursor-pointer ' onClick={fixFollows}>{profileInfo.followingsCount}  <a id = "0">Followers</a></p>
                            <p id = "1" title="View users user follows" className='text-lg font-sans flex flex-col text-center hover:text-blue-500 cursor-pointer' onClick={fixFollows}>{profileInfo.followersCount}<a id = "1"> Following</a></p>
                        </div>
                        <div className="flex flex-col justify-center items-center gap-4 h-auto">
                        {profileInfo.id_user==userInfo.userId?
                        <>
                        <Button className="bg-[#963ED9] text-[#F8F8F8] shadow-2xl" onClick={()=>{setEdit(true); setNewImage(image)}}>
                            Edit <FiEdit size='1.5em' />
                        </Button>
                        
                            {profileInfo.id_user==userInfo.userId?
                            <ModalCard user={profileInfo}></ModalCard>
                            :
                            <></>
                            }
                        </>
                        :
                        <>
                        {profileInfo.isFollowing?
                            <Button color="primary" onClick={async()=>{const res = await unfollow(profileInfo,userInfo.userId); if(!res.error)setProfileInfo({...profileInfo,'isFollowing':false})}}>
                                Unfollow
                            </Button>
                        :
                            <Button color="primary" onClick={async()=>{const res = await follow(profileInfo, userInfo.userId); if(!res.error)setProfileInfo({...profileInfo,'isFollowing':true})}}>
                                Follow
                            </Button>
                        }
                        </>
                        }
                        </div>
                    </div>
        </div>

    </div>

    </div>
    </>
}

export default ProfileInfo;