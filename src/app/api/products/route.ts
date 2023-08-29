import prisma from "@/lib/prisma";
import {NextRequest, NextResponse} from "next/server";

// FETCH ALL CATEGORIES
export const GET = async(request: NextRequest) => {
    const {searchParams} = new URL(request.url);
    const cat = searchParams.get("cat");

    try {
        const products  = await prisma.product.findMany({
            where: {
                ...(cat ? {catSlug:cat} : {isFeatured: true})
            }
        });
        return new NextResponse(JSON.stringify(products))
    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify({message: "Something went wrong", }))
    }
}

// CREATE PRODUCTS

export const POST = async(request: NextRequest) => {;
    try {
        const body = await request.json();
        const product  = await prisma.product.create({
            data: body
        });

        return new NextResponse(JSON.stringify(product), {status: 201});
    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify({message: "Something went wrong", }))
    }
}