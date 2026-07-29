import { useEffect } from "react";

const Logout = () => {
  useEffect(() => {
    const tenantName = document.cookie
      .split("; ")
      .find((row) => row.startsWith("tenant="))
      ?.split("=")[1];
console.log("tenantName",tenantName)
    if (!tenantName) {
    //   window.location.replace(
    //     process.env.REACT_APP_ENV === "local"
    //       ? "http://localhost:3000"
    //       : "https://autolight.erp.actecal.com"
    //   );
      return;
    }

    const redirectUrl =
      process.env.REACT_APP_ENV === "local"
        ? "http://localhost:3000"
        : `https://${tenantName}.erp.actecal.com`;

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