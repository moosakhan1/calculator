document.addEventListener("DOMContentLoaded", () => {
  const result = document.getElementById("result");
  const buttons = document.querySelectorAll("button");

  let currentInput = "";
  let currentOperator = "";
  let previousInput = "";

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.textContent;
      const action = button.dataset.action;

      if (!action) {
        appendNumber(value);
      } else {
        handleAction(action);
      }

      updateDisplay();
    });
  });

  function appendNumber(number) {
    currentInput += number;
  }

  function handleAction(action) {
    switch (action) {
      case "clear":
        clear();
        break;
      case "backspace":
        backspace();
        break;
      case "calculate":
        calculate();
        break;
      case "percent":
        percent();
        break;
      case "sin":
      case "cos":
      case "tan":
      case "log":
      case "ln":
      case "sqrt":
      case "abs":
        scientificOperation(action);
        break;
      case "power":
        setOperator("^");
        break;
      case "pi":
        currentInput = Math.PI.toString();
        break;
      case "e":
        currentInput = Math.E.toString();
        break;
      case "factorial":
        factorial();
        break;
      default:
        setOperator(action);
    }
  }

  function clear() {
    currentInput = "";
    currentOperator = "";
    previousInput = "";
  }

  function backspace() {
    currentInput = currentInput.slice(0, -1);
  }

  function setOperator(operator) {
    if (currentInput) {
      if (previousInput) {
        calculate();
      }
      previousInput = currentInput;
      currentInput = "";
      currentOperator = operator;
    }
  }

  function calculate() {
    if (previousInput && currentInput && currentOperator) {
      const prev = parseFloat(previousInput);
      const current = parseFloat(currentInput);
      let result;

      switch (currentOperator) {
        case "add":
          result = prev + current;
          break;
        case "subtract":
          result = prev - current;
          break;
        case "multiply":
          result = prev * current;
          break;
        case "divide":
          result = prev / current;
          break;
        case "^":
          result = Math.pow(prev, current);
          break;
      }

      currentInput = result.toString();
      previousInput = "";
      currentOperator = "";
    }
  }

  function percent() {
    if (currentInput) {
      currentInput = (parseFloat(currentInput) / 100).toString();
    }
  }

  function scientificOperation(operation) {
    if (currentInput) {
      const value = parseFloat(currentInput);
      let result;

      switch (operation) {
        case "sin":
          result = Math.sin(value);
          break;
        case "cos":
          result = Math.cos(value);
          break;
        case "tan":
          result = Math.tan(value);
          break;
        case "log":
          result = Math.log10(value);
          break;
        case "ln":
          result = Math.log(value);
          break;
        case "sqrt":
          result = Math.sqrt(value);
          break;
        case "abs":
          result = Math.abs(value);
          break;
      }

      currentInput = result.toString();
    }
  }

  function factorial() {
    if (currentInput) {
      const value = parseInt(currentInput);
      let result = 1;

      for (let i = 2; i <= value; i++) {
        result *= i;
      }

      currentInput = result.toString();
    }
  }

  function updateDisplay() {
    result.value = currentInput || "0";
  }

  // Add dark mode toggle functionality
  const darkModeToggle = document.createElement("button");
  darkModeToggle.textContent = "Toggle Dark Mode";
  darkModeToggle.style.position = "absolute";
  darkModeToggle.style.top = "10px";
  darkModeToggle.style.right = "10px";
  document.body.appendChild(darkModeToggle);

  darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });
});
