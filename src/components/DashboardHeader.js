import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import OpenSans from '../constants/Fonts';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Bell } from 'lucide-react-native';
import SearchInput from './common/SearchInput';

const DashboardHeader = props => {
  const [search, setSearch] = useState('');
  return (
    <View style={styles.container}>
      {/* 👤 Profile + Text */}
      <View style={styles.profileSection}>
        {/* Profile Image / Placeholder */}
        {props.imageUrl ? (
          <Image source={{ uri: props.imageUrl }} style={styles.avatar} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>👤</Text>
          </View>
        )}

        {/* Text Section */}
        <View style={styles.textWrapper}>
          <Text style={styles.greeting}>Hi</Text>
          <Text style={styles.username}>{props.username}</Text>
        </View>
      </View>
      {/* 🔔 Bell Icon */}
      <Pressable style={styles.iconWrapper}>
        <Bell size={wp('6%')} color="#000" />
      </Pressable>
      <View style={styles.searchWrapper}>
        <SearchInput value={search} onChangeText={setSearch} />
      </View>
    </View>
  );
};

export default DashboardHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('2%'),
    backgroundColor: '#fff',
    // backgroundColor: 'red',
  },

  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp('4%'),
  },

  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  avatar: {
    width: wp('12%'),
    height: wp('12%'),
    borderRadius: wp('6%'),
    marginRight: wp('3%'),
  },

  placeholder: {
    width: wp('12%'),
    height: wp('12%'),
    borderRadius: wp('6%'),
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp('3%'),
  },

  placeholderText: {
    fontSize: wp('5%'),
  },

  textWrapper: {
    flexDirection: 'column',
  },

  greeting: {
    fontFamily: OpenSans.Regular,
    fontSize: wp('4.5%'),
    color: '#666',
  },

  username: {
    fontFamily: OpenSans.Bold,
    fontSize: wp('4.5%'),
    color: '#000',
  },
  searchWrapper: {
    paddingVertical: hp('3%'),
    // flexDirection: 'column',
    width: '100%',
  },
});
