document.addEventListener("DOMContentLoaded", function () {
  const navButtons = document.querySelectorAll(".nav-button");
  const todoLists = document.querySelectorAll(".todo-list");

  navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const status = button.dataset.status;
      const todoItem = button.parentElement;
      console.log("todoLists:", todoLists);
      console.log("status:", status);
      // Find the target todo list
      let targetTodoList;
      todoLists.forEach((list) => {
        const card = list.parentNode; // get the parent .card element
        const cardHeader = card.querySelector(".card-header");
        console.log("cardHeader textContent:", cardHeader.textContent);

        if (
          cardHeader &&
          cardHeader.textContent.trim().toLowerCase() === status.toLowerCase()
        ) {
          targetTodoList = list;
        }
      });

      if (targetTodoList) {
        // Move the todo item to the target list
        targetTodoList.appendChild(todoItem);

        // Update button states
        updateButtonStates();
      } else {
        console.error(`No target todo list found for status ${status}`);
      }
    });
  });

  function updateButtonStates() {
    // Disable left navigation button on Backlog card
    todoLists[0]
      .querySelectorAll('.nav-button[data-status="backlog"]')
      .forEach((button) => {
        button.classList.add("disabled");
        button.disabled = true;
      });

    // Disable right navigation button on Done card
    todoLists[todoLists.length - 1]
      .querySelectorAll('.nav-button[data-status="done"]')
      .forEach((button) => {
        button.classList.add("disabled");
        button.disabled = true;
      });

    // Enable all other navigation buttons
    todoLists.forEach((list, index) => {
      if (index !== 0 && index !== todoLists.length - 1) {
        list.querySelectorAll(".nav-button").forEach((button) => {
          button.classList.remove("disabled");
          button.disabled = false;
        });
      }
    });
  }

  // Initial button state update
  updateButtonStates();
});
