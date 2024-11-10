import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Container from "@mui/material/Container";
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
import {useTodos, useTodosDispatch} from "../context/todosContext";
export default function TodoList() {
    const  todos = useTodos();
    const  dispatch = useTodosDispatch();
    const { showHideToast } = useToast();
    const [titleError, setTitleError] = useState(false);
    const [showUpdateDialog, setShowUpdateDialog] = useState(false);
    const [dialogTodo, setDialogTodo] = useState(null);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const [displayedTodosType, setDisplayedTodosType] = useState("all");
    const [titleInput, setTitleInput] = useState("");

    //function of filter buttons
    const completedTodos = useMemo(() => {
        return todos.filter((t) => t.isCompleted);
    }, [todos]);

    const notCompletedTodos = useMemo(() => {
        return todos.filter((t) => !t.isCompleted);
    }, [todos]);

    let todosToBeRendered = todos;

    if (displayedTodosType == "completed") {
        todosToBeRendered = completedTodos;
    } else if (displayedTodosType == "non-completed") {
        todosToBeRendered = notCompletedTodos;
    } else {
        todosToBeRendered = todos;
    }

    const todosJsx = todosToBeRendered.map((t) => {
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

    //useEffect hook
    useEffect(() => {
        dispatch({
            type: "get",
        });
    }, []);

    //function of add button
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

    //function of delete dialog
    const handleDeleteDialogClose = () => {
        setShowDeleteDialog(false);
    };
    //functions of delete icon button
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
        if (!dialogTodo.title.trim()) {
            setTitleError(true);
        }
        setShowDeleteDialog(false);
        showHideToast("تم الحذف بنجاح");
    }
    /*===============================================================================*/
    //function of update dialog
    const handleUpdateClose = () => {
        setShowUpdateDialog(false);
    };

    //functions of update icon button
    function openUpdateDialog(todo) {
        setDialogTodo({
            title: todo.title,
            details: todo.details,
            id: todo.id,
        });
        setShowUpdateDialog(true);
        setTitleError(false);
        setDialogTodo(todo);
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
        if (!dialogTodo.title.trim()) {
            setTitleError(true);
        }
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
                sx={{ direction: "rtl" }}
            >
                <DialogTitle id="alert-dialog-title">
                    هل انت متأكد من حذف المهمة ؟
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        لا يمكن التراجع عن الحذف بعد إتمامه
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteDialogClose}>إغلاق</Button>
                    <Button onClick={handleDeleteConfirm} autoFocus>
                        نعم
                    </Button>
                </DialogActions>
            </Dialog>
            {/* end delete dialog */}
            {/*==============================================================================*/}
            {/* start update dialog */}
            <Dialog
                open={showUpdateDialog}
                onClose={handleUpdateClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{ direction: "rtl" }}
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
                            setTitleError(false);
                        }}
                        error={titleError}
                        helperText={titleError ? "يرجى إدخال عنوان المهمة" : ""}
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
                    <Button onClick={handleUpdateClose}>إغلاق</Button>
                    <Button onClick={handleUpdateConfirm} autoFocus>
                        تأكيد
                    </Button>
                </DialogActions>
            </Dialog>
            {/* end update dialog */}
            <Container maxWidth="lg">
                <Card sx={{ minWidth: 275, height: "95vh", overflowY: "auto" }}>
                    <CardContent>
                        <Typography variant="h2">مهامي</Typography>
                        <Divider />
                        {/* start filter buttons */}
                        <ToggleButtonGroup
                            value={displayedTodosType}
                            exclusive
                            onChange={changeDisplayedType}
                            aria-label="text alignment"
                            sx={{ direction: "ltr", mt: 4 }}
                        >
                            <ToggleButton value="non-completed">
                                غير منجز
                            </ToggleButton>
                            <ToggleButton value="completed">منجز</ToggleButton>
                            <ToggleButton value="all">الكل</ToggleButton>
                        </ToggleButtonGroup>
                        {/* end filter buttons */}
                        {/* start list of todos */}
                        {todosJsx}
                        {/* end list of todos */}
                        {/* start input field and add button */}
                        <Grid
                            container
                            spacing={2}
                            sx={{
                                mt: 5,
                                position: "sticky",
                                bottom: 0,
                                bgcolor: "white",
                            }}
                        >
                            <Grid size={8} sx={{ my: 1 }}>
                                <TextField
                                    id="outlined-basic"
                                    label="عنوان المهمة"
                                    variant="outlined"
                                    sx={{ width: "100%" }}
                                    value={titleInput}
                                    onChange={(e) => {
                                        setTitleInput(e.target.value);
                                    }}
                                />
                            </Grid>
                            <Grid size={4} sx={{ my: 1 }}>
                                <Button
                                    variant="contained"
                                    sx={{
                                        width: "100%",
                                        height: "100%",
                                        bgcolor: "rgb(158 88 202)",
                                    }}
                                    onClick={handleAddClick}
                                    disabled={!titleInput.trim()}
                                >
                                    إضافة
                                </Button>
                            </Grid>
                        </Grid>
                        {/* end input field and add button */}
                    </CardContent>
                </Card>
            </Container>
        </>
    );
}
