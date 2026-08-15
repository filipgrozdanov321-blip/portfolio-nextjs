// Fake data + booking logic for the Appointment Booking demo.
// Everything here is deterministic, in-memory data — no backend calls.

export interface Service {
  id: string;
  name: string;
  duration: number; // minutes
  price: number; // USD, 0 = free
  description: string;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  serviceIds: string[]; // which services this person can perform
}

export interface CustomerDetails {
  name: string;
  email: string;
  phone: string;
  notes: string;
}

export const SERVICES: Service[] = [
  {
    id: "svc-haircut",
    name: "Signature Haircut",
    duration: 45,
    price: 55,
    description:
      "A precision cut tailored to your face shape, finished with a wash and blow-dry.",
  },
  {
    id: "svc-color",
    name: "Full Color",
    duration: 120,
    price: 140,
    description:
      "All-over color using premium, low-ammonia formulas for rich, lasting results.",
  },
  {
    id: "svc-balayage",
    name: "Balayage Highlights",
    duration: 150,
    price: 180,
    description:
      "Hand-painted highlights for a natural, sun-kissed gradient with minimal upkeep.",
  },
  {
    id: "svc-massage",
    name: "Deep Tissue Massage",
    duration: 60,
    price: 95,
    description:
      "Targeted pressure work to release chronic tension in the neck, shoulders, and back.",
  },
  {
    id: "svc-facial",
    name: "Rejuvenating Facial",
    duration: 50,
    price: 85,
    description:
      "A customized treatment to cleanse, exfoliate, and hydrate for a refreshed glow.",
  },
  {
    id: "svc-consult",
    name: "Style Consultation",
    duration: 30,
    price: 0,
    description: "A free sit-down to plan your next cut, color, or full makeover.",
  },
];

export const STAFF: StaffMember[] = [
  {
    id: "staff-jamie",
    name: "Jamie Ortiz",
    role: "Senior Stylist",
    serviceIds: ["svc-haircut", "svc-color", "svc-balayage", "svc-consult"],
  },
  {
    id: "staff-morgan",
    name: "Morgan Lee",
    role: "Colour Specialist",
    serviceIds: ["svc-color", "svc-balayage", "svc-consult"],
  },
  {
    id: "staff-priya",
    name: "Priya Kapoor",
    role: "Massage Therapist",
    serviceIds: ["svc-massage", "svc-facial"],
  },
  {
    id: "staff-devon",
    name: "Devon Clarke",
    role: "Esthetician",
    serviceIds: ["svc-facial", "svc-haircut", "svc-consult"],
  },
];

// Sentinel "staff member" for an explicit "No preference" choice. It
// satisfies the StaffMember shape so it can flow through the exact same
// state field as a real pick, instead of needing a separate boolean flag
// to distinguish "not chosen yet" from "chose not to specify".
export const NO_PREFERENCE_STAFF: StaffMember = {
  id: "no-preference",
  name: "No preference",
  role: "First available team member",
  serviceIds: [],
};

export function isNoPreference(staff: StaffMember | null): boolean {
  return staff?.id === NO_PREFERENCE_STAFF.id;
}

// Staff eligible for a given service — used to filter BookingStaffStep.
export function getEligibleStaff(serviceId: string): StaffMember[] {
  return STAFF.filter((member) => member.serviceIds.includes(serviceId));
}

// Every slot start time offered in a working day: 9:00 AM to 4:30 PM in
// 30-minute increments (last appointment starts at 4:30 so even a
// 30-min service finishes by 5:00 PM close).
export const ALL_TIME_SLOTS: string[] = (() => {
  const slots: string[] = [];
  let hour = 9;
  let minute = 0;
  while (hour < 17) {
    const period = hour >= 12 ? "PM" : "AM";
    const displayHour = hour > 12 ? hour - 12 : hour;
    const displayMinute = minute === 0 ? "00" : `${minute}`;
    slots.push(`${displayHour}:${displayMinute} ${period}`);
    minute += 30;
    if (minute === 60) {
      minute = 0;
      hour += 1;
    }
  }
  return slots;
})();

// Small deterministic pseudo-random generator seeded from a string, so
// the same date + staff combination always produces the same set of
// unavailable slots. Plain Math.random() here would make availability
// flicker on every re-render and quietly break back/forward navigation
// (a previously-selected time could "vanish" for no visible reason).
function seededRandom(seed: string): () => number {
  let h = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return function next() {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  };
}

// Returns the AVAILABLE time slots (a subset of ALL_TIME_SLOTS) for a
// given date + staff combination. Deterministic: calling this again
// with the same arguments always returns the same result, so browsing
// back and forth never changes availability out from under the user.
export function generateTimeSlots(date: string, staffId: string): string[] {
  const rand = seededRandom(`${date}|${staffId}`);
  return ALL_TIME_SLOTS.filter(() => rand() > 0.35);
}
