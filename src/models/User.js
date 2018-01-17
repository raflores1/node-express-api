import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



const schema = new mongoose.Schema({
    email: { type: String, required: true, lowercase: true, index: true },
    passwordHash: { type: String, required: true }
}, { timestamps: true })


schema.methods.generateJWT = function generateJWT() {
    return jwt.sign({
        email: this.email
    }, process.env.JWT_KEY)
}

schema.methods.toAuthJSON = function toAuthJSON() {
    return {
        email: this.email,
        token: this.generateJWT()
    }

}
schema.methods.isValidPassword = function isValidPassword(password) {
   return  bcrypt.compareSync(password, this.passwordHash);
}
export default mongoose.model('User', schema)