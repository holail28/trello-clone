"use server"

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { InpuType, ReturnType } from "./types"
import { CreateBoard } from "./schema";

const handler = async (data: InpuType): Promise<ReturnType> => {
    const { userId } = auth();

    if (!userId) {
        return {
            error: "Non autorisé"
        }
    }

    const { title } = data;

    let board;

    try {
        board = await db.board.create({
            data: {
                title
            }
        })
    } catch (e) {
        return {
            error: "Échec de la création du tableau."
        }
    }

    revalidatePath(`/board/${board.id}`);
    return { data: board };
}

export const createBoard = createSafeAction(CreateBoard, handler);