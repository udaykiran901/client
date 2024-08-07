//Include Both Helper File with needed methods

import { postFakeProfile, postJwtProfile } from "../../../helpers/be_helpers";

// action
import {
  profileSuccess,
  profileError,
  resetProfileFlagChange,
} from "./reducer";

export const resetProfileFlag = () => {
  try {
    const response = resetProfileFlagChange();
    return response;
  } catch (error) {
    return error;
  }
};
