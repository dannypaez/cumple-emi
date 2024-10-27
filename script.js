let currentStep = 0;

const questions = [
    { 
        question: "En qué ciudad fue nuestra primera cita?", 
        answer: "machachi", 
        hint: "Me hiciste probar tus helados favoritos (ChesseCake de Maracuya)", 
        suggestion: "Me llevaste un sábado después de clase", 
        imageSrc: "FotoHelados1.jpeg" 
    },
    { 
        question: "¿Cuál fue la primera película que vimos juntos?", 
        answer: "willy wonka", 
        hint: "Y fue la primera vez que los dos fuimos a una sala VIP", 
        suggestion: "Fue una película musical", 
        imageSrc: "Cine.jpeg" 
    },
    { 
        question: "¿En qué fecha comenzamos nuestra relación (dd/mm/aa)?", 
        answer: "09/08/24", 
        hint: "Y fue en la Puerto Lopez, ahí oficializamos nuestra relación", 
        suggestion: "Hemos tenido muchas fechas no oficiales, pero ya tenemos nuestra fecha oficial", 
        imageSrc: "FechaOficial.jpeg" 
    },
    { 
        question: "¿Cuál es el nombre de nuestra canción especial?", 
        answer: "primera cita", 
        hint: "Desde que nos conocimos fue nuestra canción", 
        suggestion: "Es la primera canción que me dedicaste", 
        imageSrc: "Fiesta.jpeg" 
    },
    { 
        question: "¿Dónde fue nuestro primer viaje juntos?", 
        answer: "guayaquil", 
        hint: "Recuerdas que el bus se daño!! jaja", 
        suggestion: "Es una ciudad costera del Ecuador", 
        imageSrc: "FotoGuayaquil.jpeg" 
    },
    {
        question: "¿Qué comida preparaste para mí la primera vez que me cocinaste?",
        answer: "patacones",
        hint: "Exacto, y me gustaron mucho",
        suggestion: "Es algo que me decías que te quedaba muy bien",
        imageSrc: "Patacones.jpeg"
    },
];

document.getElementById("start-btn").addEventListener("click", function() {
    // Reproducir la música cuando el usuario hace clic en "Comenzar"
    const backgroundMusic = document.getElementById("background-music");
    backgroundMusic.play();

    document.getElementById("welcome-screen").style.display = "none";
    document.getElementById("game-screen").style.display = "block";
    loadQuestion();
});

function loadQuestion() {
    // Cargar la pregunta actual
    document.getElementById("question").textContent = questions[currentStep].question;
    document.getElementById("hint").textContent = questions[currentStep].suggestion; // Mostrar la sugerencia
    document.getElementById("hint").style.display = "block"; // Hacer visible la sugerencia
    document.getElementById("next-btn").style.display = "none"; // Ocultar el botón de siguiente

    // Reiniciar el estado visual del campo de entrada
    const answerInput = document.getElementById("answer");
    answerInput.classList.remove("correct", "incorrect");
}

function checkAnswer() {
    const userAnswer = document.getElementById("answer").value.trim().toLowerCase();
    const result = document.getElementById("result");
    const submitButton = document.getElementById("submit-btn");
    const memoryImg = document.getElementById("memory-img");
    const mediaContent = document.getElementById("media-content");

    const answerInput = document.getElementById("answer"); // Obtener el campo de respuesta

    // Desactivar el botón mientras se procesa la respuesta
    submitButton.disabled = true;

    // Comparar respuestas ignorando espacios y mayúsculas/minúsculas
    if (userAnswer.replace(/\s+/g, '') === questions[currentStep].answer.replace(/\s+/g, '').toLowerCase()) {
        result.textContent = questions[currentStep].hint; // Mostrar el hint adicional

        // Mostrar la imagen correspondiente a la pregunta
        memoryImg.src = questions[currentStep].imageSrc;
        memoryImg.style.display = "block";
        mediaContent.style.display = "block";

        // Cambiar el color del campo de respuesta a "correcto"
        answerInput.classList.add("correct");

        // Mostrar el botón de siguiente para avanzar manualmente
        document.getElementById("next-btn").style.display = "block";
    } else {
        result.textContent = "Intenta de nuevo.";

        // Cambiar el color del campo de respuesta a "incorrecto"
        answerInput.classList.add("incorrect");
        submitButton.disabled = false; // Reactivar el botón si la respuesta es incorrecta
    }
}

function nextQuestion() {
    currentStep++;

    if (currentStep < questions.length) {
        // Cargar la siguiente pregunta
        loadQuestion();
        document.getElementById("answer").value = "";
        document.getElementById("result").textContent = "";
        document.getElementById("memory-img").style.display = "none"; // Ocultar la imagen anterior
        document.getElementById("submit-btn").disabled = false; // Reactivar el botón de enviar
    } else {
        // Mostrar el video de celebración
        document.getElementById("game-screen").style.display = "none";
        document.getElementById("celebration-screen").style.display = "block";

        // Detener la música de fondo
        const backgroundMusic = document.getElementById("background-music");
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0; // Reiniciar la música si decides reiniciar el juego
    }
}

function restartGame() {
    // Reiniciar todas las variables y la interfaz
    currentStep = 0;

    // Detener el video si se está reproduciendo
    const celebrationVideo = document.getElementById("celebration-video");
    celebrationVideo.pause(); // Pausar el video
    celebrationVideo.currentTime = 0; // Reiniciar el tiempo del video

    // Reiniciar pantallas
    document.getElementById("welcome-screen").style.display = "block";
    document.getElementById("game-screen").style.display = "none";
    document.getElementById("celebration-screen").style.display = "none";

    // Limpiar estado del juego
    document.getElementById("result").textContent = "";
    document.getElementById("answer").value = "";
    document.getElementById("memory-img").style.display = "none"; // Ocultar la imagen
    document.getElementById("media-content").style.display = "none"; // Ocultar el contenedor de medios
    document.getElementById("next-btn").style.display = "none"; // Ocultar el botón de siguiente
    document.getElementById("submit-btn").disabled = false; // Reactivar el botón de enviar

    // Reiniciar la música de fondo
    const backgroundMusic = document.getElementById("background-music");
    backgroundMusic.play();

    // Cargar la primera pregunta
    loadQuestion();
}
