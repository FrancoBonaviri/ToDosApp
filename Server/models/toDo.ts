import { Schema, model, Document } from 'mongoose';


const toDoSchema = new Schema({
    Name: {
        type: String,
        required: [true, 'Debe indicar el nombre del ToDo']
    },
    Description: {
        type: String,
        required: [true, 'Debe indicar la descripcion del ToDo']
    },
    Completed: {
        type: Boolean,
        default: false
    },
    CreationDate: {
        type: Date,
        default: new Date()
    },
    CompletedDate: {
        type: Date,
    },
    LimitDate: {
        type: Date,
        required: [true, 'Debe indicar la fecha limite para la tarea']
    },
    User: {
        type: String,
        required: [true, "Debe indicar el usuario que creo la tarea"]
    },
    Criticality: {
        type: String,
        required: [ true, "Debe indicar la criticidad del ToDo"]
    }

});

export enum CriticalityToDo {
    HIGH,
    MEDIUM,
    LOW
}




toDoSchema.method('toJSON', function() {
    const { __v, ...data } = this._doc;

    data.Criticality = CriticalityToDo[data.Criticality];
    return data;
});


interface ITodo extends Document {
    Name: string;
    Description: string;
    Completed: boolean;
    CreationDate: Date;
    LimitDate: Date;
    User: string;
    Criticality: CriticalityToDo;,
    CompletedDate: Date;
}


export const ToDo = model<ITodo>('ToDo', toDoSchema);