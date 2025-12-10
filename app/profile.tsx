import Ionicons from '@expo/vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Modal, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export default function ProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [isEditing, setIsEditing] = useState(false);
  const [gender, setGender] = useState<string>('Male');
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(new Date('1990-01-15'));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [bloodGroup, setBloodGroup] = useState<string>('O+');
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    address: '123 Main Street',
    country: 'United States',
    state: 'New York',
    city: 'New York',
    zipCode: '10001',
  });

  const formatDate = (date: Date | null): string => {
    if (!date) return 'DD/MM/YYYY';
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <View className="flex-1">
      <LinearGradient
        colors={['#dc2626', '#991b1b', '#7f1d1d']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      />

      {/* Fixed Header */}
      <View
        className="px-6"
        style={{
          paddingTop: Math.max(insets.top, 20),
          paddingBottom: 16,
          zIndex: 10,
        }}>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Pressable
              onPress={() => router.back()}
              className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-white/20">
              <Ionicons name="arrow-back" size={24} color="#ffffff" />
            </Pressable>
            <Text className="text-3xl font-black text-white">Profile</Text>
          </View>
          <Pressable
            onPress={() => setIsEditing(!isEditing)}
            className="rounded-full bg-white/20 px-4 py-2">
            <Text className="text-base font-semibold text-white">
              {isEditing ? 'Save' : 'Edit'}
            </Text>
          </Pressable>
        </View>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 px-6 pb-10">
          {/* Profile Card */}
          <View className="rounded-3xl bg-white px-8 py-10">
            {/* Profile Picture Section */}
            <View className="mb-8 items-center">
              <View className="mb-4 h-32 w-32 items-center justify-center rounded-full bg-red-100">
                <Ionicons name="person" size={64} color="#dc2626" />
              </View>
              <Text className="text-2xl font-bold text-gray-900">
                {profileData.firstName} {profileData.lastName}
              </Text>
              <View className="mt-2 flex-row items-center">
                <View className="mr-2 h-8 w-16 items-center justify-center rounded-full bg-red-100">
                  <Text className="text-lg font-black text-[#dc2626]">{bloodGroup}</Text>
                </View>
                <Text className="text-base text-gray-600">
                  {profileData.city}, {profileData.state}
                </Text>
              </View>
            </View>

            {/* Profile Information */}
            <View className="gap-y-5">
              {/* First Name */}
              <View>
                <Text className="mb-2 text-sm font-semibold text-gray-700">First Name</Text>
                {isEditing ? (
                  <View className="flex-row items-center rounded-xl border border-gray-200 bg-gray-50 px-4 py-4">
                    <Ionicons name="person-outline" size={20} color="#9ca3af" />
                    <TextInput
                      className="ml-3 flex-1 text-base text-gray-900"
                      value={profileData.firstName}
                      onChangeText={(text) => setProfileData({ ...profileData, firstName: text })}
                    />
                  </View>
                ) : (
                  <View className="flex-row items-center rounded-xl border border-gray-200 bg-gray-50 px-4 py-4">
                    <Ionicons name="person-outline" size={20} color="#9ca3af" />
                    <Text className="ml-3 flex-1 text-base text-gray-900">
                      {profileData.firstName}
                    </Text>
                  </View>
                )}
              </View>

              {/* Last Name */}
              <View>
                <Text className="mb-2 text-sm font-semibold text-gray-700">Last Name</Text>
                {isEditing ? (
                  <View className="flex-row items-center rounded-xl border border-gray-200 bg-gray-50 px-4 py-4">
                    <Ionicons name="person-outline" size={20} color="#9ca3af" />
                    <TextInput
                      className="ml-3 flex-1 text-base text-gray-900"
                      value={profileData.lastName}
                      onChangeText={(text) => setProfileData({ ...profileData, lastName: text })}
                    />
                  </View>
                ) : (
                  <View className="flex-row items-center rounded-xl border border-gray-200 bg-gray-50 px-4 py-4">
                    <Ionicons name="person-outline" size={20} color="#9ca3af" />
                    <Text className="ml-3 flex-1 text-base text-gray-900">
                      {profileData.lastName}
                    </Text>
                  </View>
                )}
              </View>

              {/* Gender Field */}
              <View>
                <Text className="mb-2 text-sm font-semibold text-gray-700">Gender</Text>
                {isEditing ? (
                  <View className="flex-row gap-x-3">
                    <Pressable
                      onPress={() => setGender('Male')}
                      className={`flex-1 flex-row items-center justify-center gap-x-2 rounded-xl border px-4 py-4 ${
                        gender === 'Male'
                          ? 'border-[#dc2626] bg-red-50'
                          : 'border-gray-200 bg-gray-50'
                      }`}>
                      <Ionicons
                        name={gender === 'Male' ? 'radio-button-on' : 'radio-button-off'}
                        size={20}
                        color={gender === 'Male' ? '#dc2626' : '#9ca3af'}
                      />
                      <Text
                        className={`text-base font-medium ${
                          gender === 'Male' ? 'text-[#dc2626]' : 'text-gray-700'
                        }`}>
                        Male
                      </Text>
                    </Pressable>
                    <Pressable
                      onPress={() => setGender('Female')}
                      className={`flex-1 flex-row items-center justify-center gap-x-2 rounded-xl border px-4 py-4 ${
                        gender === 'Female'
                          ? 'border-[#dc2626] bg-red-50'
                          : 'border-gray-200 bg-gray-50'
                      }`}>
                      <Ionicons
                        name={gender === 'Female' ? 'radio-button-on' : 'radio-button-off'}
                        size={20}
                        color={gender === 'Female' ? '#dc2626' : '#9ca3af'}
                      />
                      <Text
                        className={`text-base font-medium ${
                          gender === 'Female' ? 'text-[#dc2626]' : 'text-gray-700'
                        }`}>
                        Female
                      </Text>
                    </Pressable>
                  </View>
                ) : (
                  <View className="flex-row items-center rounded-xl border border-gray-200 bg-gray-50 px-4 py-4">
                    <Ionicons name="person-outline" size={20} color="#9ca3af" />
                    <Text className="ml-3 flex-1 text-base text-gray-900">{gender}</Text>
                  </View>
                )}
              </View>

              {/* Date of Birth Field */}
              <View>
                <Text className="mb-2 text-sm font-semibold text-gray-700">Date of Birth</Text>
                {isEditing ? (
                  <>
                    <Pressable
                      onPress={() => setShowDatePicker(true)}
                      className="flex-row items-center rounded-xl border border-gray-200 bg-gray-50 px-4 py-4">
                      <Ionicons name="calendar-outline" size={20} color="#9ca3af" />
                      <Text
                        className={`ml-3 flex-1 text-base ${
                          dateOfBirth ? 'text-gray-900' : 'text-gray-400'
                        }`}>
                        {formatDate(dateOfBirth)}
                      </Text>
                    </Pressable>
                    {Platform.OS === 'ios' ? (
                      <Modal
                        visible={showDatePicker}
                        transparent={true}
                        animationType="slide"
                        onRequestClose={() => setShowDatePicker(false)}>
                        <View className="flex-1 justify-end bg-black/50">
                          <View className="rounded-t-3xl bg-white p-6">
                            <View className="mb-4 flex-row items-center justify-between">
                              <Pressable onPress={() => setShowDatePicker(false)}>
                                <Text className="text-base font-semibold text-[#dc2626]">
                                  Cancel
                                </Text>
                              </Pressable>
                              <Text className="text-lg font-bold text-gray-900">Select Date</Text>
                              <Pressable
                                onPress={() => {
                                  setShowDatePicker(false);
                                }}>
                                <Text className="text-base font-semibold text-[#dc2626]">Done</Text>
                              </Pressable>
                            </View>
                            <DateTimePicker
                              value={dateOfBirth || new Date()}
                              mode="date"
                              display="spinner"
                              onChange={(event, selectedDate) => {
                                if (selectedDate) {
                                  setDateOfBirth(selectedDate);
                                }
                              }}
                              maximumDate={new Date()}
                              style={{ height: 200 }}
                            />
                          </View>
                        </View>
                      </Modal>
                    ) : (
                      showDatePicker && (
                        <DateTimePicker
                          value={dateOfBirth || new Date()}
                          mode="date"
                          display="default"
                          onChange={(event, selectedDate) => {
                            setShowDatePicker(false);
                            if (event.type === 'set' && selectedDate) {
                              setDateOfBirth(selectedDate);
                            }
                          }}
                          maximumDate={new Date()}
                        />
                      )
                    )}
                  </>
                ) : (
                  <View className="flex-row items-center rounded-xl border border-gray-200 bg-gray-50 px-4 py-4">
                    <Ionicons name="calendar-outline" size={20} color="#9ca3af" />
                    <Text className="ml-3 flex-1 text-base text-gray-900">
                      {formatDate(dateOfBirth)}
                    </Text>
                  </View>
                )}
              </View>

              {/* Blood Group Field */}
              <View>
                <Text className="mb-2 text-sm font-semibold text-gray-700">Blood Group</Text>
                {isEditing ? (
                  <View className="flex-row flex-wrap gap-3">
                    {bloodTypes.map((type) => (
                      <Pressable
                        key={type}
                        onPress={() => setBloodGroup(type)}
                        className={`h-14 min-w-[22%] flex-1 items-center justify-center rounded-xl border ${
                          bloodGroup === type
                            ? 'border-[#dc2626] bg-red-50'
                            : 'border-gray-200 bg-gray-50'
                        }`}>
                        <Text
                          className={`text-base font-bold ${
                            bloodGroup === type ? 'text-[#dc2626]' : 'text-gray-700'
                          }`}>
                          {type}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                ) : (
                  <View className="flex-row items-center rounded-xl border border-gray-200 bg-gray-50 px-4 py-4">
                    <Ionicons name="water-outline" size={20} color="#9ca3af" />
                    <Text className="ml-3 flex-1 text-base text-gray-900">{bloodGroup}</Text>
                  </View>
                )}
              </View>

              {/* Address Field */}
              <View>
                <Text className="mb-2 text-sm font-semibold text-gray-700">Address</Text>
                {isEditing ? (
                  <View className="flex-row items-center rounded-xl border border-gray-200 bg-gray-50 px-4 py-4">
                    <Ionicons name="location-outline" size={20} color="#9ca3af" />
                    <TextInput
                      className="ml-3 flex-1 text-base text-gray-900"
                      value={profileData.address}
                      onChangeText={(text) => setProfileData({ ...profileData, address: text })}
                    />
                  </View>
                ) : (
                  <View className="flex-row items-center rounded-xl border border-gray-200 bg-gray-50 px-4 py-4">
                    <Ionicons name="location-outline" size={20} color="#9ca3af" />
                    <Text className="ml-3 flex-1 text-base text-gray-900">
                      {profileData.address}
                    </Text>
                  </View>
                )}
              </View>

              {/* Country Field */}
              <View>
                <Text className="mb-2 text-sm font-semibold text-gray-700">Country</Text>
                {isEditing ? (
                  <View className="flex-row items-center rounded-xl border border-gray-200 bg-gray-50 px-4 py-4">
                    <Ionicons name="globe-outline" size={20} color="#9ca3af" />
                    <TextInput
                      className="ml-3 flex-1 text-base text-gray-900"
                      value={profileData.country}
                      onChangeText={(text) => setProfileData({ ...profileData, country: text })}
                    />
                  </View>
                ) : (
                  <View className="flex-row items-center rounded-xl border border-gray-200 bg-gray-50 px-4 py-4">
                    <Ionicons name="globe-outline" size={20} color="#9ca3af" />
                    <Text className="ml-3 flex-1 text-base text-gray-900">
                      {profileData.country}
                    </Text>
                  </View>
                )}
              </View>

              {/* State Field */}
              <View>
                <Text className="mb-2 text-sm font-semibold text-gray-700">State</Text>
                {isEditing ? (
                  <View className="flex-row items-center rounded-xl border border-gray-200 bg-gray-50 px-4 py-4">
                    <Ionicons name="map-outline" size={20} color="#9ca3af" />
                    <TextInput
                      className="ml-3 flex-1 text-base text-gray-900"
                      value={profileData.state}
                      onChangeText={(text) => setProfileData({ ...profileData, state: text })}
                    />
                  </View>
                ) : (
                  <View className="flex-row items-center rounded-xl border border-gray-200 bg-gray-50 px-4 py-4">
                    <Ionicons name="map-outline" size={20} color="#9ca3af" />
                    <Text className="ml-3 flex-1 text-base text-gray-900">{profileData.state}</Text>
                  </View>
                )}
              </View>

              {/* City Field */}
              <View>
                <Text className="mb-2 text-sm font-semibold text-gray-700">City</Text>
                {isEditing ? (
                  <View className="flex-row items-center rounded-xl border border-gray-200 bg-gray-50 px-4 py-4">
                    <Ionicons name="business-outline" size={20} color="#9ca3af" />
                    <TextInput
                      className="ml-3 flex-1 text-base text-gray-900"
                      value={profileData.city}
                      onChangeText={(text) => setProfileData({ ...profileData, city: text })}
                    />
                  </View>
                ) : (
                  <View className="flex-row items-center rounded-xl border border-gray-200 bg-gray-50 px-4 py-4">
                    <Ionicons name="business-outline" size={20} color="#9ca3af" />
                    <Text className="ml-3 flex-1 text-base text-gray-900">{profileData.city}</Text>
                  </View>
                )}
              </View>

              {/* Zip Code Field */}
              <View>
                <Text className="mb-2 text-sm font-semibold text-gray-700">Zip Code</Text>
                {isEditing ? (
                  <View className="flex-row items-center rounded-xl border border-gray-200 bg-gray-50 px-4 py-4">
                    <Ionicons name="mail-outline" size={20} color="#9ca3af" />
                    <TextInput
                      className="ml-3 flex-1 text-base text-gray-900"
                      value={profileData.zipCode}
                      onChangeText={(text) => setProfileData({ ...profileData, zipCode: text })}
                      keyboardType="numeric"
                    />
                  </View>
                ) : (
                  <View className="flex-row items-center rounded-xl border border-gray-200 bg-gray-50 px-4 py-4">
                    <Ionicons name="mail-outline" size={20} color="#9ca3af" />
                    <Text className="ml-3 flex-1 text-base text-gray-900">
                      {profileData.zipCode}
                    </Text>
                  </View>
                )}
              </View>

              {/* Phone Field */}
              <View>
                <Text className="mb-2 text-sm font-semibold text-gray-700">Phone Number</Text>
                {isEditing ? (
                  <View className="flex-row items-center rounded-xl border border-gray-200 bg-gray-50 px-4 py-4">
                    <Ionicons name="call-outline" size={20} color="#9ca3af" />
                    <TextInput
                      className="ml-3 flex-1 text-base text-gray-900"
                      value={profileData.phone}
                      onChangeText={(text) => setProfileData({ ...profileData, phone: text })}
                      keyboardType="phone-pad"
                    />
                  </View>
                ) : (
                  <View className="flex-row items-center rounded-xl border border-gray-200 bg-gray-50 px-4 py-4">
                    <Ionicons name="call-outline" size={20} color="#9ca3af" />
                    <Text className="ml-3 flex-1 text-base text-gray-900">{profileData.phone}</Text>
                  </View>
                )}
              </View>

              {/* Email Field */}
              <View>
                <Text className="mb-2 text-sm font-semibold text-gray-700">Email Address</Text>
                {isEditing ? (
                  <View className="flex-row items-center rounded-xl border border-gray-200 bg-gray-50 px-4 py-4">
                    <Ionicons name="mail-outline" size={20} color="#9ca3af" />
                    <TextInput
                      className="ml-3 flex-1 text-base text-gray-900"
                      value={profileData.email}
                      onChangeText={(text) => setProfileData({ ...profileData, email: text })}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>
                ) : (
                  <View className="flex-row items-center rounded-xl border border-gray-200 bg-gray-50 px-4 py-4">
                    <Ionicons name="mail-outline" size={20} color="#9ca3af" />
                    <Text className="ml-3 flex-1 text-base text-gray-900">{profileData.email}</Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
