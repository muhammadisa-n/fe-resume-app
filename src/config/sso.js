const isSsoActive = () =>
  import.meta.env.VITE_AUTH_WITH_SSO === "true";

const getSsoLoginUrl = (callbackPath = "/app") => {
  const ssoUrl = import.meta.env.VITE_SSO_URL;
  const clientUrl = `${window.location.origin}/resume-builder${callbackPath}`;
  return `${ssoUrl}/auth?redirect_to=${encodeURIComponent(clientUrl)}`;
};

export { isSsoActive, getSsoLoginUrl };
