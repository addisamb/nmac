import { t } from "i18next";
import Images from "../images";

export function getMediaIcon(path) {
    const extension = path?.toLowerCase()?.split('.').pop();

    switch (extension) {
      case 'mp4':
      case 'mov':
        return Images.PlayCircleIcon;
      case 'doc':
        case 'docx':
        return Images.EditDocument;
      case 'xls':
      case 'xlxs':
      case 'xlsx':
        return Images.ExcelFile;
      case 'pdf':
        return Images.PDFIcon;
      case 'vtt':
        return Images.AssignmentIcon;
      case 'pptx':
        case 'ppt':
      return Images.PowerPointIcon;
      case 'link':
        return Images.ZoomIcon;
      default:
        return Images.AssignmentIcon;
    }
  }


  export function getExtensionName(path) {
    const extension = path?.toLowerCase()?.split('.').pop();
  
    switch (extension) {
      case 'mp4':
      case 'mov':
        return t('video');
      case 'doc':
      case 'docx':
        return t('docx');
      case 'xls':
      case 'xlxs':
      case 'xlsx':
        return t('file_excel');
      case 'pdf':
        return t('pdf');
      case 'vtt':
        return t('vtt');
      case 'pptx':
      case 'ppt':
        return t('ppt');
      case 'link':
        return t('meeting_link');
      default:
        return t('document_file');
    }
  }

  export function HandleNavigationAndroid(url: string) {

    const extension = url?.toLowerCase()?.split('.').pop();

    if ( extension == "txt" || extension == "webm" || extension == "webp" || extension == "mp3" || extension == "wav" || extension == "png" || extension == "jpeg" || extension == "jpg" || extension == "wav" || extension == "pdf" )
    {
      return `http://docs.google.com/gview?embedded=true&url=${url}`
    }
    else if (extension == "odt" || extension == "ods" || extension == "odp" || extension == "rtf" || extension == "docx" || extension == "doc" || extension == "ppt" || extension == "pptx" || extension == "xls" || extension == "xlsx")
    {
      return `https://view.officeapps.live.com/op/view.aspx?src=${url}`;
    }
    else{
      return url
    }
  }

  export function HandleNavigationIOS(url: string) {
      return url
  }

  export function getListName(name) {
  
    switch (name) {
      case 'recommendedCourses':
        return t('participants_view_also')
      case 'trendingCourses':
        return  t('trending_course');
        case 'popularCourses':
          return t('popular_course')
      case 'newCourses':
        return t('new_courses')

        
      default:
        return name
    }
  }



  export function getKeyName(name) {
  
    switch (name) {
      case 'recommendedCourses':
        return 'recommended'
      case 'trendingCourses':
        return  'trending';
        case 'popularCourses':
          return 'popular'
      case 'newCourses':
        return 'newCourses'

        
      default:
        return name
    }
  }
