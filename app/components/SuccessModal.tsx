"use client"

import React from "react";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogAction,
    AlertDialogCancel,
} from "@/components/ui/alert-dialog";

type Props = {
    open: boolean;
    title?: string;
    description?: string;
    onClose: () => void;
    confirmLabel?: string;
};

export default function SuccessModal({ open, title = "Success", description = "Your changes were saved.", onClose, confirmLabel = "Continue" }: Props) {
    return (
        <AlertDialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose(); }}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        { description }
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => onClose()}>{"Close"}</AlertDialogCancel>
                    <AlertDialogAction onClick={() => onClose()}>{confirmLabel}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>


    );
}
