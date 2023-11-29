import { connectDb } from "@/db/db";
import User from "@/models/userModel";
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"


connectDb();
export const POST = async (req) => {

    const data = await req.json();

    const { username, email, password } = data;

    if (!username || !email || !password) {
        return NextResponse.json({ message: null, status: false, error: "Please Fill Credentials" }, { status: 401 });
    }

    const userExist = await User.findOne({ email });

    if (userExist) {
        return NextResponse.json({ message: null, status: false, error: "User Already Exist" }, { status: 401 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username, email, password: hashedPassword
    })

    return NextResponse.json({ user, message: "user register successfully", status: true, error: null }, { status: 201 })


}