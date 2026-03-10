import { useState, useEffect, useCallback } from "react";
import svgPaths from "../../imports/svg-arpwj8qwes";
import { Info } from "lucide-react";

type ToastType = "success" | "info";

interface ToastData {
  id: number;
  message: string;
  type: ToastType;
}

let toastListeners: ((toast: ToastData) => void)[] = [];
let toastIdCounter = 0;

export function showToast(message: string, type: ToastType = "success") {
  const toast: ToastData = { id: ++toastIdCounter, message, type };
  toastListeners.forEach((listener) => listener(toast));
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<(ToastData & { animating: boolean; exiting: boolean })[]>([]);

  useEffect(() => {
    const listener = (toast: ToastData) => {
      setToasts((prev) => [...prev, { ...toast, animating: false, exiting: false }]);

      // Trigger enter animation
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setToasts((prev) =>
            prev.map((t) => (t.id === toast.id ? { ...t, animating: true } : t))
          );
        });
      });

      // Auto-dismiss after 1500ms
      setTimeout(() => {
        dismissToast(toast.id);
      }, 1500);
    };

    toastListeners.push(listener);
    return () => {
      toastListeners = toastListeners.filter((l) => l !== listener);
    };
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, exiting: true } : t))
    );
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 200);
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-0 right-0 z-[200] flex flex-col items-end p-[24px] gap-[8px] pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto transition-all duration-200 ease-out"
          style={{
            transform: toast.animating && !toast.exiting ? "translateX(0)" : "translateX(calc(100% + 24px))",
            opacity: toast.animating && !toast.exiting ? 1 : toast.exiting ? 0 : 0,
          }}
        >
          <div className="bg-[#27272a] flex gap-[16px] items-start p-[8px] relative rounded-[8px] shrink-0">
            <div
              aria-hidden="true"
              className="absolute border border-[#52525b] border-solid inset-[-1px] pointer-events-none rounded-[9px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.05)]"
            />
            <div className="flex gap-[8px] items-start min-h-[20px] px-[10px] py-[8px] relative shrink-0">
              <div className="flex items-center pt-[2px] relative shrink-0">
                {toast.type === "info" ? (
                  <Info size={16} className="text-[#3b82f6] shrink-0" />
                ) : (
                <div className="overflow-clip relative shrink-0 size-[16px]">
                  <div className="absolute inset-[4.17%]">
                    <svg
                      className="absolute block size-full"
                      fill="none"
                      preserveAspectRatio="none"
                      viewBox="0 0 14.6667 14.6667"
                    >
                      <path d={svgPaths.p1242db00} fill="#0CAD86" />
                    </svg>
                  </div>
                </div>
                )}
              </div>
              <div className="flex flex-col items-start relative shrink-0">
                <p className="font-medium h-[20px] leading-[1.5] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">
                  {toast.message}
                </p>
              </div>
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="flex items-center justify-center max-h-[32px] max-w-[32px] min-h-[32px] min-w-[32px] relative rounded-[6px] shrink-0 size-[32px] cursor-pointer bg-transparent border-none hover:bg-[rgba(255,255,255,0.1)] transition-colors duration-200 ease-out"
            >
              <div className="overflow-clip relative shrink-0 size-[16px]">
                <div className="absolute inset-[20.83%]">
                  <svg
                    className="absolute block size-full"
                    fill="none"
                    preserveAspectRatio="none"
                    viewBox="0 0 9.33323 9.33323"
                  >
                    <path d={svgPaths.p2bd57f80} fill="#A1A1AA" />
                  </svg>
                </div>
              </div>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}