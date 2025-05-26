export const viewMissions = `
  <h2>Plataformas de Lanzamiento</h2>
  <div id="launchpads"></div>
`;

export async function cargarLaunchpads() {
  const res = await fetch('https://api.spacexdata.com/v4/launchpads');
  const data = await res.json();
  const contenedor = document.getElementById('launchpads');

  contenedor.innerHTML = data.map((pad, i) => `
    <div class="card">
      <h3>${pad.name}</h3>
      <p><strong>Región:</strong> ${pad.region}</p>
      <p>${pad.details}</p>
      <button class="btn-clima" data-lat="${pad.latitude}" data-lon="${pad.longitude}" data-index="${i}">Ver clima</button>
      <div class="clima-info" id="clima-${i}" style="margin-top: 10px; color: #007bff;"></div>
    </div>
  `).join('');

  // Asigna el evento a cada botón
  contenedor.querySelectorAll('.btn-clima').forEach(btn => {
    btn.addEventListener('click', async () => {
      const lat = btn.getAttribute('data-lat');
      const lon = btn.getAttribute('data-lon');
      const index = btn.getAttribute('data-index');
      const r = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
      const w = await r.json();

      // Mostrar clima dentro del div correspondiente
      const climaDiv = document.getElementById(`clima-${index}`);
      climaDiv.innerHTML = `
        <p><strong>Temperatura:</strong> ${w.current_weather.temperature} °C</p>
        <p><strong>Viento:</strong> ${w.current_weather.windspeed} km/h</p>
        <p><strong>Dirección del viento:</strong> ${w.current_weather.winddirection}°</p>
      `;
    });
  });
}
