import { t } from 'i18next';
import React, { useCallback, useRef, useState } from 'react';
import {
  FlatList,
  I18nManager,
  Image,
  Platform,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
// Imported from their own folders rather than the '..' barrel. The barrel
// imports this file, so pulling from it created a require cycle — on the cycle's
// second edge the module object resolves to undefined.
import { CustomImage } from '../CustomImage';
import { MultipleHeadingComponent } from '../MultipleHeadingComponent';
import { Images, Metrix, NavigationService, RouteNames } from '../../config';

interface CarouselItem {
  id: string;
  courseMedia: any; // Replace 'any' with your actual courseMedia type
}

interface CarouselComponentProps {
  carouselData: CarouselItem[];
}

/**
 * Was built on react-native-snap-carousel@3.9.1, which references ViewPropTypes
 * — removed from React Native years ago and absent in 0.81. The library threw
 * while being evaluated, leaving this module undefined, so the first render of
 * <CustomCarousel> crashed the app with "Cannot read property 'CustomCarousel'
 * of undefined". That render only happens once a Top Category is selected, which
 * is why tapping a category killed the app.
 *
 * Rebuilt on FlatList: paging, snapping and the prev/next arrows are all native
 * behaviour, so the unmaintained dependency is no longer needed at all.
 */
export const CustomCarousel: React.FC<CarouselComponentProps> = ({
  carouselData,
}) => {
  const { width: screenWidth } = useWindowDimensions();
  const listRef = useRef<FlatList<CarouselItem>>(null);
  const [index, setIndex] = useState(0);

  const ITEM_HEIGHT = Metrix.VerticalSize(144);
  const H_PADDING = Metrix.VerticalSize(15);
  const itemWidth = Math.max(1, screenWidth - H_PADDING * 2);

  const data = Array.isArray(carouselData) ? carouselData : [];

  const goTo = useCallback(
    (next: number) => {
      if (!data.length) return;
      // Wrap around at both ends so the arrows never dead-end.
      const target = (next + data.length) % data.length;
      setIndex(target);
      listRef.current?.scrollToIndex({ index: target, animated: true });
    },
    [data.length],
  );

  const onMomentumEnd = useCallback(
    (e: any) => {
      const x = e?.nativeEvent?.contentOffset?.x ?? 0;
      setIndex(Math.round(x / itemWidth));
    },
    [itemWidth],
  );

  const renderItem = ({ item }: { item: CarouselItem; index: number }) => (
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
        width: itemWidth,
        height: ITEM_HEIGHT,
        borderRadius: Metrix.VerticalSize(10), // Add rounded border
        overflow: 'hidden', // Hide content outside the border
      }}
    >
      <Image
        source={
          // A missing/blank courseMedia used to render a broken empty box.
          item?.courseMedia ? { uri: item.courseMedia } : Images.Course1
        }
        resizeMode="cover"
        style={{ width: '100%', height: '100%' }}
      />

      {/* The prev/next arrows used to be rendered inside every slide, so each
          one carried its own pair. They are now a single overlay below. */}
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
          paddingHorizontal: H_PADDING,
          top: Platform.OS == 'ios' ? -10 : -5,
        }}
      >
        <FlatList
          ref={listRef}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, i) => String(item?._id ?? item?.id ?? i)}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={onMomentumEnd}
          // Fixed-width items, so the list can jump straight to an index
          // without measuring — required for scrollToIndex to be reliable.
          getItemLayout={(_d, i) => ({
            length: itemWidth,
            offset: itemWidth * i,
            index: i,
          })}
          // RTL: RN flips a horizontal list natively, so no manual inversion.
          style={{ height: ITEM_HEIGHT }}
        />

        {data.length > 1 && (
          <View
            pointerEvents="box-none"
            style={{
              position: 'absolute',
              left: H_PADDING,
              right: H_PADDING,
              top: ITEM_HEIGHT / 2 - Metrix.VerticalSize(15),
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity onPress={() => goTo(index - 1)}>
              <CustomImage
                source={Images.CircleArrowLeft}
                customStyle={{
                  transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => goTo(index + 1)}>
              <CustomImage
                source={Images.CircleArrowRight}
                customStyle={{
                  transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
                }}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};
