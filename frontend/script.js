async function trackIP() {
  const ip = document.getElementById("ipInput").value;
  if (!ip) {
    alert("Masukkan IP terlebih dahulu!");
    return;
  }

  // Ganti URL ini dengan InfinityFree backend kamu
  const backendURL = "https://location-tracker.page.gd/";

  const response = await fetch(`${backendURL}/index.php?ip=${ip}`);
  const data = await response.json();

  if (data.status === "success") {
    document.getElementById("result").innerHTML = `
      <p><strong>IP:</strong> ${data.query}</p>
      <p><strong>Negara:</strong> ${data.country}</p>
      <p><strong>Kota:</strong> ${data.city}</p>
      <p><strong>ISP:</strong> ${data.isp}</p>
    `;

    const map = L.map("map").setView([data.lat, data.lon], 10);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors"
    }).addTo(map);

    L.marker([data.lat, data.lon]).addTo(map)
      .bindPopup(`Lokasi: ${data.city}, ${data.country}`)
      .openPopup();
  } else {
    document.getElementById("result").innerHTML = `<p>❌ Gagal melacak lokasi untuk IP: ${ip}</p>`;
  }
}
