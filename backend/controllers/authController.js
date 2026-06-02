import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const sign = user => jwt.sign({ id: user._id, name: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });
const present = user => ({ id: user._id, name: user.name, email: user.email, avatar: user.avatar });

export async function register(req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: "Name, email and password are required" });
  if (await User.findOne({ email })) return res.status(409).json({ message: "Account already exists" });
  const user = await User.create({ name, email, password: await bcrypt.hash(password, 12) });
  res.status(201).json({ token: sign(user), user: present(user) });
}

export async function login(req, res) {
  const user = await User.findOne({ email: req.body.email });
  if (!user || !await bcrypt.compare(req.body.password, user.password)) return res.status(401).json({ message: "Incorrect email or password" });
  res.json({ token: sign(user), user: present(user) });
}

export async function me(req, res) {
  res.json({ user: present(await User.findById(req.user.id)) });
}
