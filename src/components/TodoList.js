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

import { useState, useEffect, useMemo } from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { useToast } from "../context/ToastContext";
import { useTodos, useTodosDispatch } from "../context/todosContext";

export default function TodoList() {
    const todos = useTodos();
    const dispatch = useTodosDispatch();
    const { showHideToast } = useToast();
    const [showUpdateDialog, setShowUpdateDialog] = useState(false);
    const [dialogTodo, setDialogTodo] = useState(null);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [displayedTodosType, setDisplayedTodosType] = useState("all");
    const [titleInput, setTitleInput] = useState("");

    // filtration arrays

    const completedTodos = useMemo(() => {
        return todos.filter((t) => {
            return t.isCompleted;
        });
    }, [todos]);

    const notCompletedTodos = useMemo(() => {
        return todos.filter((t) => {
            return !t.isCompleted;
        });
    }, [todos]);

    let todosToBeRendered = todos;

    if (displayedTodosType == "completed") {
        todosToBeRendered = completedTodos;
    } else if (displayedTodosType == "non-completed") {
        todosToBeRendered = notCompletedTodos;
    } else {
        todosToBeRendered = todos;
    }

    const todoJsx = todosToBeRendered.map((t) => {
        return (
            <Todo
                key={t.id}
                todo={t}
                showDelete={openDeleteDialog}
                showUpdate={openUpdateDialog}
            />
        );
    });

    function changeDisplayedType(e) {
        setDisplayedTodosType(e.target.value);
    }

    useEffect(() => {
        dispatch({ type: "get" });
    }, []);

    function handleAddClick() {
        dispatch({
            type: "added",
            payload: {
                newTitle: titleInput,
            },
        });
        setTitleInput("");
        showHideToast("تمت الإضافة بنجاح");
    }

    function handleDeleteDialogClose() {
        setShowDeleteDialog(false);
    }

    function openDeleteDialog(todo) {
        setDialogTodo(todo);
        setShowDeleteDialog(true);
    }

    function handleDeleteConfirm() {
        dispatch({
            type: "deleted",
            payload: {
                id: dialogTodo.id,
            },
        });
        setShowDeleteDialog(false);
        showHideToast("تم الحذف بنجاح");
    }

    function handleUpdateClose() {
        setShowUpdateDialog(false);
    }

    function openUpdateDialog(todo) {
        setDialogTodo(todo);
        setShowUpdateDialog(true);
    }

    function handleUpdateConfirm() {
        dispatch({
            type: "updated",
            payload: {
                id: dialogTodo.id,
                title: dialogTodo.title,
                details: dialogTodo.details,
            },
        });
        setShowUpdateDialog(false);
        showHideToast("تم التحديث بنجاح");
    }

    return (
        <>
            {/* start delete dialog */}
            <Dialog
                open={showDeleteDialog}
                onClose={handleDeleteDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                style={{ direction: "rtl" }}
            >
                <DialogTitle id="alert-dialog-title">
                    هل أنت متأكد من حذف المهمة ؟
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        لا يمكنك التراجع عن الحذف بعد إتمامه
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteDialogClose}>إغلاق</Button>
                    <Button autoFocus onClick={handleDeleteConfirm}>
                        حذف
                    </Button>
                </DialogActions>
            </Dialog>
            {/* end delete dialog */}
            {/* start update dialog */}
            <Dialog
                open={showUpdateDialog}
                onClose={handleUpdateClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                style={{ direction: "rtl" }}
            >
                <DialogTitle id="alert-dialog-title">تعديل المهمة</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        label="عنوان المهمة"
                        fullWidth
                        variant="standard"
                        value={dialogTodo ? dialogTodo.title : ""}
                        onChange={(e) => {
                            setDialogTodo({
                                ...dialogTodo,
                                title: e.target.value,
                            });
                        }}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="التفاصيل"
                        fullWidth
                        variant="standard"
                        value={dialogTodo ? dialogTodo.details : ""}
                        onChange={(e) => {
                            setDialogTodo({
                                ...dialogTodo,
                                details: e.target.value,
                            });
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleUpdateClose}>إلغاء</Button>
                    <Button autoFocus onClick={handleUpdateConfirm}>
                        تعديل
                    </Button>
                </DialogActions>
            </Dialog>
            {/* end update dialog */}
            <Container maxWidth="sm">
                <Card
                    sx={{ minWidth: 275, maxHeight: "90vh", overflowY: "auto" }}
                >
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
                                p: 1,
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
        </>
    );
}
