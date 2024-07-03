document.addEventListener("DOMContentLoaded", function () {
    const sliderRange = document.getElementById("sliderRange");
    const sliderValue = document.getElementById("sliderValue");
  
    const checkboxUppercase = document.getElementById("uppercase");
    const checkboxLowercase = document.getElementById("lowercase");
    const checkboxNumbers = document.getElementById("numbers");
    const checkboxSymbols = document.getElementById("symbols");
  
    const generatedPassword = document.getElementById("generatedPassword");
    const generateButton = document.getElementById("generateButton");
    const copyPassword = document.getElementById("copyPassword");
    const levelIndicator = document.getElementById("levelIndicator");
    const divContainer = document.getElementById("divContainer");
  
    sliderRange.addEventListener("input", function () {
      sliderValue.textContent = this.value;
    });
  
    const generatePassword = () => {
      const length = parseInt(sliderRange.value);
      const includeUppercase = checkboxUppercase.checked;
      const includeLowercase = checkboxLowercase.checked;
      const includeNumbers = checkboxNumbers.checked;
      const includeSymbols = checkboxSymbols.checked;
  
      const Upercase = "QWERTYUIOPASDFGHJKLÑZXCVBNM";
      const lowercase = "qwertyuiopasdfghjklñzxcvbnm";
      const numbers = "1234567890";
      const symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-=\\";
  
      let allChars = "";
  
      if (includeUppercase) allChars += Upercase;
      if (includeLowercase) allChars += lowercase;
      if (includeNumbers) allChars += numbers;
      if (includeSymbols) allChars += symbols;
  
      if (allChars === "") {
        alert("Por favor selecciona al menos una opción de caracteres.");
        return "";
      }
  
      let password = "";
  
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allChars.length);
        password += allChars[randomIndex];
      }
      return password;
    };
  
   

    const copiarContenido = async () => {
        let texto = document.getElementById("generatedPassword").textContent;
        try {
          await navigator.clipboard.writeText(texto);
          console.log("Contenido copiado al portapapeles");
          showCopiedMessage(); // Mostrar el mensaje "¡Copiado!"
        } catch (err) {
          console.error("Error al copiar: ", err);
        }
      };
    
      const showCopiedMessage = () => {
        copiedMessage.classList.remove("hidden");
        setTimeout(() => {
          copiedMessage.classList.add("hidden");
        }, 2000); // Ocultar el mensaje después de 2 segundos
      };






  
    const updateStrengthText = () => {
      const lengthPassword = parseInt(sliderRange.value);
      let strength = "";
      let divClasses = [];
  
      if (lengthPassword >= 15) {
        strength = "STRONG";
        divClasses = ["level-strong", "level-strong", "level-strong", "level-strong"];
      } else if (lengthPassword >= 10) {
        strength = "MEDIUM";
        divClasses = ["level-medium", "level-medium", "level-medium", "level-cero"];
      } else if (lengthPassword >= 5) {
        strength = "WEAK";
        divClasses = ["level-weak", "level-weak", "level-cero", "level-cero"];
      } else {
        strength = "TOO WEAK!";
        divClasses = ["level-tooweak", "level-cero", "level-cero", "level-cero"];
      }
  
      updateLevelIndicatorText(strength);
      updateLevelIndicatorDivs(divClasses);
    };
  
    const updateLevelIndicatorText = (strengthLevel) => {
      levelIndicator.textContent = strengthLevel;
    };
  
    const updateLevelIndicatorDivs = (divClasses) => {
      divContainer.innerHTML = ""; // Limpiar el contenedor de divs antes de agregar nuevos
  
      divClasses.forEach(divClass => {
        const newDiv = document.createElement("div");
        newDiv.classList.add(divClass); // Añadir la clase CSS según la dificultad
        divContainer.appendChild(newDiv); // Agregar el div al contenedor
      });
    };
  
    // Event listener para actualizar el texto de fuerza cuando cambia el rango del slider
    sliderRange.addEventListener("input", () => {
      updateStrengthText();
    });
  
    // Event listener para generar la contraseña y actualizar la fuerza al hacer clic en el botón
    generateButton.addEventListener("click", () => {
      const newPassword = generatePassword();
      generatedPassword.textContent = newPassword;
      generatedPassword.classList.remove("text-gray-500");
      generatedPassword.classList.add("text-[#E6E5EA]");
      updateStrengthText(); // Actualiza la fuerza después de generar la contraseña
  
      copyPassword.addEventListener("click", copiarContenido);
     
    });
  });
  