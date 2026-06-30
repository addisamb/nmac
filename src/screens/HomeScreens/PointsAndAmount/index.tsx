import {t} from 'i18next';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {BackHeader, MainContainer, PointCard} from '../../../components';
import {Metrix, Utills} from '../../../config';
import utills from '../../../config/utills';
import {PointAndAmmountData} from '../../../Redux/Action/HomeActions/homeActions';
import {PointAndAmountScreenProps} from '../../propTypes';

export const PointAndAmountScreen: React.FC<PointAndAmountScreenProps> = ({
  ...props
}) => {
  const [data, setData] = useState();

  const PointAndAmmount = useSelector(
    state => state?.HomeReducer?.point_and_ammount,
  );

  const dispatch = useDispatch();
  useEffect(() => {
    getPointAndAmmountData();
  }, []);

  const getPointAndAmmountData = async () => {
    let res = await dispatch(PointAndAmmountData());
    if (res.status) {
      setData(res);
    } else {
      Utills.showToast(res.status, '', 'Something went wronge');
    }
  };

  const [progress, setProgress] = React.useState(0);

  const updateProgress = () => {
    setProgress(progress + 0.1);
  };
  return (
    <>
      <BackHeader heading={t('points_program')} />
      <View style={styles.viewStyle}></View>

      <MainContainer
        mainContainerStyle={{
          position: 'absolute',
          // borderWidth: 1,
          top: -60,
          alignSelf: 'center',
        }}>
        <PointCard pointAndData={data} />
      </MainContainer>
    </>
  );
};

const styles = StyleSheet.create({
  btnImageStyle: {
    width: Metrix.HorizontalSize(24),
    height: Metrix.HorizontalSize(24),
    tintColor: utills.selectedThemeColors().Base,
  },
  headerCustomStyle: {
    backgroundColor: Utills.selectedThemeColors().Primary,
    paddingHorizontal: Metrix.HorizontalSize(10),
    paddingTop: Metrix.VerticalSize(45),
    alignItems: 'center',
  },
  viewStyle: {
    position: 'relative',
    height: Metrix.VerticalSize(50),
    justifyContent: 'space-between',
    paddingVertical: Metrix.VerticalSize(8),
    paddingHorizontal: Metrix.HorizontalSize(15),
    backgroundColor: Utills.selectedThemeColors().Primary,
  },
});
