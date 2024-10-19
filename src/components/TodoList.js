import * as React from "react";
import Container from "@mui/material/Container";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import Todo from "./Todo";

import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { useState, useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { TodosContext } from "../context/todosContext";

export default function TodoList() {
    const [displayedTodosType, setDisplayedTodosType] = useState("all");
    const { todos, setTodos } = useContext(TodosContext);
    const [titleInput, setTitleInput] = useState("");

    // filtration arrays
    const completedTodos = todos.filter((t) => t.isCompleted);

    const notCompletedTodos = todos.filter((t) => !t.isCompleted);

    let todosToBeRendered = todos;

    if (displayedTodosType == "completed") {
        todosToBeRendered = completedTodos;
    } else if (displayedTodosType == "non-completed") {
        todosToBeRendered = notCompletedTodos;
    } else {
        todosToBeRendered = todos;
    }

    const todoJsx = todosToBeRendered.map((t) => {
        return <Todo key={t.id} todo={t} />;
    });

    function changeDisplayedType(e) {
        setDisplayedTodosType(e.target.value);
    }

    useEffect(() => {
        const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
        setTodos(storageTodos);
    }, []);

    function handleAddClick() {
        const newTodo = {
            id: uuidv4(),
            title: titleInput,
            details: "",
            isCompleted: false,
        };
        const updatedTodos = [...todos, newTodo];
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        setTitleInput("");
    }

    return (
        <Container maxWidth="sm">
            <Card sx={{ minWidth: 275, maxHeight: "90vh", overflowY: "auto" }}>
                <CardContent>
                    <Typography
                        gutterBottom
                        variant="h2"
                        style={{ fontWeight: "bold", marginBottom: "0px" }}
                    >
                        مهامي
                    </Typography>
                    <Divider />
                    {/* start filter buttons */}
                    <ToggleButtonGroup
                        value={displayedTodosType}
                        exclusive
                        onChange={changeDisplayedType}
                        aria-label="text alignment"
                        style={{ direction: "ltr", marginTop: "30px" }}
                    >
                        <ToggleButton value="non-completed">
                            غير منجز
                        </ToggleButton>
                        <ToggleButton value="completed">منجز</ToggleButton>
                        <ToggleButton value="all">الكل</ToggleButton>
                    </ToggleButtonGroup>
                    {/* end filter buttons */}
                    {/* start list of todos */}
                    {todoJsx}
                    {/* end list of todos */}

                    {/* input filed and add button */}
                    <Grid
                        container
                        spacing={2}
                        sx={{
                            mt: 2,
                            position: "sticky",
                            bottom: "0",
                            backgroundColor: "white",
                            p: 1
                        }}
                    >
                        <Grid
                            size={8}
                            display="flex"
                            justifyContent="space-around"
                            alignItems="center"
                        >
                            <TextField
                                id="outlined-basic"
                                label="عنوان المهمة"
                                variant="outlined"
                                style={{ width: "100%" }}
                                value={titleInput}
                                onChange={(e) => {
                                    setTitleInput(e.target.value);
                                }}
                            />
                        </Grid>
                        <Grid
                            size={4}
                            display="flex"
                            justifyContent="space-around"
                            alignItems="center"
                        >
                            <Button
                                variant="contained"
                                style={{ width: "100%", height: "100%" }}
                                onClick={handleAddClick}
                                disabled={titleInput.length == 0}
                            >
                                إضافة
                            </Button>
                        </Grid>
                    </Grid>
                    {/* end filed and add button */}
                </CardContent>
            </Card>
        </Container>
    );
}
