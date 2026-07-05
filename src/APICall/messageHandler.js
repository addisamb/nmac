import ActionType from "../Redux/Action/ActionType/actionType";
import { Utills } from "../config";

export default function MessageHandler(response) {
    if (Array.isArray(response?.message)) {
        Utills.showToast(response?.message[0], '', 'error');
    } else if (response?.status === false) {
        // Backend signalled a failure -> show as error, not success.
        Utills.showToast(response?.message, '', 'error');
    } else {
        Utills.showToast(response?.message, '', 'success');
    }
}