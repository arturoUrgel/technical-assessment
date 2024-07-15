import {memo} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../utils/colors';

const MatchItem = ({item, summary}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.teamTitle}>Team</Text>
      <Text style={styles.teamName}>{item.team}</Text>
      <Icon
        name="football-outline"
        size={50}
        color={COLORS.darkRed}
        style={styles.icon}
      />
      <Text style={styles.scoreLabel}>Match Score</Text>
      <Text style={styles.score}>{item.score}</Text>
      <Text style={styles.scoreLabel}>Total Score</Text>
      <Text style={styles.score}>{summary.total_score_calculated}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 5,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 2,
  },
  teamTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  teamName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.darkRed,
    marginVertical: 10,
  },
  icon: {
    marginVertical: 10,
  },
  scoreLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: 10,
  },
  score: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.darkRed,
    marginVertical: 10,
  },
});

export default memo(MatchItem);
