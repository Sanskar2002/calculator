document.addEventListener("DOMContentLoaded", function () {
  const display = document.getElementById("display");
  const buttons = document.querySelectorAll(".key");

  //saves in the browser's local storag
  if (localStorage.getItem("calcDisplay")) {
    display.value = localStorage.getItem("calcDisplay");
  }

  function handleButtonClick(value) {
    if (!display) return; // Ensure the display element exists

    if (value === "Enter") {
      calculateResult();
    } else if (value === "Bksp") {
      display.value = display.value.slice(0, -1); // Remove last character
    }else if (value === "Del") {  // Pressing "Esc" clears the display
        clearDisplay(); 
    }else {
      display.value += value; // Append key to display
    }

    localStorage.setItem("calcDisplay", display.value);
  }


  // Add event listeners to all buttons
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      handleButtonClick(button.innerText);
    });
  });

  // Handle keyboard events
  document.addEventListener("keydown", function (event) {
    const key = event.key;

    if (key === "Enter") {
      event.preventDefault();
      calculateResult();
    } else if (key === "Backspace") {
      display.value = display.value.slice(0, -1);
    } else if (key === "delete") {
      clearDisplay();
    } else if ("0123456789/*-+%.".includes(key)) {
      display.value += key;
    }
  });

  // Function to calculate the result
  function calculateResult() {
    try {
      //let expression = display.value.replace("^", "**"); // Handle power operator
      display.value = eval(display.value);
      localStorage.setItem("calcDisplay", display.value);
    } catch (error) {
      display.value = "Error";
    }
  }

  function clearDisplay() {
    display.value = "";
    localStorage.removeItem("calcDisplay");
  }
});
