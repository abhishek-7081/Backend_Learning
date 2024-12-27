import { v2 as cloudinary } from "cloudinary";
import fs from "fs";


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_cloud_name,
    api_key: process.env.CLOUDINARY_api_key,
    api_secret: process.env.CLOUDINARY_api_secret
});

const uploadOnCloudinary = async (localFilepath) => {
    try {
        if (!localFilepath) return null
        //upload file on cloudinary
        const response = cloudinary.uploader.upload(localFilepath,
            {
                resource_type: "auto"
            }
        )
            //file has been uploaded successfully
            console.log("FIle has been uploaded on cloudinary", response);

            return response;

    } catch (error) {
        fs.unlink(localFilepath)//remove file from local server if not uploaded
        console.error("Error while uploading file on cloudinary", error);
        return null;

    }
}


export {uploadOnCloudinary};