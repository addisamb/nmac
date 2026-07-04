// ── API host — single source of truth for the whole app ──────────────
// For a production/release build, switch BASE_URL to the production URL:
//   export const BASE_URL = 'https://api.nmoacademy.com/'; // PRODUCTION
export const BASE_URL = 'https://since-proposals-seventh-angela.trycloudflare.com/'; // QA (temporary tunnel)

export const PAYTABS_BASE_URL = 'https://secure.paytabs.sa/payment/request';
export const PAYTABS_AUTHERIZATION_KEY = 'SNJNGDLDHD-J6BHNMWBBW-RD99LNG22Z';
export const CALL_BACK_URL =
  'https://api.nmoacademy.com/api/v1/payment/paytabsCallback';

export const GUEST_USER_PAYLOAD = {
  email: 'guestuser@gmail.com',
  password: '12345678',
};

export const BASE_PATH = 'api/v1/';
export const API_TIMEOUT = 500000;
