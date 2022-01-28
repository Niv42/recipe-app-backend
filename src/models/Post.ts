import mongoose, { Document, Schema } from 'mongoose';

export interface IPost extends Document {
  id: number;
  author: string;
  content: string;
}

const PostSchema: Schema = new Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  author: { type: String, required: true },
  content: { type: String, required: true },
});

export default mongoose.model<IPost>('Post', PostSchema);
