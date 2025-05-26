export const viewProfile = `
  <h2>Tu Perfil</h2>
  <p id="userEmail"></p>
`;

export function mostrarPerfil(auth) {
  const user = auth.currentUser;
  document.getElementById('userEmail').innerText = user?.email || 'No conectado';
}
