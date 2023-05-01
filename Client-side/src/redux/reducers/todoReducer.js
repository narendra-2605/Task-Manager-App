import {
  GET_TODOS,
  ADD_TODO,
  DELETE_TODO,
  CLEAR_ALL_TODO,
  EDIT_TODO,
  UPDATE_TODO,
  MARK_COMPLETED,
  DELETE_USER_TODO
} from "../actions/actionTypes";

/**
 * this is the initialState for the reducer function
 */
const initialState = {
  todos: [],
  isEdit: false,
  editTodoId: "",
};
/**
 * 
 * @param {initialState} state 
 * @param {action} action 
 * @returns render initial state, (which is defined above) for the todo modification based on the input type of the action a perticular switch case will be executed.
 * And finally it will return the updated Todo state
 */
const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TODOS:
      return {
        ...state,
        todos: action.payload
      }
    case ADD_TODO:
      // console.log(action.payload);
      // console.log('This is the ADD_TODO Case : ', action.payload);
      // const { userId, id, title, description } = action.payload;
      return {
        ...state,
        todos: [
          ...state.todos,
          // {
          //   userId: userId,
          //   id: id,
          //   title: title,
          //   description: description,
          //   isCompleted: false,
          //   isPending: true,
          // },
        ],
        isEdit: action.isEdit,
      };
    case DELETE_TODO:
      const newTodoList = state.todos.filter((item) => item.id !== action.id);
      return {
        ...state,
        todos: newTodoList,
      };

    case EDIT_TODO:
      const editTodo = action.payload;
      let newEditTodo = state.todos.find((item) => item._id === editTodo);
      return {
        ...state,
        isEdit: action.isEdit,
        editTodo: newEditTodo,
      };

    case UPDATE_TODO:
      //  ***************** Below code is only for the update the Todos locally without using the database********************
      // const { todoId, todoTitle, todoDescription } = action.payload;
      // const { todoTitle, todoDescription } = action.payload;
      // const todos = state.todos.filter((todo) => {
      //   return todo.id !== todoId;
      // });

      // const todo = state.todos.find((todo) => todo?.id === todoId);
      // todo.title = todoTitle;
      // todo.description = todoDescription;
      // todo.isCompleted = todo?.isCompleted;
      // todo.isPending = todo?.isPending;
      // todos.push(todo);
      // ********************************************************
      return {
        ...state,
        // todos: [...todos],
        isEdit: false,
      };

    case MARK_COMPLETED:
      const { selectedTodoId } = action.payload;
      let allTodos = [];

      selectedTodoId?.forEach((id) => {
        allTodos = state.todos.filter((todo) => {
          return todo.id !== id;
        });

        const selectedTodo = state.todos.find((todo) => todo?.id === id);
        selectedTodo.title = selectedTodo?.title;
        selectedTodo.description = selectedTodo?.description;
        selectedTodo.isCompleted = true;
        selectedTodo.isPending = selectedTodo?.isPending;
        allTodos.push(selectedTodo);
      });

      return {
        ...state,
        todos: [...allTodos],
        isEdit: false,
      };

    case CLEAR_ALL_TODO:
      return {
        ...state,
        todos: [],
      };
    case DELETE_USER_TODO:
      return {
        ...state,
      }

    default:
      return state;
  }
};
export default todoReducer;