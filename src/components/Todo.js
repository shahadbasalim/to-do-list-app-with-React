import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useContext, useState } from "react";
import { TodosContext } from "../context/todosContext";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

export default function Todo({ todo, handleCheck }) {
    const [showUpdateDialog, setShowUpdateDialog] = useState(false);
    const [updatedTodo, setUpdatedTodo] = useState({
        title: todo.title,
        details: todo.details,
    });

    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const { todos, setTodos } = useContext(TodosContext);

    function handleCheckClick() {
        const updatedTodos = todos.map((t) => {
            if (t.id == todo.id) {
                t.isCompleted = !t.isCompleted;
            }
            return t;
        });
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
    }

    function handleDeleteClick() {
        setShowDeleteDialog(true);
    }

    function handleDeleteDialogClose() {
        setShowDeleteDialog(false);
    }

    function handleDeleteConfirm() {
        const updatedTodos = todos.filter((t) => t.id != todo.id);
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
    }

    function handleUpdateClick() {
        setShowUpdateDialog(true);
    }

    function handleUpdateClose() {
        setShowUpdateDialog(false);
    }

    function handleUpdateConfirm() {
        const updatedTodos = todos.map((t) => {
            if (t.id == todo.id) {
                return {
                    ...t,
                    title: updatedTodo.title,
                    details: updatedTodo.details,
                };
            } else {
                return t;
            }
        });
        setTodos(updatedTodos);
        setShowUpdateDialog(false);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
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
            {/* ================================================= */}
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
                        value={updatedTodo.title}
                        onChange={(e) => {
                            setUpdatedTodo({
                                ...updatedTodo,
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
                        value={updatedTodo.details}
                        onChange={(e) => {
                            setUpdatedTodo({
                                ...updatedTodo,
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
            <Card
                sx={{
                    minWidth: 275,
                    background: "#283593",
                    color: "white",
                    mt: 1,
                    minHeight: "70px",
                }}
                className="todo-card"
            >
                <CardContent style={{ padding: "10px" }}>
                    <Grid container spacing={2}>
                        <Grid
                            size={8}
                            style={{
                                wordWrap: "break-word",
                                overflowWrap: "break-word",
                            }}
                        >
                            <Typography
                                variant="h5"
                                sx={{
                                    textAlign: "right",
                                    fontSize: "20px",
                                    textDecoration: todo.isCompleted
                                        ? "line-through"
                                        : "none",
                                }}
                            >
                                {todo.title}
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{ textAlign: "right", fontSize: "15px" }}
                            >
                                {todo.details}
                            </Typography>
                        </Grid>
                        <Grid
                            size={4}
                            display="flex"
                            justifyContent="space-around"
                            alignItems="center"
                        >
                            <IconButton
                                aria-label="delete"
                                sx={{
                                    background: todo.isCompleted
                                        ? "#8bc34a"
                                        : "white",
                                    color: todo.isCompleted
                                        ? "white"
                                        : "#8bc34a",
                                    border: "3px solid #8bc34a",
                                }}
                                className="IconButton"
                                onClick={handleCheckClick}
                            >
                                <CheckIcon />
                            </IconButton>
                            <IconButton
                                aria-label="delete"
                                sx={{
                                    background: "white",
                                    color: "#ce93d8",
                                    border: "3px solid #ce93d8",
                                }}
                                className="IconButton"
                                onClick={handleUpdateClick}
                            >
                                <EditOutlinedIcon />
                            </IconButton>
                            <IconButton
                                aria-label="delete"
                                sx={{
                                    background: "white",
                                    color: "#b23c17",
                                    border: "3px solid #b23c17",
                                }}
                                className="IconButton"
                                onClick={handleDeleteClick}
                            >
                                <DeleteOutlineOutlinedIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </>
    );
}
