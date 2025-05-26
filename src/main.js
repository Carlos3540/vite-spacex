// main.js

// Importaciones necesarias desde Firebase y componentes
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/9.6.11/firebase-auth.js';
import { firebaseConfig } from './firebase-config.js';
import { viewLogin } from './components/login.js';
import { viewRegister } from './components/register.js';
import { viewHome, cargarHome } from './components/home.js';
import { viewMissions, cargarLaunchpads } from './components/missions.js';
import { viewProfile, mostrarPerfil } from './components/profile.js';

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Diccionario de vistas
const views = {
  login: viewLogin,
  register: viewRegister,
  home: viewHome,
  missions: viewMissions,
  profile: viewProfile
};

// Función para mostrar mensajes en pantalla
function showMessage(text, type = 'error') {
  const messageDiv = document.getElementById('message');
  if (!messageDiv) return;
  messageDiv.textContent = text;
  messageDiv.className = 'message ' + type;
  setTimeout(() => {
    messageDiv.textContent = '';
    messageDiv.className = 'message';
  }, 4000);
}

// Función global para navegar entre vistas
window.navigate = (view) => {
  document.getElementById('views').innerHTML = views[view];

  if (view === 'missions') cargarLaunchpads();
  if (view === 'profile') mostrarPerfil(auth);
  if (view === 'home') cargarHome();   // <-- Esto es clave
};


// Muestra formulario de registro
window.showRegister = () => {
  document.getElementById('views').innerHTML = viewRegister;
};

// Función de registro
window.register = () => {
  const email = document.getElementById('regEmail').value;
  const password = document.getElementById('regPassword').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      navigate('home');
      showMessage('Registro exitoso. Bienvenido!', 'success');
    })
    .catch(e => showMessage("Error al registrarse: " + e.message));
};

// Función de inicio de sesión
window.login = () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      navigate('home');
      showMessage('Inicio de sesión correcto.', 'success');
    })
    .catch(e => showMessage("Error al iniciar sesión: " + e.message));
};

// Cierra la sesión del usuario
window.logout = () => {
  signOut(auth).then(() => navigate('login'));
};

// Verifica el estado del usuario (si ya está logueado)
onAuthStateChanged(auth, (user) => {
  if (user) navigate('home');
  else navigate('login');
});
