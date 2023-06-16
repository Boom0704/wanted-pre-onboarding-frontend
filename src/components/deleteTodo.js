import axios from "axios";

async function deleteTodo(data) {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(
      `https://www.pre-onboarding-selection-task.shop/todos/${data.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}
export { deleteTodo };
