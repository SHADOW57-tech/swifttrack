export type ShipmentStatus =
  | "Pending"
  | "Picked Up"
  | "In Transit"
  | "Out for Delivery"
  | "Delivered"
  | "Delayed"
  | "On Hold";

export interface TrackingEvent {
  id: string;
  location: string;
  status: string;
  description?: string;
  date: string; // ISO
  isAlert?: boolean;
}

export interface Shipment {
  trackingNumber: string;
  status: ShipmentStatus;
  currentLocation: string;
  estimatedDelivery: string; // ISO date
  origin: string;
  destination: string;
  recipientName: string;
  serviceType: string;
  weight: string;
  events: TrackingEvent[];
}

export const STATUS_OPTIONS: ShipmentStatus[] = [
  "Pending",
  "Picked Up",
  "In Transit",
  "Out for Delivery",
  "Delivered",
  "Delayed",
  "On Hold",
];

// Mock data store (in-memory). Replace with API calls when backend is ready.
export const mockShipments: Shipment[] = [
  {
    trackingNumber: "UA784563921ZA",
    status: "On Hold",
    currentLocation: "Addis Ababa, Ethiopia",
    estimatedDelivery: "2025-04-18",
    origin: "Kyiv, Ukraine",
    destination: "Addis Ababa, Ethiopia",
    recipientName: "A. Tesfaye",
    serviceType: "Express Worldwide",
    weight: "2.4 kg",
    events: [
      {
        id: "e1",
        location: "Kyiv, Ukraine",
        status: "Picked Up",
        description: "Shipment picked up from sender",
        date: "2025-04-10T09:15:00Z",
      },
      {
        id: "e2",
        location: "Warsaw, Poland",
        status: "In Transit",
        description: "Departed sorting facility",
        date: "2025-04-12T18:40:00Z",
      },
      {
        id: "e3",
        location: "Istanbul, Turkey",
        status: "Processing",
        description: "Arrived at international hub",
        date: "2025-04-14T11:20:00Z",
      },
      {
        id: "e4",
        location: "Addis Ababa, Ethiopia",
        status: "On Hold",
        description: "Held at customs — awaiting documentation",
        date: "2025-04-16T08:05:00Z",
        isAlert: true,
      },
    ],
  },
  {
    trackingNumber: "UA123456789ZA",
    status: "Delivered",
    currentLocation: "Berlin, Germany",
    estimatedDelivery: "2025-04-08",
    origin: "London, UK",
    destination: "Berlin, Germany",
    recipientName: "M. Schneider",
    serviceType: "Standard",
    weight: "0.8 kg",
    events: [
      {
        id: "e1",
        location: "London, UK",
        status: "Picked Up",
        date: "2025-04-04T10:00:00Z",
      },
      {
        id: "e2",
        location: "Brussels, Belgium",
        status: "In Transit",
        date: "2025-04-05T14:30:00Z",
      },
      {
        id: "e3",
        location: "Berlin, Germany",
        status: "Out for Delivery",
        date: "2025-04-08T07:45:00Z",
      },
      {
        id: "e4",
        location: "Berlin, Germany",
        status: "Delivered",
        description: "Signed by recipient",
        date: "2025-04-08T13:22:00Z",
      },
    ],
  },
  {
    trackingNumber: "UA555000111ZA",
    status: "In Transit",
    currentLocation: "Dubai, UAE",
    estimatedDelivery: "2025-04-22",
    origin: "Shanghai, China",
    destination: "Nairobi, Kenya",
    recipientName: "J. Otieno",
    serviceType: "Express Worldwide",
    weight: "5.1 kg",
    events: [
      {
        id: "e1",
        location: "Shanghai, China",
        status: "Picked Up",
        date: "2025-04-15T08:00:00Z",
      },
      {
        id: "e2",
        location: "Dubai, UAE",
        status: "In Transit",
        description: "Transferred at regional hub",
        date: "2025-04-18T22:10:00Z",
      },
    ],
  },
];

// WhatsApp placeholder — replace with real number (international format, no +)
export const WHATSAPP_NUMBER = "1234567890";
export const SUPPORT_EMAIL = "support@example.com";
