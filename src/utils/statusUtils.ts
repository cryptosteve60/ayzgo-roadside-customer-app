import type { JobStatus } from "@/contexts/AppContext";

export function getStatusColor(status: JobStatus | string): string {
  switch (status) {
    case "requested":
    case "searching":
      return "bg-yellow-500";
    case "driver_assigned":
    case "accepted":
      return "bg-blue-500";
    case "driver_enroute":
    case "enroute":
      return "bg-blue-600";
    case "driver_arrived":
    case "arrived":
      return "bg-indigo-500";
    case "in_progress":
    case "inProgress":
      return "bg-purple-500";
    case "completed":
      return "bg-green-500";
    case "cancelled":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
}

export function getStatusText(status: JobStatus): string {
  switch (status) {
    case "requested":
      return "Request submitted - Finding helper";
    case "searching":
      return "Searching for nearby helpers";
    case "driver_assigned":
    case "accepted":
      return "Helper assigned to your request";
    case "driver_enroute":
    case "enroute":
      return "Helper is on the way";
    case "driver_arrived":
    case "arrived":
      return "Helper has arrived at your location";
    case "in_progress":
    case "inProgress":
      return "Service in progress";
    case "completed":
      return "Service completed successfully";
    case "cancelled":
      return "Request cancelled";
    default:
      return "Request status unknown";
  }
}

const POST_ASSIGNED_STATUSES: JobStatus[] = [
  "driver_assigned", "accepted",
  "driver_enroute", "enroute",
  "driver_arrived", "arrived",
  "in_progress", "inProgress",
  "completed",
];

const POST_ENROUTE_STATUSES: JobStatus[] = [
  "driver_enroute", "enroute",
  "driver_arrived", "arrived",
  "in_progress", "inProgress",
  "completed",
];

const POST_ARRIVED_STATUSES: JobStatus[] = [
  "driver_arrived", "arrived",
  "in_progress", "inProgress",
  "completed",
];

export function isHelperAssigned(status: JobStatus): boolean {
  return POST_ASSIGNED_STATUSES.includes(status);
}

export function isHelperEnRoute(status: JobStatus): boolean {
  return POST_ENROUTE_STATUSES.includes(status);
}

export function isHelperArrived(status: JobStatus): boolean {
  return POST_ARRIVED_STATUSES.includes(status);
}

export function isJobCompleted(status: JobStatus): boolean {
  return status === "completed";
}
