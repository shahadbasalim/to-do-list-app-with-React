import "./App.css";
import TodoList from "./components/TodoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import Box from "@mui/material/Box";
import { v4 as uuidv4 } from "uuid";
import { ToastProvider } from "./context/ToastContext";
import TodosProvider from "./context/todosContext";
let theme = createTheme({
    palette: {
        primary: {
            main: "#283593",
        },
        secondary: {
            main: "rgb(223 222 226)",
        },
    },
    typography: {
        fontFamily: ["Alexandria"],
        h2: {
            fontWeight: 700,
        },
    },
});

const initioalTodos = [
    {
        id: uuidv4(),
        title: "المهمة الأولى",
        details: "التفاصيل الخاصة بالمهمة الاولى",
        isCompleted: false,
    },
    {
        id: uuidv4(),
        title: "المهمة الثانية",
        details: "التفاصيل الخاصة بالمهمة الثانية",
        isCompleted: false,
    },
    {
        id: uuidv4(),
        title: "المهمة الثالثة",
        details: "التفاصيل الخاصة بالمهمة الثالثة",
        isCompleted: false,
    },
    {
        id: uuidv4(),
        title: "المهمة الرابعة",
        details: "التفاصيل الخاصة بالمهمة الرابعة",
        isCompleted: false,
    },
    {
        id: uuidv4(),
        title: "المهمة الخامسة",
        details: "التفاصيل الخاصة بالمهمة الخامسة",
        isCompleted: false,
    },
    {
        id: uuidv4(),
        title: "المهمة السادسة",
        details: "التفاصيل الخاصة بالمهمة السادسة",
        isCompleted: false,
    },
];
function App() {
    const [todos, setTodos] = useState(initioalTodos);
    return (
        <ThemeProvider theme={theme}>
            <TodosProvider>
                <ToastProvider>
                    <Box
                        className="App"
                        sx={{
                            height: "100vh",
                            bgcolor: theme.palette.secondary.main,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            direction: "rtl",
                        }}
                    >
                            <TodoList />
                    </Box>
                </ToastProvider>
            </TodosProvider>
        </ThemeProvider>
    );
}

export default App;
