
document.getElementById("start").addEventListener("click", async () => {
  const res = await fetch("https://your-backend-url/create-payment", { method: "POST" });
  const data = await res.json();
  if (data.redirect_url) {
    window.location.href = data.redirect_url;
  } else {
    alert("Gagal membuat QRIS. Coba lagi.");
  }
});
