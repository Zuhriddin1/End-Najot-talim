async function getToken() {
  function timestamp(expDate) {
    const [datePart, timePart] = expDate.split(" ");
    const [day, month, year] = datePart.split(".");
    const formattedDate = `${month}/${day}/${year} ${timePart}`;
    const dateObject = new Date(formattedDate);
    return dateObject.getTime();
  }
  function isExpireToken(expireDate) {
    if (!expireDate) return true;
    const currentDate = Date.now();
    const expDate = timestamp(expireDate);
    return expDate < currentDate;
  }
  const expireDate = localStorage.getItem("expireDate");
  const token = localStorage.getItem("token");

  if (!expireDate || !token || isExpireToken(expireDate)) {
    try {
      const resp = await fetch(import.meta.env.VITE_API_TOKEN_URL, {
        method: "POST",
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${btoa(
            import.meta.env.VITE_CLIENT_ID +
              ":" +
              import.meta.env.VITE_SECRET_KEY
          )}`,
        },
        body: "grant_type=client_credentials",
      });

      if (!resp.ok) {
        throw new Error(`HTTP error! status: ${resp.status}`);
      }

      const auth = await resp.json();
      const newExpireDate = getFormattedDateOneHourLater();
      localStorage.setItem("token", auth.access_token);
      localStorage.setItem("expireDate", newExpireDate);

      return {
        date: newExpireDate,
        token: auth.access_token,
      };
    } catch (error) {
      console.error("Failed to fetch token:", error);
      return null;
    }
  } else {
    return {
      date: expireDate,
      token: token,
    };
  }
}
function getFormattedDateOneHourLater() {
  const now = new Date();
  now.setHours(now.getHours() + 1);
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${day}.${month}.${year} ${hours}:${minutes}`;
}
export { getToken };
