import { create } from "zustand";
import {
  mockShipments,
  type Shipment,
  type ShipmentStatus,
  type TrackingEvent,
} from "@/data/mockShipments";

interface ShipmentStore {
  shipments: Shipment[];
  addShipment: (shipment: Shipment) => void;
  updateShipment: (trackingNumber: string, updates: Partial<Shipment>) => void;
  deleteShipment: (trackingNumber: string) => void;
  addEvent: (trackingNumber: string, event: Omit<TrackingEvent, "id">) => void;
  deleteEvent: (trackingNumber: string, eventId: string) => void;
}

export const generateTrackingNumber = () => {
  const digits = Math.floor(1000000000 + Math.random() * 9000000000);
  return `UA${digits}ZA`;
};

export const useShipmentStore = create<ShipmentStore>((set) => ({
  shipments: mockShipments,
  addShipment: (shipment) =>
    set((state) => ({ shipments: [shipment, ...state.shipments] })),
  updateShipment: (trackingNumber, updates) =>
    set((state) => ({
      shipments: state.shipments.map((s) =>
        s.trackingNumber === trackingNumber ? { ...s, ...updates } : s
      ),
    })),
  deleteShipment: (trackingNumber) =>
    set((state) => ({
      shipments: state.shipments.filter(
        (s) => s.trackingNumber !== trackingNumber
      ),
    })),
  addEvent: (trackingNumber, event) =>
    set((state) => ({
      shipments: state.shipments.map((s) =>
        s.trackingNumber === trackingNumber
          ? {
              ...s,
              events: [
                ...s.events,
                { ...event, id: `e${Date.now()}` },
              ],
              currentLocation: event.location || s.currentLocation,
            }
          : s
      ),
    })),
  deleteEvent: (trackingNumber, eventId) =>
    set((state) => ({
      shipments: state.shipments.map((s) =>
        s.trackingNumber === trackingNumber
          ? { ...s, events: s.events.filter((e) => e.id !== eventId) }
          : s
      ),
    })),
}));

export type { ShipmentStatus };
