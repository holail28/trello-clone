"use server";

import { z } from "zod";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type State = {
    errors?: {
        title?: string[];
    },
    message?: string | null;
}

const CreateBoard = z.object({
    title: z.string().min(3, {
        message: "Minimum 3 caractères requis"
    })
});

export async function create(prevState: State, formData: FormData) {
    const validatedFields = CreateBoard.safeParse({
        title: formData.get("title")
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Champs manquants ou invalides."
        }
    }

    const { title } = validatedFields.data;

    try {
        await db.board.create({
            data: {
                title,
            },
        });
    } catch (error) {
        return {
            message: "Une erreur s'est produite."
        }
    }

    revalidatePath("/organization/org_2fun6qJ8O7J4rT3sYsRtShKkWXd");
    redirect("/organization/org_2fun6qJ8O7J4rT3sYsRtShKkWXd");
}