import { LoaderCircle, TriangleAlert } from "lucide-react";

type ConfirmDialogProps = {
    open: boolean;
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    loading?: boolean;
    onConfirm: () => void;
    onCancel: () => void;
};

export function ConfirmDialog({
    open,
    title,
    description,
    confirmText = "Confirm",
    cancelText = "Cancel",
    loading = false,
    onConfirm,
    onCancel,
}: ConfirmDialogProps) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">

                <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-100">
                        <TriangleAlert className="h-6 w-6 text-red-600" />
                    </div>

                    <div>
                        <h2 className="text-lg font-bold text-slate-900">
                            {title}
                        </h2>

                        <p className="mt-1 text-sm leading-6 text-slate-500">
                            {description}
                        </p>
                    </div>
                </div>

                <div className="mt-8 flex justify-end gap-3">

                    <button
                        onClick={onCancel}
                        disabled={loading}
                        className="rounded-xl border border-slate-200 px-5 py-2.5 font-medium transition hover:bg-slate-100"
                    >
                        {cancelText}
                    </button>

                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 font-medium text-white transition hover:bg-red-700 disabled:opacity-70"
                    >
                        {loading && (
                            <LoaderCircle className="h-4 w-4 animate-spin" />
                        )}

                        {confirmText}
                    </button>

                </div>

            </div>
        </div>
    );
}