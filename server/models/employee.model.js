import mongoose, { Mongoose } from "mongoose";

const employeeSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },

    firstName: {
        type: String,
        required: true,
        trim: true
    },

    lastName: {
        type: String,
        required: true,
        trim: true
    },

    cnic: {
        type: String,
        required: true,
        trim: true
    },

    phone: {
        type: String
    },
    address: {
        type: String,
        trim: true
    },

    gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: true
    },

    dateOfBirth: {
        type: Date
    },
    departmentId: {
        type: mongoose.Types.ObjectId,
        ref: 'Department',  
    },
    designationId: {
        type: mongoose.Types.ObjectId,
        ref: 'Designation',  
    },
    managerId: {
        type: mongoose.Types.ObjectId,
        ref: 'Employee',
    },
    employmentType: {
        type: String,
        enum: ['Full-Time', 'Intern', 'Contract'],
        required: true,
        default: 'Full-Time'
    },
    skills: {
        type: Array
    },
    certification: {
        type: Array,
    },
    documentsUrl:{
        type: Array
    },
    status: {
        type: String,
        enum: ['active', 'on-leave', 'resigned', 'terminated']
    },
    joinDate: {
        type: Date,
        default: Date.now
    },
    exitDate: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
});

const Employee = mongoose.model(
    'Employee',
    employeeSchema
);

export default Employee;