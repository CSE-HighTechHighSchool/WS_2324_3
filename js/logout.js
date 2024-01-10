// Function to log users out (used globally)
function logout() {
    localStorage.removeItem("user")
    sessionStorage.removeItem("user")
    alert("Logged out successfully")
    window.location = "login.html"
}

function logoutNested() {
    localStorage.removeItem("user")
    sessionStorage.removeItem("user")
    alert("Logged out successfully")
    window.location = "../login.html"
}