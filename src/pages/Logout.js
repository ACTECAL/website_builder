import { useEffect } from "react";

const Logout = () => {
useEffect(() => {
  console.log("===== COOKIE DEBUG =====");
  console.log("Current URL:", window.location.href);
  console.log("Hostname:", window.location.hostname);
  console.log("document.cookie:", document.cookie);

  const cookies = document.cookie.split(";");

  console.log("Parsed Cookies:");
  cookies.forEach((cookie) => {
    console.log(cookie.trim());
  });

  const tenantCookie = cookies.find((cookie) =>
    cookie.trim().startsWith("tenant=")
  );

  console.log("tenantCookie:", tenantCookie);

  const tenantName = tenantCookie
    ? tenantCookie.split("=")[1]
    : null;

  console.log("tenantName:", tenantName);

  if (!tenantName) {
    console.error("❌ Tenant cookie not found");
    return;
  }

  const redirectUrl =
    process.env.REACT_APP_ENV === "local"
      ? "http://localhost:3000"
      : `https://${tenantName}.erp.actecal.com`;

  console.log("Redirecting to:", redirectUrl);

  window.location.replace(redirectUrl);
}, []);

   

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "18px",
      }}
    >
      Logging out...
    </div>
  );
};

export default Logout