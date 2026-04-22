"use client";

import { Trash2 } from "lucide-react";
import { deleteDevice } from "@/lib/actions";

export default function DeleteButton({ id }: { id: string }) {
  const handleDelete = async () => {
    if (confirm("هل أنت متأكد من حذف هذا الجهاز؟")) {
      await deleteDevice(id);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors cursor-pointer"
    >
      <Trash2 className="w-3.5 h-3.5" />
      حذف
    </button>
  );
}
