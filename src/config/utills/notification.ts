import notifee from '@notifee/react-native';

function generateBody(image) {
  const body = {
    requests: [
      {
        image: {
          content: image,
        },
        features: [
          {
            type: 'TEXT_DETECTION', //we will use this API for text detection purposes.
            maxResults: 1,
          },
        ],
      },
    ],
  };
  return body;
}

async function CreateChannel() {
  await notifee.requestPermission()
  const channelId = await notifee.createChannel({

    id: 'nmoacademy-25acf', // Change 'channelId' to 'id'
    name: 'NMOacademy', // Change 'channelName' to 'name'
    description: 'A channel to categorise your notifications',
    sound: 'default',
    importance: 4,
    vibration: true
  }); 
}

function getDatefromIso8601(value) {

  // Creating a new Date object from the timestamp
  const dateObj = new Date(value);
  
  // Extracting the date components
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1; // Adding 1 since months are zero-based
  const day = dateObj.getDate();
  
  let date = day+"-"+month+"-"+year
  
  return date
}


function capitalizeFirstLetter(string) {
  if (string != null) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  else {
    return null
  }
}

function CapitalizeEachLatter(str) {
  if (str != null) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
      // You do not need to check if i is larger than splitStr length, as your for does that for you
      // Assign it back to the array
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(' ');
  }
  else {
    return null
  }
}
function GetTime(date) {
  let time = new Date(date)


  var today = new Date();
  var diffMs = (today - time);
  var diffDays = Math.floor(diffMs / 86400000);
  var diffHrs = Math.floor((diffMs % 86400000) / 3600000);
  var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
  return ({ diffDays: diffDays, diffHrs: diffHrs, diffMins: diffMins })
}

function MessageTime(date) {
  let time = new Date(date)
  let h = time.getHours()


  // var today = new Date();
  // var diffMs = (today - time);
  // var diffDays = Math.floor(diffMs / 86400000);
  // var diffHrs = Math.floor((diffMs % 86400000) / 3600000);
  // var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
  // var diffseconds = Math.round((today.getTime() - time.getTime()) / 1000);
  console.log(h)
  return ({})
}

export enum NotificationTypes {
  COURSE = 'course',
  ASSIGNMENT = 'assignment',
  PROGRESS = 'progress',
  EVENT = 'event',
  CHAT = 'chat',
  COIN = 'coins',
  WITHDRAWAL='withdrawal',
  ACCOUNT_SECURITY = 'accountSecurity',
  NEW_COURSE= 'new_course',
}

export const ComFunction = {
  generateBody,
  CreateChannel,
  GetTime,
  CapitalizeEachLatter,
  capitalizeFirstLetter,
  MessageTime,
  getDatefromIso8601,
  NotificationTypes
}