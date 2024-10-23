import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useTodosDispatch } from "../context/todosContext";
import { useToast } from "../context/ToastContext";

export default function Todo({ todo, showDelete, showUpdate }) {
    const dispatch = useTodosDispatch();

    const { showHideToast } = useToast();
    function handleCheckClick() {
        dispatch({
            type: "toggledCompleted",
            payload: {
                id: todo.id,
            },
        });
        showHideToast("تم التعديل بنجاح");
    }

    function handleDeleteClick() {
        showDelete(todo);
    }

    function handleUpdateClick() {
        showUpdate(todo);
    }

    return (
        <>
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
