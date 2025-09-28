import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { model, msg, parentModel } = await req.json();

        if (!process.env.KRAVIXSTUDIO_API_KEY) {
            throw new Error("KRAVIXSTUDIO_API_KEY is missing in environment variables");
        }

        const response = await axios.post(
            "https://kravixstudio.com/api/v1/chat",
            {
                message: msg,
                aiModel: model,
                outputType: "text"
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${process.env.KRAVIXSTUDIO_API_KEY}`,
                },
            }
        );

        return NextResponse.json({
            ...response.data,
            model: parentModel,
        });
    } catch (error) {
        console.error("API error:", error.response?.data || error.message);
        return NextResponse.json(
            { error: error.response?.data || error.message },
            { status: error.response?.status || 500 }
        );
    }
}
