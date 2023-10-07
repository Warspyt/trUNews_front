export default function Layout ({children}:{
  children: React.ReactNode
}){
    return (
        <div className='h-full bg-[#C1D6E8]'>
            {children}
        </div>
    )
}