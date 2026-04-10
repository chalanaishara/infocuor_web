import mongoose from "mongoose";

const eventSchema=mongoose.Schema({

    title:{
        type:String,
        required:true
    },

    date:{
        type:Date,
        required:true
    },

    image:{
        type:String,
        required:false
    
}

},{ timestamps:true });

    const Event=mongoose.model("events",eventSchema);

    export default Event;
    
