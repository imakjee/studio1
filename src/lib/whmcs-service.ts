
'use server';

/**
 * @fileOverview Server-side service for interacting with the WHMCS API.
 * This service handles authentication and requests to WHMCS without exposing credentials to the client.
 */

const WHMCS_API_URL = process.env.WHMCS_API_URL || 'https://your-whmcs-url.com/includes/api.php';
const WHMCS_API_IDENTIFIER = process.env.WHMCS_API_IDENTIFIER || '';
const WHMCS_API_SECRET = process.env.WHMCS_API_SECRET || '';

async function callWhmcsApi(action: string, params: Record<string, any> = {}) {
  const body = new URLSearchParams({
    action,
    identifier: WHMCS_API_IDENTIFIER,
    secret: WHMCS_API_SECRET,
    responsetype: 'json',
    ...params,
  });

  try {
    const response = await fetch(WHMCS_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body.toString(),
    });

    if (!response.ok) {
      throw new Error(`WHMCS API error: ${response.statusText}`);
    }

    const data = await response.json();
    if (data.result === 'error') {
      throw new Error(data.message || 'WHMCS API returned an error');
    }

    return data;
  } catch (error) {
    console.error(`WHMCS API call failed [${action}]:`, error);
    throw error;
  }
}

/**
 * Creates a new client in WHMCS.
 */
export async function createWhmcsClient(userData: {
  firstname: string;
  lastname: string;
  email: string;
  password?: string;
}) {
  return callWhmcsApi('AddClient', {
    ...userData,
    status: 'Active',
  });
}

/**
 * Fetches products for a specific client.
 */
export async function getClientProducts(clientId: string) {
  return callWhmcsApi('GetClientsProducts', { clientid: clientId });
}

/**
 * Fetches invoices for a specific client.
 */
export async function getClientInvoices(clientId: string) {
  return callWhmcsApi('GetInvoices', { userid: clientId, limitnum: 50 });
}

/**
 * Fetches tickets for a specific client.
 */
export async function getClientTickets(clientId: string) {
  return callWhmcsApi('GetTickets', { clientid: clientId });
}

/**
 * Fetches a single ticket with its messages.
 */
export async function getTicketDetails(ticketId: string) {
  return callWhmcsApi('GetTicket', { ticketid: ticketId });
}

/**
 * Opens a new support ticket.
 */
export async function openSupportTicket(clientId: string, subject: string, message: string, priority: string = 'Medium') {
  return callWhmcsApi('OpenTicket', {
    clientid: clientId,
    subject,
    message,
    priority,
    deptid: 1, // Default department ID
  });
}

/**
 * Adds a reply to an existing ticket.
 */
export async function replyToTicket(ticketId: string, message: string, clientId: string) {
  return callWhmcsApi('AddTicketReply', {
    ticketid: ticketId,
    clientid: clientId,
    message,
  });
}
