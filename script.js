document.addEventListener("DOMContentLoaded", function () {
  const navButtons = document.querySelectorAll(".nav-button");
  const todoLists = document.querySelectorAll(".todo-list");

  navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const status = button.dataset.status;
      const todoItem = button.parentElement;
      const currentList = todoItem.parentNode;
      const currentIndex = Array.prototype.indexOf.call(todoLists, currentList);

      let targetIndex;
      if (status === "backlog") {
        targetIndex = 0;
      } else if (status === "todo") {
        targetIndex = 1;
      } else if (status === "ongoing") {
        targetIndex = 2;
      } else if (status === "done") {
        targetIndex = 3;
      }

      if (status === "backlog" && currentIndex === 1) {
        targetIndex = 0;
      } else if (status === "todo" && currentIndex === 0) {
        targetIndex = 1;
      } else if (status === "todo" && currentIndex === 2) {
        targetIndex = 1;
      } else if (status === "ongoing" && currentIndex === 1) {
        targetIndex = 2;
      } else if (status === "ongoing" && currentIndex === 3) {
        targetIndex = 2;
      } else if (status === "done" && currentIndex === 2) {
        targetIndex = 3;
      }

      if (targetIndex !== currentIndex) {
        // Remove the todo item from its original list
        currentList.removeChild(todoItem);

        // Move the todo item to the target list
        todoLists[targetIndex].appendChild(todoItem);

        // Update button states
        updateButtonStates();
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
