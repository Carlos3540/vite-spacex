export const viewLogin = `
  <h2>Iniciar Sesión</h2>
  <input id="email" type="email" placeholder="Correo">
  <input id="password" type="password" placeholder="Contraseña">
  <button onclick="login()">Ingresar</button>
  <div id="message" class="message"></div>  <!-- Contenedor para mensajes -->
  <p>¿No tienes cuenta? <a href="#" onclick="showRegister()">Regístrate</a></p>
`;
