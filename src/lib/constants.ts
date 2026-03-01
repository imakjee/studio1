/**
 * Centralized constants for the Hostxeon application.
 * Update the WHMCS_URL to point to your actual installation (e.g., https://billing.hostxeon.com).
 */
export const WHMCS_URL = "https://your-whmcs-url.com";

export const WHMCS_LINKS = {
  CLIENT_AREA: `${WHMCS_URL}/clientarea.php`,
  LOGIN: `${WHMCS_URL}/clientarea.php`,
  REGISTER: `${WHMCS_URL}/register.php`,
  FORGOT_PASSWORD: `${WHMCS_URL}/password/reset/begin`,
  CART: `${WHMCS_URL}/cart.php`,
  SUPPORT_TICKETS: `${WHMCS_URL}/supporttickets.php`,
  KNOWLEDGEBASE: `${WHMCS_URL}/knowledgebase.php`,
  ANNOUNCEMENTS: `${WHMCS_URL}/announcements.php`,
  ORDER_PLAN: (pid: string) => `${WHMCS_URL}/cart.php?a=add&pid=${pid}`,
};
