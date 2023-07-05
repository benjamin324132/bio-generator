import { OpenAIStreamPayload } from "@/types";
import { formSchema } from "@/validators/formValidator";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request) {
  const body = await req.json();
  try {
    const { bio } = formSchema.parse(body);

    const prompt = `Generate one twitter bio or CV bio in spanish with no hashtags. Make sure the generated bio is at more than 30 words and at max 40 words and base them on this context: ${bio}${
      bio.slice(-1) === "." ? "" : "."
    }`;

    const payload: OpenAIStreamPayload = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      max_tokens: 200,
      stream: false,
      n: 1,
    };

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,
      },
      method: "POST",
      body: JSON.stringify(payload),
    });

    if (res.status !== 200) {
      return new Response("Ooops algo salio mal", { status: 400 });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Campos incompletos", { status: 400 });
    }

    return new Response("Algo salio mal", { status: 500 });
  }
}
