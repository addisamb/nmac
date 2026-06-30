import { t } from 'i18next';
import React, { useRef } from 'react';
import {
  Dimensions,
  I18nManager,
  Image,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { CustomImage, MultipleHeadingComponent } from '..';
import { Images, Metrix, NavigationService, RouteNames } from '../../config';

interface CarouselItem {
  id: string;
  courseMedia: any; // Replace 'any' with your actual courseMedia type
}

interface CarouselComponentProps {
  carouselData: CarouselItem[];
}

export const CustomCarousel: React.FC<CarouselComponentProps> = ({
  carouselData,
}) => {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').width;
  const carouselRef = useRef<Carousel<CarouselItem>>(null);

  console.log('carouselData in custom carousel=====>>>', carouselData);

  const renderItem = ({
    item,
    index,
  }: {
    item: CarouselItem;
    index: number;
  }) => (
    // console.log('carouselData=====>>>', item?._id),
    <TouchableOpacity
      activeOpacity={0.8}
      key={item?._id}
      onPress={() =>
        NavigationService.navigate(RouteNames.HomeRoutes.CourseDetails, {
          objectId: item?._id,
        })
      }
      style={{
        flex: 1,
        // borderWidth: 1,
        borderRadius: Metrix.VerticalSize(10), // Add rounded border
        overflow: 'hidden', // Hide content outside the border
        // justifyContent: 'center',
        // ...Metrix.createShadow,
        // elevation: 5, // Add elevation for a shadow effect
      }}
    >
      <Image
        source={{ uri: item?.courseMedia }}
        resizeMode="cover"
        style={{ width: '100%', height: '100%' }}
      />

      {/* <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          top: '50%',
          //   paddingHorizontal: 20,
          //   marginTop: 10,
          // borderWidth: 1,
          position: 'absolute',
          width: '100%',
          // bottom: Metrix.VerticalSize(80),
        }}
      >
        <TouchableOpacity onPress={() => carouselRef.current?.snapToPrev()}>
          <CustomImage
            source={Images.CircleArrowLeft}
            customStyle={{
              transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => carouselRef.current?.snapToNext()}>
          <CustomImage
            source={Images.CircleArrowRight}
            customStyle={{
              transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
            }}
          />
        </TouchableOpacity>
      </View> */}

      {carouselData && carouselData.length > 1 && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            top: '50%',
            position: 'absolute',
            width: '100%',
          }}
        >
          <TouchableOpacity onPress={() => carouselRef.current?.snapToPrev()}>
            <CustomImage
              source={Images.CircleArrowLeft}
              customStyle={{
                transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => carouselRef.current?.snapToNext()}>
            <CustomImage
              source={Images.CircleArrowRight}
              customStyle={{
                transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
              }}
            />
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={{ position: 'relative' }}>
      <MultipleHeadingComponent
        top={Platform.OS == 'ios' ? -10 : -20}
        heading={t('promos_course')}
        subHeading={t('free_course')}
      />
      <View
        style={{
          paddingHorizontal: Metrix.VerticalSize(15),
          top: Platform.OS == 'ios' ? -10 : -5,
        }}
      >
        <Carousel
          ref={carouselRef}
          sliderWidth={screenWidth}
          sliderHeight={Metrix.VerticalSize(200)}
          itemWidth={screenWidth}
          itemHeight={Metrix.VerticalSize(144)} // Adjust the height as needed
          layout="stack" // Use stack layout
          layoutCardOffset={7} // Adjust this value for the desired position
          vertical
          data={carouselData}
          renderItem={renderItem}
          // lockScrollWhileSnapping
        />

        {/* {carouselData && carouselData.length > 0 && (
          <Carousel
            ref={carouselRef}
            sliderWidth={screenWidth}
            sliderHeight={Metrix.VerticalSize(200)}
            itemWidth={screenWidth}
            itemHeight={Metrix.VerticalSize(144)}
            data={carouselData}
            renderItem={renderItem}
            layout="stack"
            layoutCardOffset={7}
            vertical
          />
        )} */}
      </View>
      {/* Add round buttons */}
    </View>
  );
};
