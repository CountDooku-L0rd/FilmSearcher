import { toast } from "react-hot-toast";
import { SuccessToastIcon } from "../icons/SuccessToastIcon";
import { ErrorToastIcon } from "../icons/ErrorToastIcon";
export const showSuccessToast = (message: string) => {
  toast.success(message, {
    duration: 4000,
    position: "top-right",

    icon: SuccessToastIcon(),

    style: {
      width: "300px",
      minHeight: "54px",
      background: "#FFFFFF",
      color: "#1E1E1E",
      borderRadius: "8px",
      padding: "16px",
      fontSize: "16px",
      fontWeight: "600",
      lineHeight: "140%",
      border: "1px solid #757575",
    },

    iconTheme: {
      primary: "#10B981",
      secondary: "#FFFFFF",
    },
  });
};

export const showErrorToast = (message: string) => {
  toast.error(message, {
    duration: 5000,
    position: "top-right",

    icon: ErrorToastIcon(),

    style: {
      width: "300px",
      minHeight: "54px",
      background: "#FEE9E7",
      color: "#900B09",
      borderRadius: "8px",
      padding: "16px",
      fontSize: "16px",
      fontWeight: "600",
      lineHeight: "140%",
      border: "1px solid #EC221F",
    },

    iconTheme: {
      primary: "#EF4444",
      secondary: "#FFFFFF",
    },
  });
};
