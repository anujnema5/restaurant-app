import { getAuthSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// FETCH ALL ORDERS
export const GET = async (request: NextRequest) => {
    const session = await getAuthSession();

    if (session) {        
        try {
            if (session.user.isAdmin) {
                const orders = await prisma.order.findMany();
                return new NextResponse(JSON.stringify(orders), { status: 200 });
            }
            const orders = await prisma.order.findMany({
                where : {
                    userEmail: session.user.email!
                }
            });
            
            return new NextResponse(JSON.stringify(orders), { status: 200 });
        } catch (error) {
            console.log(error);
            return new NextResponse(JSON.stringify({ message: "Something went wrong" }), { status: 500 })
        }
    } else {
        return new NextResponse(JSON.stringify({ message: "Not Authenticated", }), { status: 401 })
    }
}