import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Search } from 'lucide-react-native';
import OpenSans from '../../constants/Fonts';

const SearchInput = props => {
  return (
    <View style={styles.container}>
      {/* 🔍 Search Icon */}
      <View style={styles.iconWrapper}>
        <Search size={wp('5%')} color="#777" />
      </View>

      {/* 📝 Text Input */}
      <TextInput
        style={styles.input}
        placeholder="Search trainer"
        placeholderTextColor="#999"
        value={props.value}
        onChangeText={props.onChangeText}
        editable={!props.disabled}
      />
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: wp('3%'),
    paddingHorizontal: wp('4%'),
    height: hp('6.5%'),
    borderWidth: 1,
    borderColor: '#ddd',
  },

  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp('2.5%'),
  },

  input: {
    flex: 1,
    fontFamily: OpenSans.Regular,
    fontSize: wp('4%'),
    color: '#000',
  },
});
