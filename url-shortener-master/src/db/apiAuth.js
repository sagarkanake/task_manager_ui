export async function addTaskApi({title, description}) {
  let data;
  try {
    const response = await fetch("https://demo0676561.mockable.io/tasks"); // Replace with your actual API URL
    data = await response.json();
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw new Error("Error while fetching the data");
  }
  return data;
}
