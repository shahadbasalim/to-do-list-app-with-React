import { createContext, useState, useContext } from "react";
import MySnackBar from "./MySnackBar";
const ToastContext = createContext({});

export const ToastProvider = ({ children }) => {
    const [message, setMessage] = useState("");
    const [open, setOpen] = useState(false);

    function showHideToast(message) {
        setOpen(true);
        setMessage(message);
        setTimeout(() => {
            setOpen(false);
        }, 2000);
    }

    return (
        <ToastContext.Provider value={{ showHideToast }}>
            <MySnackBar open={open} message={message} />
            {children}
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    return useContext(ToastContext);
} 