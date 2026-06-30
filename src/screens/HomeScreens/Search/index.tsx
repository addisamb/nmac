import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Keyboard,
  TextInput,
  RefreshControl,
} from 'react-native';
import React, {useCallback, useDebugValue, useEffect, useRef, useState} from 'react';
import {SearchProps} from '../../propTypes';
import {
  CardStyledComponent,
  CategoryBtnsList,
  CourseCardsHorizontalList,
  CustomSearchBar,
  CustomText,
  MainContainer,
} from '../../../components';
import {t} from 'i18next';
import {Searchbar} from 'react-native-paper';
import {Images, Metrix, RouteNames} from '../../../config';
import {useDispatch, useSelector} from 'react-redux';
import {GetCourseBySearch} from '../../../Redux/Action/SearchActions/SearchActions';
import {FlatList} from 'react-native';
import navigationService from '../../../config/navigationService';
import {CourseListDataType} from '../../../components/CourseCardsHorizontalList';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import { getCategories, likeAndUnlikeCourse, toggleFavorite } from '../../../Redux/Action/HomeActions/homeActions';

export const Search: React.FC<SearchProps> = ({route}) => {
  const dispatch = useDispatch();
  const {randomKey} = route.params;
  const isFocused = useIsFocused();

  const keyboardOpen = useRef(null);

  const courseList = useSelector(state => state?.HomeReducer?.courseList);
  const categoryarray = useSelector(state => state?.HomeReducer?.categoryList);

  const [isSearchActive, setIsSearchActive] = useState(false);
  const [search, setSearch] = useState('');
  const [searchData, setsearchData] = useState([]);
  const [arr, setArr] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

    console.log(searchData, '====>>>');

  useEffect(() => {
    if (isFocused) {
      keyboardOpen?.current?.focus();
    }
  }, [isFocused]);

  async function filterWithId(txt: string, id: string, condition: boolean) {
    if (id == '') {
      var newArr = [...arr];
      setArr(newArr);
    } else if (arr.includes(id)) {
      // If it exists, remove all occurrences of the ID from the array
      var newArr = arr.filter(item => item !== id);
      setArr(newArr);
    } else {
      // If it doesn't exist, add the ID and its lowercase version to the array
      var newArr = [...arr, id];
      setArr(newArr);
    }

    setSearch(txt);

    if (txt?.length == 0 && !condition && newArr?.length == 0) {
      setIsSearchActive(false);
      return;
    } else if (newArr?.length == 0 && condition && txt?.length == 0) {
      setIsSearchActive(false);
      setSearch('');
      return;
    }

    let payload = {
      searchQuery: txt,
      categoryIDs: JSON.stringify(newArr),
    };

    let res = await dispatch(GetCourseBySearch(payload));

    setsearchData(res?.responseData);
    setIsSearchActive(true); //after remove text field and write agi so for this i write this condition
  }

  async function courselikeAndUnlike(ID: any) {

    let payload = {
      courseID: ID,
    };
    let res = await dispatch(likeAndUnlikeCourse(payload));
    if (res?.status) {
      dispatch(toggleFavorite('popularCourses', ID));
      dispatch(toggleFavorite('trendingCourses', ID));
      dispatch(toggleFavorite('recommendedCourses', ID));
      dispatch(toggleFavorite('newCourses', ID));
    }
  }

  async function courselikeAndUnlikeonSearchData(ID: any) {

    let payload = {
      courseID: ID,
    };
    let res = await dispatch(likeAndUnlikeCourse(payload));
    if (res?.status) {
      dispatch(toggleFavorite('popularCourses', ID));
      dispatch(toggleFavorite('trendingCourses', ID));
      dispatch(toggleFavorite('recommendedCourses', ID));
      dispatch(toggleFavorite('newCourses', ID));
    }

    // setsearchData((prevCourses) =>{
     let updatedArray =  searchData.map((course) =>
      course._id === ID
        ? { ...course, isFavourite: !course.isFavourite }
        : course
    )

    setsearchData(updatedArray)

  // });

  }

  const renderItem = ({item}: {item: CourseListDataType[number]}) => {
    return (
      <CardStyledComponent
        courseItem={item}
        onHeartBtnPress={courselikeAndUnlikeonSearchData}
        customCardContainerStyles={{
          width: '49%',
          marginBottom: Metrix.HorizontalSize(10),
        }}
      />
    );
  };

  const PressCross = () => {
    if (arr?.length) {
      setSearch('');
    } else {
      setIsSearchActive(false);
      setSearch('');
      setArr([]);
    }
    return;
  };

  async function getCategoryList() {
    let res = await dispatch(getCategories());
    return res.status
  }


  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate a fetch operation (replace this with your actual data fetching logic)
    setTimeout(() => {
      getCategoryList();
      setRefreshing(false); // Set refreshing to false when done
    }, 1000);
  }, []);

  function onBlurShowInitilState() {
    // if (!search.length) {
    //   setIsSearchActive(false)
    // }
  }

  return (
    <MainContainer isFlatList>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        } 
        showsVerticalScrollIndicator={false}>
        
        <View>
          <View>
            <CustomText.MediumText
              customStyle={{
                fontWeight: '700',
              }}>
              {t('search2')}
            </CustomText.MediumText>
            <CustomSearchBar
              inputRef={keyboardOpen}
              customStyle={{
                fontWeight: '700',
              }}
              activeOpacity={1}
              onCrossBtnPress={PressCross}
              showCrossIcon={search?.length ? true : false}
              value={search}

              onChangeText={x => {
                filterWithId(x, '', false);
              }}
              onFocus={() => {
                setIsSearchActive(true);
              }}
              
              onBlur={()=>{ onBlurShowInitilState() }}
              onPress={() => setIsSearchActive(true)}
              autoFocus
            />
            <CategoryBtnsList
              onPresstoGetId={id => filterWithId(search, id, true)}
              listData={categoryarray}
              isAllCoursesHeading={false}
            />

            {isSearchActive ? (
              <View>
                <FlatList
                  data={searchData}
                  renderItem={renderItem}
                  ListEmptyComponent={<Text style={{ textAlign: "center", marginTop: 20 }} >{t('No Result Founds')}</Text>}
                  style={{
                    paddingVertical: Metrix.VerticalSize(10),
                  }}
                  numColumns={2}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={item => item?._id}
                />
              </View>
            ) : (
              <View>
                {courseList &&
                  courseList?.map((section: object, index: number) => (
                    <>
                      <View>
                        {section?.trendingCourses && (
                          <CourseCardsHorizontalList
                          onHeartBtnPress={courselikeAndUnlike}
                            courseData={section?.trendingCourses}
                            heading={t('trending_course')}
                            onPressCoursesBtn={() => {
                              navigationService.navigate(
                                RouteNames.HomeRoutes.AllCourseScreen,
                                {
                                  screenName: t('trending_course'), // Pass the heading dynamically
                                  trendingCourses: section.trendingCourses,
                                  key: 'trending'
                                },
                              );
                            }}
                            isHorizontal
                          />
                        )}
                      </View>

                      <View>
                        {section?.popularCourses && (
                          <CourseCardsHorizontalList
                            onHeartBtnPress={courselikeAndUnlike}
                            courseData={section?.popularCourses}
                            heading={t('popular_course')}
                            onPressCoursesBtn={() => {
                              navigationService.navigate(
                                RouteNames.HomeRoutes.AllCourseScreen,
                                {
                                  screenName: t('popular_course'), // Pass the heading dynamically
                                  popularCourses: section.popularCourses,
                                  key: 'popular'
                                },
                              );
                            }}
                            isHorizontal
                          />
                        )}

                        {section?.popularCourses && (
                          <CourseCardsHorizontalList
                          onHeartBtnPress={courselikeAndUnlike}
                            courseData={section?.popularCourses}
                            heading={t('participants_view_also')}
                            isAllCoursesHeading={false}
                            customCardContainerStyles={{
                              width: '49%',
                              marginBottom: Metrix.HorizontalSize(10),
                            }}
                          />
                        )}
                      </View>
                    </>
                  ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </MainContainer>
  );
};

interface SearchStyles {}
const styles = StyleSheet.create<SearchStyles>({});