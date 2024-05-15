import { z } from "zod";

export const CreateBoard = z.object({
    title: z.string({
        required_error: "Le titre est obligatoire.",
        invalid_type_error: "Le titre est obligatoire."
    }).min(3, {
        message: "Le titre est trop court."
    }),
    image: z.string({
        required_error: "L'image est obligatoire.",
        invalid_type_error: "L'image est obligatoire."
    })
});