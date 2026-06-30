import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {FontType, Images, Metrix, Utills} from '../../../../config';
import {CustomImage, CustomText, RatingComponent} from '../../../../components';
import {t} from 'i18next';

type QuizAttemptsCardsProps = {
  details: {
    description: string;
    score: boolean,
    totalQuestions: string
  };
};

export const QuizAttemptsCards: React.FC<QuizAttemptsCardsProps> = ({
  details,
}) => {

  // console.log("detail===>",details);
  

  const {description, score, totalQuestions } = details;
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <CustomImage
          source={Images.QuizIcon}
          //   resizeMode="cover"
          customStyle={{
            width: '100%',
            height: '100%',
              // borderWidth: 1,
          }}
        />
      </View>
      <View style={styles.contentContainer}>
        <View
          style={[
            styles.flexSpaceBetween,
            {
              marginBottom: Metrix.VerticalSize(10),
            },
          ]}>
          <CustomText.LargeBoldText
            customStyle={{
              fontSize: FontType.FontSmall,
              width: '80%',
            }}>
            {description || ''}
          </CustomText.LargeBoldText>
          <CustomImage
            source={Images.Tick}
            customStyle={{width: '30%', height: Metrix.VerticalSize(15)}}
          />
        </View>
        <View style={styles.flexSpaceBetween}>
          <CustomText.LargeBoldText
            customStyle={{
              fontSize: FontType.FontSmall,
              color: Utills.selectedThemeColors().Primary,
              //   width: '80%',
            }}>
            {t('your_score')}
          </CustomText.LargeBoldText>
          <CustomText.LargeBoldText
            customStyle={{
              fontSize: FontType.FontSmall,
              color: Utills.selectedThemeColors().Primary,
              //   width: '80%',
            }}>
            {`${score.toString()}/${totalQuestions}`}
          </CustomText.LargeBoldText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Metrix.VerticalSize(5),
    marginTop: Metrix.VerticalSize(10),
    borderRadius: Metrix.VerticalSize(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    backgroundColor: Utills.selectedThemeColors().CourseContainerColor,
  },
  flexSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageContainer: {
    width: '20%',
    height: Metrix.VerticalSize(50),
    borderRadius: Metrix.VerticalSize(10),
    overflow: 'hidden',
  },
  contentContainer: {
    width: '77%',
    justifyContent: 'space-between',
  },
});