import { BASE_PATH, BASE_URL } from './constants';
import axios from 'axios';
import MessageHandler from './messageHandler';
import dataHandlerService from '../services/dataHandler.service';
import { showLoginPleaseModal, showSessionExpireModal } from '../Redux/Action/AuthActions/authActions';

// Transient-failure retry policy. Only idempotent reads (GET) are retried, and
// only for conditions that are actually worth retrying — a network drop/timeout,
// or a server-side 5xx / 429. Never retry a POST/PATCH/DELETE: the request may
// have been applied server-side already (double enrolment, double payment).
const MAX_RETRIES = 2;
const RETRY_BASE_DELAY_MS = 600;

const isRetryable = (method, error) => {
  if (String(method).toLowerCase() !== 'get') return false;
  // No response = timeout / DNS / connection reset -> worth one more try.
  if (!error?.response) return true;
  const status = error.response.status;
  return status === 429 || (status >= 500 && status <= 599);
};

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

const api = async (path, params, method, dispatch, _attempt = 0) => {

  let authToken = dataHandlerService?.getStore()?.getState()?.AuthReducer?.userToken
  let url = BASE_URL + BASE_PATH + path;
  // NOTE: never log `params` or `authToken` — params carries plaintext passwords
  // on the auth routes and authToken is a live JWT. Both were previously printed
  // on every request and are readable from a release device via logcat/Console.
  let options;
  options = {
    headers:
    authToken ? {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    }
    :
    {
      // 'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: method,
    // Without a timeout axios waits forever. A half-open socket (elevator, captive
    // portal, backgrounded app) meant the promise never settled, so the loader
    // flag never reset and the full-screen loader modal hard-blocked the app.
    timeout: 20000,
    ...(params && { data: JSON.stringify(params) }),
  };
  return axios(url, options)
    .then((response) => {
      return response;
    })
    .catch(async (error) => {
      // Retry transient failures on reads with exponential backoff. Covers the
      // common mobile case of a brief signal drop, which previously surfaced
      // immediately as a blank screen with no way to recover.
      if (isRetryable(method, error) && _attempt < MAX_RETRIES) {
        await wait(RETRY_BASE_DELAY_MS * Math.pow(2, _attempt));
        return api(path, params, method, dispatch, _attempt + 1);
      }

      // No response at all (timeout, offline, CORS, server down): error.response
      // is undefined. Reading error.response.status here used to crash. Return a
      // shaped object so callers that read `.data` don't blow up either.
      if (!error?.response) {
        return {
          data: {
            status: false,
            // Flag so screens can distinguish "offline" from "server said no"
            // and render a retry affordance rather than an empty state.
            isNetworkError: true,
            message: 'Unable to reach the server. Please check your connection.',
          },
        };
      }

      if (error.response.status == 401) {
        // dispatch is optional — many callers don't pass it. Calling an undefined
        // dispatch here used to crash with "undefined is not a function".
        if (typeof dispatch === 'function') {
          dispatch(showSessionExpireModal(true));
        }
        // Return the response (not undefined) so callers reading `.data` are safe.
        return error.response;
      }

      return error.response;
    });
};

export default api;