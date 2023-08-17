import prisma from "@/lib/prisma"
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
    try {
        const data = await request.json();
        const insertData = await prisma.category.createMany({ data })
        return NextResponse.json(insertData);
        
    } catch (err) {
        console.log(err);
        return NextResponse.json("Something went wrong")
    }
}