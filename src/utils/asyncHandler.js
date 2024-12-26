const asyncHandler=(requstHandler)=>{
    return (req,res,next)=>{
        Promise.resolve(requstHandler(req,res,next)).catch((err)=>next(err))
    }

}



export {asyncHandler}