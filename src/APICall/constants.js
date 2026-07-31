// ── API host — single source of truth for the whole app ──────────────
// For a production/release build, switch BASE_URL to the production URL:
//   export const BASE_URL = 'https://api.nmoacademy.com/'; // PRODUCTION
export const BASE_URL = 'https://api.nmoacademy.com/'; // PRODUCTION

// ── Payment (PayTabs) ────────────────────────────────────────────────
// Single source of truth. Flip PAYTABS_ENVIRONMENT to 'sandbox' to test the
// purchase flow WITHOUT charging real cards; 'live' bills real money.
//
// ⚠️ SECURITY — must be resolved before launch:
//  1. `serverKey` is a SERVER-side credential and does not belong in a mobile
//     app at all; anyone can extract it from the APK/IPA and charge/refund
//     against the merchant account. The call that uses it should move to the
//     backend, with the app calling our own API instead.
//  2. All values below ship inside the app bundle. Rotate them before launch and
//     inject per-build via CI (e.g. react-native-config) rather than committing.
//  3. Sandbox credentials must be supplied by the merchant (PayTabs dashboard);
//     they are intentionally left blank rather than guessed.
export const PAYTABS_ENVIRONMENT = 'live'; // 'live' | 'sandbox'

const PAYTABS_CONFIG = {
  live: {
    baseUrl: 'https://secure.paytabs.sa/payment/request',
    authorizationKey: 'SNJNGDLDHD-J6BHNMWBBW-RD99LNG22Z',
    profileID: '97611',
    serverKey: 'S6JNGDLDKN-J6BHNMWBND-LWZRTLZTWW',
    clientKey: 'CHKMNQ-TMDN6G-2HQNV2-KRBP29',
  },
  // Fill these from the PayTabs sandbox profile to test purchases safely.
  sandbox: {
    baseUrl: 'https://secure.paytabs.sa/payment/request',
    authorizationKey: '',
    profileID: '',
    serverKey: '',
    clientKey: '',
  },
};

export const PAYTABS = PAYTABS_CONFIG[PAYTABS_ENVIRONMENT];
export const PAYTABS_BASE_URL = PAYTABS.baseUrl;
export const PAYTABS_AUTHERIZATION_KEY = PAYTABS.authorizationKey;

export const CALL_BACK_URL =
  'https://api.nmoacademy.com/api/v1/payment/paytabsCallback';

export const GUEST_USER_PAYLOAD = {
  email: 'guestuser@gmail.com',
  password: '12345678',
};

export const BASE_PATH = 'api/v1/';
export const API_TIMEOUT = 500000;
