const mongoose=require("mongoose");
const {ObjectId} = mongoose.Schema.Types;

const AppointmentSchema=mongoose.Schema({
    student:
    {
        type:ObjectId,
        ref:"User"
    },
    mentor:
    {
        type:ObjectId,
        ref:"User"
    },
    session:
    {
        type:ObjectId,
        ref:"Session"
    }
}

);

module.exports=Appointment=mongoose.model("Appointment",AppointmentSchema);