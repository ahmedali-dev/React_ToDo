import { useEffect } from "react";
import { useJwt } from "react-jwt";

const TokenManager = ({ token, onTokenExpired }) => {
  const { isExpired } = useJwt(token);

  useEffect(() => {
    const checkTokenExpiration = () => {
      if (isExpired) {
        onTokenExpired();
      }
    };

    // Check token expiration every second (adjust the interval as needed)
    const interval = setInterval(checkTokenExpiration, 1000);

    // Cleanup the interval when the component is unmounted
    return () => {
      clearInterval(interval);
    };
  }, [isExpired, onTokenExpired]);

  return null;
};

export default TokenManager;
