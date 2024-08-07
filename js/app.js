class Item {
  constructor(text) {
    this.id = this.generateUUID();
    this.text = text;
    this.isChecked = false;
  }

  generateUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }
}

class App {
  constructor() {
    this.items = JSON.parse(localStorage.getItem("items")) || [];
    this.form = document.getElementById("myForm");
    this.inputField = document.getElementById("inputField");
    this.resultBox = document.getElementById("resultBox");

    this.form.addEventListener("submit", this.addItem.bind(this));
    this.renderItems();
  }

  addItem(event) {
    event.preventDefault();
    const text = this.inputField.value.trim();
    if (text) {
      const newItem = new Item(text);
      this.items.push(newItem);
      this.saveItems();
      this.renderItems();
      this.inputField.value = "";
    }
  }

  saveItems() {
    localStorage.setItem("items", JSON.stringify(this.items));
  }

  deleteItem(id) {
    this.items = this.items.filter((item) => item.id !== id);
    this.saveItems();
    this.renderItems();
  }

  toggleCheck(id) {
    const item = this.items.find((item) => item.id === id);
    if (item) {
      item.isChecked = !item.isChecked;
      this.saveItems();
      this.renderItems();
    }
  }

  renderItems() {
    this.resultBox.innerHTML = "";
    this.items.forEach((item) => {
      const itemDiv = document.createElement("div");
      itemDiv.className = `flex items-center bg-gray-100 p-2 mb-2 rounded ${
        item.isChecked ? "line-through" : ""
      }`;
      itemDiv.innerHTML = `
                <span class="flex-grow ${
                  item.isChecked ? "line-through" : ""
                }">${item.text}</span>
                <button class="trash-btn bg-red-500 text-white p-2 rounded mr-2">Trash</button>
                <button class="check-btn bg-green-500 text-white p-2 rounded">Check</button>
            `;

      itemDiv
        .querySelector(".trash-btn")
        .addEventListener("click", () => this.deleteItem(item.id));
      itemDiv
        .querySelector(".check-btn")
        .addEventListener("click", () => this.toggleCheck(item.id));
      this.resultBox.appendChild(itemDiv);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new App();
});
