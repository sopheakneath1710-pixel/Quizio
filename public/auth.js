// =====================
// SUPABASE CONFIG
// =====================
const SUPABASE_URL = "https://vobglhlucwodmlzphmvc.supabase.co";
const SUPABASE_ANON_KEY = "YOUR_ANON_PUBLIC_KEY";

const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

// =====================
// AUTH GUARD (AUTO)
// =====================
async function requireAuth() {
  showLoading();

  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    window.location.href = "login.html";
    return;
  }

  hideLoading();
  return user;
}

// =====================
// LOGOUT
// =====================
async function logout() {
  await supabase.auth.signOut();
  window.location.href = "login.html";
}

// =====================
// UX HELPERS
// =====================
function showLoading() {
  if (document.getElementById("loading-screen")) return;

  const div = document.createElement("div");
  div.id = "loading-screen";
  div.innerHTML = "Loading…";
  document.body.appendChild(div);
}

function hideLoading() {
  const el = document.getElementById("loading-screen");
  if (el) el.remove();
}

function showError(message) {
  alert(message);
}
