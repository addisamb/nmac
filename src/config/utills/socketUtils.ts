import io from 'socket.io-client';

import {BASE_URL} from '../../APICall/constants';

// import { store } from "../store";
import DataHandler from '../../services/dataHandler.service';
import {
  chatsMsg,
  joinSupportChat,
} from '../../Redux/Action/HomeActions/homeActions';
import {Store} from '../../Redux/Store/Store';

export const SocketTypes = {
  MESSAGE: 'create_comment',
  NESTED_COMNT: 'create_reply',
  CHAT_STARTED: 'chat_start',
  TYPING: 'Typing',
  IS_TYPING: 'isTyping',
  CHAT_JOIN: 'join_room',
  JOIN_SUPPORT_CHAT: 'join_support_chat',
  SUPPORT_MSG: 'support_message',
  CHAT_LEAVE: 'leave_room',
  NEW_MESSAGE: 'newMessage',
  NEW_SUPPORT_MESSAGE: 'new_support_message',
  DISCONNECT: 'disconnect',
  NEW_COMMENT: 'new_comment',
  NEW_REPLY: 'new_reply',
  NOTIFY_ME: 'notify_me',
  NOTIFY_ON_DONATE: 'notify_on_donate'


};

export default class Socket {
  static socket = null;
  static getSocket = () => {
    if (Socket.socket === null) {
      // let actorId = useSelector((state) => state?.user?.userDetail?.id);
      // let authToken = useSelector((state) => state?.user?.userDetail?.token);
      let authToken =
        DataHandler?.getStore()?.getState()?.AuthReducer?.userToken;

      // let authToken = Store?.getState()?.AuthReducer?.userToken //store.getState().auth.user.token;

      // console.log("check User================", { authorId, authorName });
      console.log(
        'dsadsa======chect socket url',
        DataHandler?.getStore()?.getState()?.AuthReducer?.userToken,
      );

      Socket.socket = io(`${BASE_URL}?token=${authToken}`, {
        transports: ['websocket'],
        upgrade: false,
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
      });
      console.log('--------', this.socket);
    }
    return Socket.socket;
  };

  static init = () => {
    // const dispatch = useDispatch();
    Socket.getSocket().on('connect', () => {
      console.log('socket connected!', Socket.socket?.connected);
      // dispatch(changeSocketConnectivityStatus(true));
    });

    Socket.getSocket().on('connect-error', err => {
      // console.log("socket connection error", err);
    });

    Socket.getSocket().on('error', error => {
      // console.log("socket error", error);
    });

    Socket.getSocket().on('disconnect', reason => {
      // console.log("socket disconnected", reason);
      // dispatch(changeSocketConnectivityStatus(false));
    });
  };

  static onMessageRecieved_NewComment = (cb) => {
    Socket.getSocket().on(SocketTypes.NEW_COMMENT, cb);
  };

  static onMessageRecieved_NestedComment = (cb) => {
    Socket.getSocket().on(SocketTypes.NEW_REPLY, cb);
  };

  static onMessage_OpenModal = (cb) => {
    Socket.getSocket().on(SocketTypes.NOTIFY_ME, cb);
  };

  static emitChatStarted = (data, cb) => {
    Socket.getSocket().emit(
      SocketTypes.CHAT_STARTED,
      {
        ...data,
      },
      cb,
    );
  };

  static emitMessage = data => {
    Socket.getSocket().emit(
      SocketTypes.MESSAGE,
      {
        ...data,
      },
      acknowledgmentData => {
        console.log('after send message===>', acknowledgmentData);
      },
    );
  };

  static emitNestedComnt = data => {
    Socket.getSocket().emit(
      SocketTypes.NESTED_COMNT,
      {
        ...data,
      },
      acknowledgmentData => {
        console.log('after send message===>', acknowledgmentData);
      },
    );
  };

  static emitChatJoin = (data, dispatch) => {
    Socket.getSocket().emit(
      SocketTypes.CHAT_JOIN,
      {
        ...data,
      },
      acknowledgmentData => {
        // Handle the acknowledgment response from the server
        dispatch(chatsMsg(acknowledgmentData));
      },
    );
  };

  static emitdDonateToUser = (data) => {
    Socket.getSocket().emit(
      SocketTypes.NOTIFY_ON_DONATE,
      {
        ...data,
      }
    );
  };

  static emitChatLeave = data => {
    Socket.getSocket().emit(SocketTypes.CHAT_LEAVE, {
      ...data,
    });
  };

  // static onChatStarted = (cb) => {
  //   Socket.getSocket().on(SocketTypes.CHAT_STARTED, cb);
  // };

  // static onMessageTyping = (cb) => {
  //   Socket.getSocket().on(SocketTypes.TYPING, cb);
  // };

  // static onMessageRecieved = (cb) => {
  //   Socket.getSocket().on(SocketTypes.NEW_MESSAGE, cb);
  // };

  // Suppoet Agent Socket
  static emitJoinSupportChat = (data, dispatch) => {
    Socket.getSocket().emit(
      SocketTypes.JOIN_SUPPORT_CHAT,
      {
        ...data,
      },
      (acknowledgmentData) => {

        console.log("======>",acknowledgmentData);
        

        // Handle the acknowledgment response from the server
        dispatch(joinSupportChat(acknowledgmentData));
      },
    );
  };

  static onMessageRecieved_NewSupportAgent = (cb) => {
    Socket.getSocket().on(SocketTypes.NEW_SUPPORT_MESSAGE, cb);
  };

  static emitSendSupportMessage = data => {
    Socket.getSocket().emit(
      SocketTypes.SUPPORT_MSG,
      {
        ...data,
      },
      acknowledgmentData => {
        console.log('when user send message===>', acknowledgmentData);
      },
    );
  };

  static disconnect = () => {
    Socket.getSocket().disconnect();
    Socket.socket = null;
  };

  static remove = (name, listener = null) => {
    if (Socket.socket) {
      if (listener) {
        Socket.getSocket().removeListener(name, listener);
      } else {
        Socket.getSocket().removeAllListeners(name);
      }
    }
  };
}
// export default Socket;