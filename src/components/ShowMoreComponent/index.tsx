import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Easing,
} from 'react-native';
import React, {useState} from 'react';
import {FontType, Images, Metrix, Utills} from '../../config';
import {CustomImage, CustomText, FadeContainer} from '..';

type ShowMoreComponentProps = {
  heading: string;
  content: string;
};

export const ShowMoreComponent: React.FC<ShowMoreComponentProps> = ({
  heading,
  content,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const animationOpacity = React.useRef(new Animated.Value(0)).current;
  const contentHeight = React.useRef(0);

  const toggleExpansion = () => {
    setIsExpanded(prev => !prev);

    // if (!isExpanded) {
    //   Animated.timing(animationOpacity, {
    //     duration: 300,
    //     toValue: 1, // Fade in
    //     useNativeDriver: false,
    //     easing: Easing.bezier(0.42, 0, 0.58, 1),
    //   }).start();

    //   // Measure content height and set it as max height for the container
    //   if (!contentHeight.current) {
    //     contentHeight.current = content ? content.length * 4 : 0;
    //   }
    // } else {
    //   Animated.timing(animationOpacity, {
    //     duration: 300,
    //     toValue: 0, // Fade out
    //     useNativeDriver: false,
    //     easing: Easing.bezier(0.42, 0, 0.58, 1),
    //   }).start();
    // }
  };

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={toggleExpansion}
        style={[
          styles.headingContainer,
          {
            backgroundColor: isExpanded
              ? Utills.selectedThemeColors().Primary
              : Utills.selectedThemeColors().CourseContainerColor,
          },
        ]}>
        <CustomText.MediumText
          customStyle={[
            styles.headindText,
            {
              color: isExpanded ? '#ffffff' : '#000000',
            },
          ]}>
          {heading || ''}
        </CustomText.MediumText>
        <CustomImage
          source={isExpanded ? Images.CaretCircleUp : Images.CaretCircleDown}
          customStyle={[
            styles.imageStyle,
            {
              tintColor: isExpanded
                ? '#ffffff'
                : Utills.selectedThemeColors().Primary,
            },
          ]}
        />
      </TouchableOpacity>
      {isExpanded && (
        <FadeContainer
          mainViewStyle={{
            borderBottomWidth: 1,
            borderBottomColor: Utills.selectedThemeColors().Grey,
          }}>
          <CustomText.SmallText
            // numberOfLines={4}
            customStyle={{
              padding: Metrix.VerticalSize(10),
            }}>
            {content || ''}
          </CustomText.SmallText>
        </FadeContainer>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  itemsContainer: {
    marginTop: 10,
    overflow: 'hidden',
  },
  headingContainer: {
    padding: Metrix.VerticalSize(10),
    borderRadius: Metrix.VerticalSize(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical:Metrix.VerticalSize(10)
  },
  headindText: {
    fontSize: Metrix.customFontSize(13),
    width: '93%',
  },
  imageStyle: {
    width: Metrix.customImageSize(20),
    height: Metrix.customImageSize(20),
  },
});
