async function display_data() {
    const response = await fetch("http://localhost:3000/users");
    const data = await response.json();
  
    data.forEach((element) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${element.roll_no}</td>
        <td>${element.name}</td>
        <td>${element.branch}</td>
        <td align="center">
          <button onclick="delete_data('${element.id}')">Delete</button>
          <button onclick="edit_data('${element.id}')">Edit</button>  
        </td>
      `;
      document.getElementById("table_bdy").appendChild(row);
    });
  }
  
  function create_data() {
    fetch("http://localhost:3000/users", {
      method: "POST",
      body: JSON.stringify({
        roll_no: parseInt(document.getElementById("roll_no").value),
        name: document.getElementById("name").value,
        branch: document.getElementById("branch").value,
      }),
    });
  }
  
  function edit_data(id) {
    fetch(`http://localhost:3000/users/${id}`, {
        method: "PUT",
        body: JSON.stringify({
            id: id,
            roll_no: parseInt(document.getElementById("roll_no").value),
            name: document.getElementById("name").value,
            branch: document.getElementById("branch").value,
        }),
    });
}

  
  function delete_data(id) {
    fetch(`http://localhost:3000/users/${id}`, {
      method: "DELETE",
    });
  }
  
  async function searchData() {
    const rollNo = document.getElementById("rollNo").value;
    const response = await fetch(`http://localhost:3000/users`);
    const data = await response.json();
    const student = data.find(student => student.roll_no === parseInt(rollNo));
    document.getElementById("table_bdy_srch").innerHTML = ""
    if (student) {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${student.roll_no}</td>
        <td>${student.name}</td>
        <td>${student.branch}</td>
      `;
      document.getElementById("table_bdy_srch").appendChild(row);
    } else {
      alert("Student not found!");
    }
  }
  
  function check_Wheather() {
    let city = document.getElementById("c1").value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=85cb7c5db39c8b5c45a1d585a07ab6a5&units=metric`)
        .then(response => response.json())
        .then(data => document.getElementById("info").innerHTML = `Temperature at ${city} is ${data.main.temp}`)
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}
