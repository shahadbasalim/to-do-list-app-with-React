import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import CheckIcon from "@mui/icons-material/Check";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import IconButton from "@mui/material/IconButton";
import { useToast } from "../context/ToastContext";
import { useTodosDispatch} from "../context/todosContext";
export default function Todo({ todo, showDelete, showUpdate }) {
    const dispatch = useTodosDispatch();
    const { showHideToast } = useToast();

    //function of check icon button
    function handleCheckClick() {
        dispatch({
            type: "toggleCompleted",
            payload: {
                id: todo.id,
            },
        })
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
                    bgcolor: (theme) => theme.palette.primary.main,
                    color: "white",
                    mt: 3,
                }}
            >
                <CardContent sx={{ px: { xs: 1, sm: 3 } }}>
                    <Grid container spacing={1} sx={{ textAlign: "right" }}>
                        <Grid
                            size={{ xs: 12, sm: 8 }}
                            style={{
                                wordWrap: "break-word",
                                overflow: "break-word",
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
                            size={{ xs: 12, sm: 4 }}
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            sx={{
                                marginRight: { sm: "auto" },
                                marginTop: { xs: 2 },
                                justifyContent: { xs: "space-around" },
                            }}
                        >
                            <IconButton
                                aria-label="delete"
                                sx={{
                                    bgcolor: todo.isCompleted
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
                                    bgcolor: "white",
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
                                    bgcolor: "white",
                                    color: "#b23c17",
                                    border: "3px solid #b23c17",
                                }}
                                className="IconButton"
                                onClick={handleDeleteClick}
                            >
                                <DeleteOutlineIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </>
    );
}
