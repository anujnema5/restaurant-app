import prisma from "@/lib/prisma";
import {NextResponse} from "next/server";

// FETCH ALL CATEGORIES
export const GET = async() => {
    try {
        const categories  = await prisma.category.findMany();
        return new NextResponse(JSON.stringify(categories))
    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify({message: "Something went wrong", }))
    }
}

// export const GET = async() => {
//     try {
//         const categories  = await prisma.category.delete({
//             where: {
//                 id: "cllffzsoc0000725iwg2n87xe"
//             }
//         })

//         return NextResponse.json(categories);
//     } catch (error) {
//         console.log(error);
//         return new NextResponse(JSON.stringify({message: "Something went wrong", }))
//     }
// }