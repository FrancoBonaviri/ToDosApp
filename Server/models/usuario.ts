import { Schema, model, Document } from 'mongoose';


const userSchema = new Schema({

    UserName:{
        type: String,
        required: [true, 'Debe indicar el nombre de usuario']
    },
    Email: {
        type: String,
        required: [true, 'Debe indicar el email del usuario']
    },
    Password: {
        type: String,
        required: [true, 'Debe indicar la contrasena del usuario']
    }

});


userSchema.method('toJSON', function() {
    const { __v, ...data } = this._doc;
    delete data.Password;
    return data;
});


interface IUser extends Document {
    UserName: string;
    Email: string;
    Password: string;
}


export const User = model<IUser>('User', userSchema);