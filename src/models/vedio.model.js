import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const vedioSchema = new Schema(
    {
        videoFile: {
            type: String,     //clodinary url
            required: true
        },
        thumbnail: {
            type: String
            ,
            required: true

        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        durations: {
            type: Number,
            required: true
        },
        views: {
            type: Number,
            default: 0
        },
        isPublised: {
            type: Boolean,
            default: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'

        }


    }, { timestamps: true }
)

export const Video = mongoose.model("Video", vedioSchema)