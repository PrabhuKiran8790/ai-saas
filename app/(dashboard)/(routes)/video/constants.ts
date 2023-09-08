import * as z from "zod"

export const formSchema = z.object({
    // zod validation, prompt should be at least 1 character long, else return the message
    prompt: z.string().min(1, {
        message: "Please enter a prompt"
    })
})