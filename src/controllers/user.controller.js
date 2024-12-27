import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"



const registerUser = asyncHandler(async (req, res) => {


    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res

    const { fullName, email, username, password } = req.body
    // console.log(email)
    // console.log(fullName)
    // console.log(username)
    // console.log(password)





    if (
        [fullName, email, username.password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }
    // check if user already exists
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })
    if (existedUser) {
        throw new ApiError(409, "user with email or username already exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    // console.log(avatarLocalPath)

    if (!avatarLocalPath) {
        throw new ApiError(400, " Avatar local Image is Required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)


    if (!avatar) {
        throw new ApiError(400, "Avatar Image is Required")
    }

    // console.log("Avatar URL1: ", avatar.url)

    // save the file in database
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        username,
        password
    })
    // console.log(user);


    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "User not found due to internal server error ")

    }


    // console.log("Register User Endpoint Hit")
    // console.log("Request Body: ", req.body)
    // console.log("Request Files: ", req.files)
    // console.log("Avatar Local Path: ", avatarLocalPath)
    // console.log("Cover Image Local Path: ", coverImageLocalPath)
    // console.log("Avatar URL: ", avatar.url)
    // console.log("Cover Image URL: ", coverImage?.url)
    // console.log("Created User: ", createdUser)


    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )

}
)

export { registerUser }