import axios from "axios";

const getTodos = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      "https://www.pre-onboarding-selection-task.shop/todos",
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
};

export { getTodos };
