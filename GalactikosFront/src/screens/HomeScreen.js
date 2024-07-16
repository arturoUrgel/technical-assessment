import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  RefreshControl,
} from 'react-native';
import MatchItem from '../components/molecules/MatchItem';
import {CONSTANTS} from '../utils/constants';
import {COLORS} from '../utils/colors';
import {getMatches} from '../api/apiService';
import toastService from '../events/toastService';
import BlankList from '../components/molecules/BlankList';
import {useFocusEffect} from '@react-navigation/native';

const HomeScreen = () => {
  const [scores, setScores] = useState([]);
  const [summary, setSummary] = useState({});
  const [refreshing, setRefreshing] = useState(true);
  const [connection, setConnection] = useState(false);

  const fetchScores = useCallback(async () => {
    setConnection(true);
    setRefreshing(true);
    const {message, error, matches, summary} = await getMatches();
    setRefreshing(false);
    if (message) {
      toastService.toastError(message);
      setScores([]);
    } else if (error) {
      setConnection(false);
      toastService.toastError(error);
    } else if (matches) {
      setScores(matches?.reverse());
      setSummary(summary);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchScores();
    }, []),
  );

  const onRefresh = useCallback(() => {
    fetchScores();
  }, [fetchScores]);

  return (
    <View style={styles.container}>
      <FlatList
        data={scores}
        renderItem={({item}) => <MatchItem item={item} summary={summary} />}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<BlankList first={connection} load={refreshing} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
    paddingTop: CONSTANTS.headerHeight,
    padding: 20,
  },
});

export default HomeScreen;
