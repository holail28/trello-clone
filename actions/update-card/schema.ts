import { z } from "zod";

export const UpdateCard = z.object({
    boardId: z.string(),
    description: z.optional(
        z.string({
            required_error: "La description est obligatoire.",
            invalid_type_error: "La description est obligatoire."
        }).min(3, {
            message: "La description est trop courte."
        }),
    ),
    title: z.optional(
        z.string({
            required_error: "Le titre est obligatoire.",
            invalid_type_error: "Le titre est obligatoire."
        }).min(3, {
            message: "Le titre est trop court."
        })
    ),
    id: z.string()
});