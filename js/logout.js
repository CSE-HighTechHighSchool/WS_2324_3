function logout() {
    localStorage.removeItem("user")
    sessionStorage.removeItem("user")
    alert("Logged out successfully")
    window.location = "/login.html"
}