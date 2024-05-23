import { z } from "zod";

export const CreateCard = z.object({
    title: z.string({
        required_error: "Le titre est obligatoire.",
        invalid_type_error: "Le titre est obligatoire."
    }).min(3, {
        message: "Le titre est trop court."
    }),
    boardId: z.string(),
    listId: z.string()
});