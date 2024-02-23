import mongoose, { mongo } from "mongoose";
import Post from "../models/Post.js";

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find({}).sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
export const getPost = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: "post does not exist" });
    try {
        const post = await Post.findById(id);
        if (!post) return res.status(404).json({ error: "post does not exist" });
        res.status(200).json(post);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
export const createPost = async (req, res) => {
    try {
        const { date, title, content } = req.body;
        const post = await Post.create({ date, title, content });
        res.status(200).json(post);
        // res.json({ msg: 'created post'});
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
export const deletePost = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: "post does not exist" });
    try {
        const post = await Post.findById(id);
        if (!post) return res.status(404).json({ error: "post does not exist" });
        const deletedPost = await Post.findOneAndDelete({ _id: id });
        res.status(200).json({ msg: "Post Deleted" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
export const updatePost = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: "post does not exist" });
    try {
        const post = await Post.findById(id);
        if (!post) return res.status(404).json({ error: "post does not exist" });
        const updatedPost = await Post.findByIdAndUpdate(id, { content: "Uptated Content" });
        res.status(200).json({ msg: "Post Updated" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
