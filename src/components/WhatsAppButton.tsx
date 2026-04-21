import { MessageCircle } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/data/mockShipments";

interface WhatsAppButtonProps {
  message?: string;
  floating?: boolean;
}

export const WhatsAppButton = ({
  message = "Hello, I need help with my shipment",
  floating = false,
}: WhatsAppButtonProps) => {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  if (floating) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact us on WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-elevated hover:scale-110 transition-transform"
      >
        <MessageCircle className="h-7 w-7" />
      </a>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 rounded-md bg-[#25D366] px-5 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
    >
      <MessageCircle className="h-5 w-5" />
      Contact via WhatsApp
    </a>
  );
};
