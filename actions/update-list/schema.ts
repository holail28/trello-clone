import { z } from "zod";

export const UpdateList = z.object({
    title: z.string({
        required_error: "Le titre est obligatoire.",
        invalid_type_error: "Le titre est obligatoire."
    }).min(3, {
        message: "Le titre est trop court."
    }),
    id: z.string(),
    boardId: z.string()
});