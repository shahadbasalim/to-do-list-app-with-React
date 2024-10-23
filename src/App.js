import "./App.css";
import TodoList from "./components/TodoList";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { TodosContext } from "./context/todosContext";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { ToastProvider } from "./context/ToastContext";
import TodosProvider from "./context/todosContext";

const theme = createTheme({
    typography: {
        fontFamily: ["Alexandria"],
    },
    palette: {
        primary: {
            main: "#9e58ca",
        },
    },
});

const initialTodos = [
    {
        id: uuidv4(),
        title: "قراءة كتاب",
        details: "قراءة الشابتر الثالث من الكتاب",
        isCompleted: false,
    },
    {
        id: uuidv4(),
        title: "طبخ الاكل",
        details: "عمل وجبات الاسبوع كاملة",
        isCompleted: false,
    },
    {
        id: uuidv4(),
        title: "شراء مستلزمات المنزل",
        details: "الذهاب لمركز التسوق والسوبر ماركت",
        isCompleted: false,
    },
];
function App() {
    const [todos, setTodos] = useState(initialTodos);

    return (
        <ThemeProvider theme={theme}>
            <TodosProvider>
                <ToastProvider>
                    <div
                        className="App"
                        style={{
                            minHeight: "100vh",
                            backgroundColor: "rgb(223 222 226)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            direction: "rtl",
                        }}
                    >
                        <TodoList />
                    </div>
                </ToastProvider>
            </TodosProvider>
        </ThemeProvider>
    );
}

export default App;
