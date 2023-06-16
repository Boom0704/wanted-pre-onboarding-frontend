import axios from "axios";

const createTodo = async (newTodo) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          "https://www.pre-onboarding-selection-task.shop/todos",
          {
            todo: newTodo,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      } catch (error) {
        console.log(error);
      }
};

export { createTodo };