"use client";

import { X } from "lucide-react";
import {
    Popover,
    PopoverClose,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-actions";
import { createBoard } from "@/actions/create-board";

import { FormInput } from "./form-input";
import { FormSubmit } from "./form-submit";
import { toast } from "sonner";

interface FormPopoverProps {
    children: React.ReactNode;
    side?: "left" | "right" | "top" | "bottom";
    align?: "start" | "center" | "end";
    sideOffset?: number;
}

export const FormPopover = ({
    children,
    side = "bottom",
    align,
    sideOffset = 0
}: FormPopoverProps) => {
    const { execute, fieldErrors } = useAction(createBoard, {
        onSuccess: (data) => {
            console.log({ data });
            toast.success("Tableau créé avec succès !");
        },
        onError: (error) => {
            console.error({ error });
            toast.error(error);
        }
    });

    const onSubmit = (formData: FormData) => {
        const title = formData.get("title") as string;

        execute({ title });
    }

    return (
        <Popover>
            <PopoverTrigger>
                {children}
            </PopoverTrigger>
            <PopoverContent
                align={align}
                side={side}
                sideOffset={sideOffset}
                className="w-80 pt-3"
            >
                <div className="text-sm font-medium text-center text-neutral-600 pb-4">
                    Créer un nouveau tableau
                </div>
                <PopoverClose>
                    <Button
                        className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
                        variant="ghost"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </PopoverClose>
                <form action={onSubmit} className="space-y-4">
                    <div className="space-y-4">
                        <FormInput
                            id="title"
                            label="Titre"
                            type="text"
                            errors={fieldErrors}
                        />
                    </div>
                    <FormSubmit
                        className="w-full"
                    >
                        Créer
                    </FormSubmit>
                </form>
            </PopoverContent>
        </Popover>
    )
}