import { CheckCircle2, XCircle } from "lucide-react";
import { useEffect } from "react";

type SnackbarProps = {
    open: boolean;
    message: string;
    type?: "success" | "error";
    onClose: () => void;
};

export function Snackbar({
    open,
    message,
    type = "success",
    onClose,
}: SnackbarProps) {
    useEffect(() => {
        if (!open) return;

        const timer = setTimeout(onClose, 3000);

        return () => clearTimeout(timer);
    }, [open, onClose]);

    return (
        <div
            className={`fixed bottom-6 left-1/2 z-50 -translate-x-1/2 transition-all duration-300 ${open
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0 pointer-events-none"
                }`}
        >
            <div className="flex min-w-[380px] items-center justify-between gap-4 rounded-2xl bg-slate-900 px-6 py-4 text-white shadow-2xl">

                <div className="flex items-center gap-3">

                    {type === "success" ? (
                        <CheckCircle2 className="h-6 w-6 text-green-400" />
                    ) : (
                        <XCircle className="h-6 w-6 text-red-400" />
                    )}

                    <span className="font-medium">{message}</span>

                </div>

            </div>
        </div>
    );
}