const isSsoActive = () => import.meta.env.VITE_AUTH_WITH_SSO === "true";

const getSsoLoginUrl = (callbackPath = "/app") => {
  const ssoUrl = import.meta.env.VITE_SSO_URL;
  const basePath = import.meta.env.BASE_URL;
  const path = callbackPath.replace(/^\//, "");
  const clientUrl = `${window.location.origin}${basePath}${path}`;

  return `${ssoUrl}/auth?redirect_to=${encodeURIComponent(clientUrl)}`;
};

export { isSsoActive, getSsoLoginUrl };
