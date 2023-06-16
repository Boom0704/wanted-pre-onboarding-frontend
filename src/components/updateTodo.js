import axios from "axios";

async function updateTodo(data) {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `https://www.pre-onboarding-selection-task.shop/todos/${data.id}`,
      {
        todo: data.todo,
        isCompleted: data.isCompleted,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}
export { updateTodo };
