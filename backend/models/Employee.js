import mongoose from "mongoose"

const EmployeeSchema = mongoose.Schema({

    employeeId: {
        type: String,
        required: true,
        unique: true
    },

    name : {
        type: String,
        required: true
    },

    age : {
        type: Number,
        required: true
    },
    
    gender : {
        type : String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },

    email : {
        type: String,
        required: true,
        unique: true
    },

    phoneNumber : {
        type: String,
        required: true
    },

    position: {
        type: String,
        required: true
    },

    department: {
        type: String,
        required: true
    },

    salary: {
        type: Number,
        required: true
    },

})

const Employee = mongoose.model("Employee", EmployeeSchema)

export default Employee
