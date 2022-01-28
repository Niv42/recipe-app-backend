import Post from '../models/Post';
import { ApolloError } from 'apollo-server-core';

const Query = {
  hello: () => 'hello',
  post: async (_: any, args: { id: string }) => {
    const post = await Post.findById(args.id);
    if (post) {
      return post;
    } else {
      throw new ApolloError('No post was found');
    }
  },
  posts: async () => {
    const posts = await Post.find();
    return posts;
  },
};

const Mutation = {
  createPost: async (_: any, args: { author: string; content: string }) => {
    const post = new Post({ author: args.author, content: args.content });
    return await post.save();
  },
  deletePost: async (_: any, args: { id: string }) => {
    const postToDelete = await Post.findByIdAndDelete({ _id: args.id });
    if (!postToDelete) {
      throw new ApolloError('Post was probably already deleted');
    }
    return postToDelete;
  },
  updatePost: async (_: any, args: { id: string; content: string }) => {
    // const postToUpdate = await Post.findOneAndUpdate(
    //   { _id: args.id },
    //   { $set: { content: args.content } }
    // ).exec((err, res) => {
    //   console.log('test', res);
    //   if (err) reject(err);
    //   else resolve(res);
    // });
    // return postToUpdate;

    // :בדיוק כמו

    return new Promise((resolve, reject) => {
      Post.findOneAndUpdate(
        { _id: args.id },
        { $set: { content: args.content } },
        { new: true }
      ).exec((err, res) => {
        console.log('test', res);
        if (err) reject(err);
        else resolve(res);
      });
    });
  },
};

export const resolvers = {
  Query,
  Mutation,
};
