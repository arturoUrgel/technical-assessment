import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import * as yup from 'yup';
import {useFormik} from 'formik';
import {COLORS} from '../utils/colors';
import toastService from '../events/toastService';
import {addMatch} from '../api/apiService';
import {CONSTANTS} from '../utils/constants';

const validationSchema = yup.object().shape({
  team: yup.string().required('Team name is required'),
  yellow_cards: yup
    .number()
    .typeError('Yellow cards must be a number')
    .required('Yellow cards are required')
    .integer('Yellow cards must be an integer')
    .min(0, 'Yellow cards cannot be negative'),
  shots: yup
    .number()
    .typeError('Shots must be a number')
    .required('Shots are required')
    .integer('Shots must be an integer')
    .min(0, 'Shots cannot be negative'),
  goals: yup
    .number()
    .typeError('Goals must be a number')
    .required('Goals are required')
    .integer('Goals must be an integer')
    .min(0, 'Goals cannot be negative'),
});

const AddMatchForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    touched,
    errors,
    validateForm,
    resetForm,
  } = useFormik({
    initialValues: {
      team: '',
      yellow_cards: '',
      shots: '',
      goals: '',
    },
    validationSchema,
    onSubmit: async values => {
      setIsLoading(true);
      values.goals = parseInt(values.goals, 10);
      values.yellow_cards = parseInt(values.yellow_cards, 10);
      values.shots = parseInt(values.shots, 10);
      const response = await addMatch(values);
      const {message, match, error} = response;
      setIsLoading(false);
      resetForm();
      if (message) {
        toastService.toastError('Error', message);
      } else if (match) {
        toastService.toastGood(
          'Congratulations!',
          'You have added a new match',
        );
      } else if (error) {
        toastService.toastError('Error', error);
      }
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Team</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Team Name"
        onChangeText={handleChange('team')}
        value={values.team}
        onBlur={handleBlur('team')}
      />
      {touched.team && errors.team && (
        <Text style={styles.errorText}>{errors.team}</Text>
      )}

      <Text style={styles.label}>Yellow Cards</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Yellow Cards"
        onChangeText={handleChange('yellow_cards')}
        value={values.yellow_cards}
        keyboardType="numeric"
        onBlur={handleBlur('yellow_cards')}
      />
      {touched.yellow_cards && errors.yellow_cards && (
        <Text style={styles.errorText}>{errors.yellow_cards}</Text>
      )}

      <Text style={styles.label}>Shots</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Shots"
        onChangeText={handleChange('shots')}
        value={values.shots}
        keyboardType="numeric"
        onBlur={handleBlur('shots')}
      />
      {touched.shots && errors.shots && (
        <Text style={styles.errorText}>{errors.shots}</Text>
      )}

      <Text style={styles.label}>Goals</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Goals"
        onChangeText={handleChange('goals')}
        value={values.goals}
        keyboardType="numeric"
        onBlur={handleBlur('goals')}
      />
      {touched.goals && errors.goals && (
        <Text style={styles.errorText}>{errors.goals}</Text>
      )}

      <View style={styles.buttonContainer}>
        <Button
          color={COLORS.primary}
          title="Submit"
          onPress={() => {
            validateForm().then(handleSubmit);
          }}
        />
      </View>

      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: CONSTANTS.headerHeight + 40,
    backgroundColor: COLORS.white,
  },
  label: {
    alignSelf: 'flex-start',
    marginBottom: 5,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  input: {
    height: 40,
    borderColor: COLORS.primary,
    borderWidth: 1,
    marginBottom: 2,
    paddingHorizontal: 10,
    width: '100%',
    borderRadius: 5,
    backgroundColor: COLORS.white,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 5,
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default AddMatchForm;
