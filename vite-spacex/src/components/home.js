// src/components/home.js

export const viewHome = `
  <h2>Inicio - Blog Espacial</h2>
  <div id="blog-container" class="blog-container">

  </div>
`;

export async function cargarHome() {
  const container = document.getElementById('blog-container');
  container.innerHTML = `<h2>Dashboard Espacial SpaceX</h2>
    <div id="dashboard" class="dashboard-container">
      <div class="card">
        <h3>Total de misiones</h3>
        <p id="total-missions">Cargando...</p>
      </div>
      <div class="card">
        <h3>Misiones exitosas</h3>
        <p id="success-missions">Cargando...</p>
      </div>
      <div class="card">
        <h3>Misiones fallidas</h3>
        <p id="fail-missions">Cargando...</p>
      </div>
      <div class="card">
        <h3>Porcentaje de éxito</h3>
        <div class="progress-bar-bg">
          <div id="success-bar" class="progress-bar-fill"></div>
        </div>
        <p id="success-percent">Cargando...</p>
      </div>
    </div>`;

  try {
    const res = await fetch('https://api.spacexdata.com/v4/launches/past');
    const launches = await res.json();

    const total = launches.length;
    const success = launches.filter(l => l.success === true).length;
    const fail = launches.filter(l => l.success === false).length;
    const successPercent = ((success / total) * 100).toFixed(2);

    document.getElementById('total-missions').textContent = total;
    document.getElementById('success-missions').textContent = success;
    document.getElementById('fail-missions').textContent = fail;
    document.getElementById('success-percent').textContent = successPercent + '%';

    // Animar barra de porcentaje de éxito
    const successBar = document.getElementById('success-bar');
    successBar.style.width = '0%';

    setTimeout(() => {
      successBar.style.width = successPercent + '%';
    }, 100);

  } catch (error) {
    container.innerHTML = '<p>Error cargando datos del dashboard.</p>';
  }
}
