"use client";

import { Trash2 } from "lucide-react";
import { deleteDevice } from "@/lib/actions";
import { useState } from "react";
import ConfirmModal from "@/components/ConfirmModal";

export default function DeleteButton({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    await deleteDevice(id);
    setLoading(false);
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors cursor-pointer"
        disabled={loading}
      >
        <Trash2 className="w-3.5 h-3.5" />
        حذف
      </button>
      <ConfirmModal
        open={open}
        title="تأكيد الحذف"
        message="هل أنت متأكد من حذف هذا الجهاز؟ لا يمكن التراجع عن هذه العملية."
        confirmText={loading ? "جاري الحذف..." : "تأكيد الحذف"}
        cancelText="إلغاء"
        onConfirm={handleDelete}
        onCancel={() => setOpen(false)}
      />
    </>
  );
}
