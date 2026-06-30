import {
  FlatList,
  I18nManager,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {CommonQuestionsProps} from '../../propTypes';
import {
  BackHeader,
  CustomImage,
  CustomText,
  MainContainer,
  ShowMoreComponent,
} from '../../../components';
import {t} from 'i18next';
import {FontType, Images, Metrix} from '../../../config';
import {normalizeFont} from '../../../config/metrix';

const questionData = [
  {
    id: '1',
    heading: t('question1'),
    content: t('answer1'),
  },
  {
    id: '2',
    heading: t('question2'),
    content: t('answer2'),
  },
  {
    id: '3',
    heading: t('question3'),
    content: t('answer3'),
  },
  {
    id: '4',
    heading: t('question4'),
    content: t('answer4'),
  },
  {
    id: '5',
    heading: t('question5'),
    content: t('answer5'),
  },
  {
    id: '6',
    heading: t('question6'),
    content: t('answer6'),
  },
  {
    id: '7',
    heading: t('question7'),
    content: t('answer7'),
  },
  {
    id: '8',
    heading: t('question8'),
    content: t('answer8'),
  },
  {
    id: '9',
    heading: t('question9'),
    content: t('answer9'),
  },
  {
    id: '10',
    heading: t('question10'),
    content: t('answer10'),
  },
  {
    id: '11',
    heading: t('question11'),
    content: t('answer11'),
  },
  {
    id: '12',
    heading: t('question12'),
    content: t('answer12'),
  },
  {
    id: '13',
    heading: t('question13'),
    content: t('answer13'),
  },
  {
    id: '14',
    heading: t('question14'),
    content: t('answer14'),
  },
];

export const CommonQuestions: React.FC<CommonQuestionsProps> = ({}) => {
  const [numLines, setNumLines] = useState(0);

  const onTextLayout = (e: any) => {
    const {lines} = e.nativeEvent;
    // The 'lines' property contains information about the lines in the text
    setNumLines(lines.length);
  };
  console.log('line ------ check', numLines);

  return (
    <View style={{ flex: 1}} >
      <BackHeader heading={t('common_question')} />

      <View style={{ marginHorizontal: Metrix.HorizontalSize(20) }} >
        <CustomImage
          source={I18nManager?.isRTL ? Images.ArabicLogo : Images.NMO} // Assuming Images.ArabicLogo is your source
          customStyle={styles.imageStyle}
        />
        <CustomText.LargeSemiBoldText
          customStyle={{
            fontSize: normalizeFont(22),
          }}>
          {t('common_question')}
        </CustomText.LargeSemiBoldText>
      </View>

        <ScrollView contentContainerStyle={styles.scrollViewStyle}>
          {questionData.map(item => (
            <ShowMoreComponent
              key={item.id}
              heading={item.heading}
              content={item.content}
            />
          ))}
        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  flatListContentContainer: {
    flexGrow: 1,
    paddingHorizontal: Metrix.HorizontalSize(15),
    paddingTop: Metrix.VerticalSize(25),
    paddingBottom: Metrix.VerticalSize(40), // Adjust according to your needs
  },
  flatList: {
    flex: 1,
  },
  scrollViewStyle: {
    paddingHorizontal: Metrix.HorizontalSize(15),
    paddingTop: Metrix.VerticalSize(25),
    paddingBottom: 50
  },
  imageStyle: {
    // borderWidth: 1,
    width: Metrix.HorizontalSize(52),
    height: Metrix.VerticalSize(50),
    marginTop: 10
  },
});
