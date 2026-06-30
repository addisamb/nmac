import RNFetchBlob from 'react-native-blob-util';
import {Platform, PermissionsAndroid} from 'react-native';
import { Utills } from '..';

/// grant permission in android
export const getDownloadPermissionAndroid = async () => {
  try {
    const permissions = {
      // List the permissions you want to request
      'READ_EXTERNAL_STORAGE': PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      'WRITE_EXTERNAL_STORAGE': PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    };

    const granted = await PermissionsAndroid.requestMultiple(Object.values(permissions));

    // Check if all permissions are granted
    const allGranted = Object.values(granted).every(result => result === PermissionsAndroid.RESULTS.GRANTED);

    if (allGranted) {
      console.log('All permissions granted');
      return true
    } else {
      console.log('Some permissions were denied');
    }
   }
    catch (err) {
    console.log('err', err);
  }
};


export const downloadFileAndroid = async (url) => {
  // Get the app's cache directory
  const { config, fs } = RNFetchBlob;
  const cacheDir = fs.dirs.DownloadDir;

  // Generate a unique filename for the downloaded file
  const filename = url.split('/').pop();
  const imagePath = `${cacheDir}/${filename}`;

  console.log("===>",filename,"==>",imagePath);
  

  try {
    // Download the file and save it to the cache directory
    const configOptions = Platform.select({
      ios: {
        fileCache: true,
        path: `${fs.dirs.DocumentDir}/${filename}`,
        autorename: true,
        appendExt: filename.split('.').pop(),
        mediaScannable: true, // Add this option to allow media scanning after download
      },
      android: {
        fileCache: true,
        path: imagePath,
        appendExt: filename.split('.').pop(),
        addAndroidDownloads: {
          // Related to Android only
          useDownloadManager: true,
          notification: true,
          path: imagePath,
          autorename: true,
          description: 'File',
          mediaScannable: true, // Add this option to allow media scanning after download
        },
      },
    });

    const response = await RNFetchBlob.config(configOptions).fetch('GET', url);

    // Ensure the parent directory exists
    await fs.mkdir(cacheDir);

    // Write the file using response data
    await fs.writeFile(imagePath, response.data, 'base64');

    // Log success message
    console.log("File saved successfully at: ", imagePath);

    // Return the path to the downloaded file
    return imagePath;
  } catch (error) {

    console.log("error==>",error?.toString()?.toLowerCase());
    
    if (error?.toString()?.toLowerCase()?.includes('exist')) {
      Utills.showToast("This Invoice Already Exist", '', 'error');
    }
    else{
      Utills.showToast(JSON.stringify(error), '', 'error');
    }
    return false;
  }
};


export const downloadFileIos = async (url) => {
  // Get the app's cache directory
  const {config, fs} = RNFetchBlob;
  const cacheDir = fs.dirs.DownloadDir;

  // Generate a unique filename for the downloaded image
  const filename = url.split('/').pop();
  const imagePath = `${cacheDir}/${filename}`;


  try {
    // Download the file and save it to the cache directory
    const configOptions = Platform.select({
      ios: {
        fileCache: true,
        path: `${fs.dirs.DocumentDir}/${filename}`,
        autorename: true,
        appendExt: filename.split('.').pop(),
        mediaScannable: true, // Add this option to allow media scanning after download
      },
      android: {
        fileCache: true,
        path: imagePath,
        appendExt: filename.split('.').pop(),
        addAndroidDownloads: {
          // Related to the Android only
          useDownloadManager: true,
          notification: true,
          path: imagePath,
          autorename: true,
          description: 'File',
          mediaScannable: true, // Add this option to allow media scanning after download
        },
      },
    });

    const response = await RNFetchBlob.config(configOptions).fetch('GET', url)

    fs.writeFile(imagePath, 'base64').then(res => {
      console.log("response===>",res, "jhk", imagePath);
    });

    

    // Return the path to the downloaded file
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};