export async function addTaskApi({title, description}) {
  let data;
  try {
    console.log(' post api called ')
    const response = await fetch("http://127.0.0.1:8000/api/tasks/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',  // Sending JSON data
      },
      body: JSON.stringify({title, description}),  // Convert data to JSON string
    }); // Replace with your actual API URL
    data = await response.json();
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw new Error("Error while fetching the data");
  }
  return data;
}
