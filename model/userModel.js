import mongoose  from 'mongoose';

const UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isDoctor: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    seenNotification: {
        type: Array,
        default: []
    },
    unseenNotification: {
        type: Array,
        default: []
    },
   isBlocked: {
        type: Boolean,
        default: false
    },
    hasApplied: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export const UserModel = mongoose.model('Users', UserSchema);


