import { Orders, Samples } from "pages/BD/types";
import { Employee } from "pages/HRandAdmin/types";

export interface LabAction {
  lab: {
    loading: true;
    error?: {};
    sampleAllocationPending: Orders[];
    labStaff: Employee[];
  };
}
