

export default function Post({post}){
    console.log("incoming",post)
    const {tags}=post;
    return(
        <div className="flex flex-col items-center justify-center  w-[90%] sm:w-[50%] md:w-[40%] text-[#FFFFFF] gap-4 border border-[#FFFFFF] px-4 py-4 rounded-lg">
            <h1 className="text-3xl">{post.title}</h1>
            <p>{post.body}</p>
            <div className="flex gap-2">
           {tags.map((tag)=>(
            <div className="px-2 py-1 rounded-lg bg-blue-400">{tag}</div>
             ))}
           </div>
        </div>
    )
}