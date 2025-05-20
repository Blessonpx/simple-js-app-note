function changeMessage() {
  const title = document.getElementById('title');
  title.textContent="Message changed using js";
}

function showQuillContent(){
  const editorContent = quill.getContents();
  console.log(editorContent);
}

function makeApiCall() {
  const content = quill.getText(); // or use quill.root.innerHTML for HTML
  console.log(content);
  fetch('http://localhost:9002/quill/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ insert: content.trim() })
  })
  .then(response => response.json())
  .then(data => {
    if (data.Message === "Recieved") {
      document.getElementById('api-status').textContent = "received";
    } else {
      document.getElementById('api-status').textContent = "Unexpected response";
    }
  })
  .catch(error => {
    console.error("API call failed:", error);
    document.getElementById('api-status').textContent = "Error occurred";
  });
}



function addRow() {
  const container = document.getElementById('configAdder');

  const row = document.createElement('div');
  row.className = 'row';

  // Dropdown
  const select = document.createElement('select');
  ['Option 1', 'Option 2', 'Option 3'].forEach(optionText => {
    const option = document.createElement('option');
    option.value = optionText;
    option.textContent = optionText;
    select.appendChild(option);
  });

  // Textbox
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Enter value';
  // Remove Button
  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Remove';
  removeBtn.onclick = () => row.remove();
  // Append all to row
  row.appendChild(select);
  row.appendChild(input);
  row.appendChild(removeBtn);
  container.appendChild(row);
}
