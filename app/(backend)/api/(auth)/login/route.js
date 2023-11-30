import { connectDb } from "@/db/db";
import User from "@/models/userModel";
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";


connectDb();
export const POST = async (req, res) => {

    const data = await req.json();

    const { email, password } = data;

    if (!email || !password) {
        return NextResponse.json({ message: null, status: false, error: "Please Fill Credentials" }, { status: 401 });
    }

    const user = await User.findOne({ email });

    if (!user) {
        return NextResponse.json({ user, message: null, status: true, error: "User not Exist" }, { status: 401 })

    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
        return NextResponse.json({ user, message: null, status: true, error: "password not match" }, { status: 401 })
    }

    const token = jwt.sign({ userId: user._id }, process.env.NEXTJS_SECRET, {
        expiresIn: "1d",
    });

    return NextResponse.json({ token, message: "user login successfully", status: true, error: null }, { status: 200 })



}