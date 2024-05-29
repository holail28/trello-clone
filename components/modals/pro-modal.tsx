"use client";

import Image from "next/image";
import { toast } from "sonner";

import { useProModal } from "@/hooks/use-pro-modal";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-actions";
import { stripeRedirect } from "@/actions/stripe-redirect";

export const ProModal = () => {
    const proModal = useProModal();

    const { execute, isLoading } = useAction(stripeRedirect, {
        onSuccess: (data) => {
            window.location.href = data;
        },
        onError: (error) => {
            toast.error(error);
        }
    })

    const onClick = () => {
        execute({});
    }

    return (
        <Dialog
            open={proModal.isOpen}
            onOpenChange={proModal.onClose}
        >
            <DialogContent className="max-w-md p-0 overflow-hidden">
                {/* <div className="aspect-video relative flex items-center justify-center">
                    <Image
                        src="/logo.svg"
                        alt="logo"
                        className="object-contain"
                        fill
                    />
                </div> */}
                <div className="text-neutral-700 mx-auto space-y-6 p-6">
                    <h2 className="font-semibold text-xl">
                        Passez à Taskify Pro dès aujourd'hui !
                    </h2>
                    <p className="text-xs font-semibold text-neutral-600">
                        Découvrez le meilleur de Taskify
                    </p>
                    <div className="pl-3">
                        <ul className="text-sm list-disc">
                            <li>Nombre illimité de tableaux</li>
                            <li>Checklists avancées</li>
                            <li>Fonctionnalités d'administration et de sécurité</li>
                            <li>Et plus encore !</li>
                        </ul>
                    </div>
                    <Button
                        disabled={isLoading}
                        onClick={onClick}
                        className="w-full"
                        variant="primary"
                    >
                        Mettre à niveau
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}