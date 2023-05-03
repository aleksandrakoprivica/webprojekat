import {NextApiRequest, NextApiResponse} from "next";
import prisma from "@/lib/prisma";
import {hash} from "bcrypt";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {

    } else if (req.method === 'GET') {
        try {
            const events = await prisma.event.findMany();
            res.status(200).json(events)
        } catch (e) {
            console.error(e)
            res.status(500).send('Error fetching events from admin')
        }
    } else if (req.method === 'DELETE'){

    }
}