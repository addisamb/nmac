import ActionType from "../Redux/Action/ActionType/actionType";
import { Utills } from "../config";

export default function MessageHandler(response) {
    if (Array.isArray(response?.message)) {
        Utills.showToast(response?.message[0], '', 'error');
    } else {
        Utills.showToast(response.message, '', 'success');
    }
}