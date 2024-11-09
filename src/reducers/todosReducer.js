import { v4 as uuidv4 } from "uuid";
export default function reducer(currentTodos, action) {
    switch (action.type) {
        case "added": {
            const newTodos = {
                id: uuidv4(),
                title: action.payload.newTitle,
                details: "",
                isCompleted: false,
            };
            const updatedTodos = [...currentTodos, newTodos];
            localStorage.setItem("todos", JSON.stringify(updatedTodos));
            return updatedTodos;
        }
        case "deleted": {
            const updatedTodos = currentTodos.filter(
                (t) => t.id != action.payload.id
            );
            localStorage.setItem("todos", JSON.stringify(updatedTodos));
            return updatedTodos;
        }
        case "updated": {
            const updatedTodos = currentTodos.map((t) => {
                if (t.id === action.payload.id) {
                    return {
                        ...t,
                        title: action.payload.title,
                        details: action.payload.details,
                    };
                } else {
                    return t;
                }
            });
            localStorage.setItem("todos", JSON.stringify(updatedTodos));
            return updatedTodos;
        }
        case "get": {
            const storageTodos =
                JSON.parse(localStorage.getItem("todos")) ?? [];
            return storageTodos;
        }
        case "toggleCompleted": {
            const updatedTodos = currentTodos.map((t) => {
                if (t.id == action.payload.id) {
                    const updatedTodo = {
                        ...t,
                        isCompleted: !t.isCompleted,
                    }
                    return updatedTodo;
                }
                return t;
            });
            localStorage.setItem("todos", JSON.stringify(updatedTodos));
            return updatedTodos;
        }
        default: {
            throw Error("unknown action" + action.type);
        }
    }
}
