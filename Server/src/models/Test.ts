import { Schema, model, Document } from 'mongoose';

interface ITest extends Document {
  title: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const testSchema = new Schema<ITest>({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const Test = model<ITest>('Test', testSchema);

export default Test;