// Función para calcular la distancia de Levenshtein entre dos cadenas
function levenshteinDistance(a, b) {
    // Crear una matriz vacía
    const matrix = [];
  
    // Inicializar la primera columna de la matriz
    for (let i = 0; i <= b.length; i++) {
      // Cada posición de la columna inicial se establece como el índice de la fila
      matrix[i] = [i];
    }
  
    // Inicializar la primera fila de la matriz
    for (let j = 0; j <= a.length; j++) {
      // Cada posición de la fila inicial se establece como el índice de la columna
      matrix[0][j] = j;
    }
  
    // Llenar la matriz con los costos de las operaciones
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        // Si los caracteres son iguales, no hay costo adicional
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          // Copiar el valor diagonal
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          // Calcular el mínimo costo entre las tres operaciones posibles:
          // - Sustitución (diagonal)
          // - Inserción (izquierda)
          // - Eliminación (arriba)
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // Sustitución
            Math.min(
              matrix[i][j - 1] + 1, // Inserción
              matrix[i - 1][j] + 1 // Eliminación
            )
          );
        }
      }
    }
  
    // Devolver la distancia de Levenshtein entre las dos cadenas
    return matrix[b.length][a.length];
  }
  
  
  // Base de datos de nombres de usuario
  const usernames = [
    "Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Grace", "Hannah",
    "Isla", "Jack", "Katie", "Liam", "Mia", "Noah", "Olivia", "Paul", "Quinn",
    "Ryan", "Sophia", "Thomas", "Uma", "Violet", "Will", "Xander", "Yara",
    "Zoe", "Albert", "Bernard", "Catherine", "Derek", "Eliza", "Frederick",
    "Gabriel", "Harper", "Ivy", "James", "Kara", "Lucas", "Mason", "Natalie",
    "Owen", "Peyton", "Quincy", "Rebecca", "Samuel", "Tina", "Ulysses",
    "Victoria", "Walter", "Xena", "Yvonne", "Zachary"
  ];
  
  // Función para sugerir nombres similares
  function suggestSimilarNames(inputName) {
    const suggestions = usernames
      .map(name => ({ name, distance: levenshteinDistance(inputName, name) }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 1); // Devuelve las 3 sugerencias más similares
  
    return suggestions;
  }
  
  // Función para manejar el evento de sugerir nombres
  function suggestNames() {
    const input = document.getElementById('usernameInput').value;
    if (input.trim() === '') {
      document.getElementById('suggestions').textContent = 'Por favor, introduce un nombre de usuario.';
      return;
    }
  
    const suggestions = suggestSimilarNames(input);
    const suggestionsDiv = document.getElementById('suggestions');
    const historyList = document.getElementById('historyList');
  
    suggestionsDiv.innerHTML = '';
  
    if (suggestions.length > 0) {
      suggestions.forEach(suggestion => {
        const suggestionElement = document.createElement('div');
        suggestionElement.classList.add('suggestion');
        suggestionElement.textContent = `${suggestion.name} (Distancia: ${suggestion.distance})`;
        suggestionsDiv.appendChild(suggestionElement);
      });
  
      const historyItem = document.createElement('li');
      historyItem.textContent = input;
      historyList.appendChild(historyItem);
    } else {
      suggestionsDiv.textContent = 'No se encontraron sugerencias';
    }
  }
  
  // Función para alternar entre modo oscuro y claro
  function toggleMode() {
    document.body.classList.toggle('dark-mode');
  }
