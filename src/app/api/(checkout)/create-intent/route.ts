import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

const stripe = require("stripe")(process.env.SECRET_KEY)

export const POST = async ({ params }: { params: { id: string } }) => {
    const { id } = params

    const order = await prisma.order.findUnique({
        where: {
            id: id
        }
    })

    if (order) {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 100 * 100,
            currency: "eur",
            // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
            automatic_payment_methods: {
                enabled: true,
            },
        });

        await prisma.order.update({
            where: {
                id: id
            }, data: {
                intent_id: paymentIntent.id
            }
        })

        return new NextResponse(JSON.stringify({ clientSecret: paymentIntent.clientSecret }), { status: 200 });

    } else {
        return new NextResponse(JSON.stringify({ message: "Order Not found" }), { status: 404 });
    }
}