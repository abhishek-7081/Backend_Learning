const asyncHandler=(requstHandler)=>{
    (req,res,next)=>{
        Promise.resolve(requstHandler(req,res,next)).catch((err)=>next(err))
    }

}



export {asyncHandler}