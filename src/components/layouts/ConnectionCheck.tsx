import { useEffect, useState } from "react";

// Backendとの疎通確認用Component
const ConnectionCheck = () => {
  const [status, setStatus] = useState("loading...");

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/health_check")
      .then((res) => res.json())
      .then((data) => setStatus(data.status))
      .catch((err) => setStatus("error: " + err.message));
  }, []);

  return <div>API status: {status}</div>;
};

export default ConnectionCheck;
