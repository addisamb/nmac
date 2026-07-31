// ── API host — single source of truth for the whole app ──────────────
// ⚠️ THIS IS THE `local-testing` BRANCH — it points at a LOCAL dev backend.
// Never merge this branch into main. main stays on PRODUCTION:
//   export const BASE_URL = 'https://api.nmoacademy.com/'; // PRODUCTION
//
// Phone must be on the SAME Wi-Fi as the dev machine, the local backend must be
// running on :3100, and inbound TCP 3100 must be allowed by the Windows firewall.
// If the dev machine's LAN IP changes (DHCP), update it here and rebuild.
export const BASE_URL = 'http://192.168.136.195:3100/'; // LOCAL DEV (LAN)

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
