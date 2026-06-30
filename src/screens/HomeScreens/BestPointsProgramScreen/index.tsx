import {FlatList, StyleSheet} from 'react-native';
import {
  BackHeader,
  MainContainer,
  RoundBorderCardComponent,
} from '../../../components';
import {
  Images,
  RouteNames,
  NavigationService,
  Utills,
  FontType,
  Metrix,
} from '../../../config';

import {t} from 'i18next';
import {BestPointsProgramProps} from '../../propTypes';
import utills from '../../../config/utills';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { NewCoursesData, TopPointReciver } from '../../../Redux/Action/HomeActions/homeActions';
import { EmptyListChat } from '../../../components/CourseCardsHorizontalList';

export const BestPointsProgram: React.FC<BestPointsProgramProps> = ({}) => {
  
  const TopPointReciverData = useSelector(state => state?.HomeReducer?.top_point_receiver);
  const dispatch = useDispatch();

  useEffect(() => {
    getTopPointReciver();
  }, []); 

  const getTopPointReciver = async () => {
    await dispatch(TopPointReciver());
  };
  
  return (
    <>
      <BackHeader heading={t("best_points_program_members")} />
      <MainContainer>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={TopPointReciverData?.data}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={EmptyListChat}
          renderItem={({item, index}) => (
            console.log("RENDER ITEM===>",item),            
            <RoundBorderCardComponent
              isSecondaryButton={true}
              key={index}
              customTextStyle={{ marginLeft: 10 }}
              image={ item?.userImage == undefined ? Images.user2 : { uri: item?.userImage } }
              text={item.userName}
              subtext={item.replies}
              amount={`${item?.totalCoins * 5}  ${t('points')}`}
            />
          )}
        />
      </MainContainer>
    </>
  );
};
const styles = StyleSheet.create({});
