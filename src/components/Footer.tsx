import { SUPPORT_EMAIL } from "@/data/mockShipments";
import { Mail, Phone } from "lucide-react";

const WHATSAPP_NUMBER = "2349038642833";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-card mt-16">
      <div className="w-full  mx-auto px-4 sm:px-6 lg:px-8 items-center justify-between">

        {/* Brand */}
        <div>
          <div className="font-bold text-lg text-foreground mb-2">
            SwiftTrack
          </div>
          <p className="text-muted-foreground max-w-xs">
            Fast, reliable global shipment tracking with real-time updates and
            secure delivery monitoring.
          </p>
        </div>

        {/* Support */}
        <div>
          <div className="font-semibold text-foreground mb-3">
            Support
          </div>

          <div className="space-y-2">
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="h-4 w-4" />
              {SUPPORT_EMAIL}
            </a>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Phone className="h-4 w-4" />
              WhatsApp Support
            </a>
          </div>
        </div>

        {/* Legal / Info */}
        <div className="md:text-right flex flex-col justify-between">
          <div className="text-muted-foreground">
            © {new Date().getFullYear()} SwiftTrack
          </div>

          <div className="mt-2 space-x-4 text-xs">
            <a
              href="#"
              className="hover:text-primary text-muted-foreground"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="hover:text-primary text-muted-foreground"
            >
              Terms
            </a>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t border-border py-3 text-center text-xs text-muted-foreground">
        Built for fast global logistics 🚚
      </div>
    </footer>
  );
};

