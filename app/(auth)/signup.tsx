import Ionicons from '@expo/vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Modal, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export default function SignUpScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [gender, setGender] = useState<string>('');
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [bloodGroup, setBloodGroup] = useState<string>('');

  const formatDate = (date: Date | null): string => {
    if (!date) return 'DD/MM/YYYY';
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <View
      className="flex-1"
      style={{
        paddingTop: insets.top || 0,
        paddingBottom: insets.bottom || 0,
      }}>
      <StatusBar style="light" translucent backgroundColor="transparent" />
      <LinearGradient
        colors={['#dc2626', '#991b1b', '#7f1d1d']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      />

      <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
        <View className="min-h-screen flex-1 flex-col pb-10 pt-4">
          {/* Top Section with Logo */}
          <View className="items-center">
            <View className="mb-6 flex-row items-center justify-center gap-x-2">
              <View className="h-12 w-12 items-center justify-center rounded-full bg-white">
                <Ionicons name="water" size={24} color="#dc2626" />
              </View>
              <Text className="text-3xl font-black text-white">BloodBooth</Text>
            </View>
          </View>

          {/* Form Card */}
          <View className="flex-1 rounded-t-3xl bg-white px-6 pb-8 pt-10">
            <View className="mb-8">
              <Text className="mb-1 text-2xl font-bold text-gray-900">Sign Up</Text>
              <Text className="text-base text-gray-500">Create your account to get started</Text>
            </View>

            <View className="gap-y-4">
              {/* First Name Field */}
              <View>
                <Text className="mb-2 text-sm font-semibold text-gray-700">First Name</Text>
                <View className="flex-row items-center rounded-xl border border-gray-200 bg-gray-50 px-4 py-4">
                  <Ionicons name="person-outline" size={20} color="#9ca3af" />
                  <TextInput
                    className="ml-3 flex-1 text-base text-gray-900"
                    placeholder="Enter first name"
                    placeholderTextColor="#9ca3af"
                  />
                </View>
              </View>

              {/* Last Name Field */}
              <View>
                <Text className="mb-2 text-sm font-semibold text-gray-700">Last Name</Text>
                <View className="flex-row items-center rounded-xl border border-gray-200 bg-gray-50 px-4 py-4">
                  <Ionicons name="person-outline" size={20} color="#9ca3af" />
                  <TextInput
                    className="ml-3 flex-1 text-base text-gray-900"
                    placeholder="Enter last name"
                    placeholderTextColor="#9ca3af"
                  />
                </View>
              </View>

              {/* Gender Field */}
              <View>
                <Text className="mb-2 text-sm font-semibold text-gray-700">Gender</Text>
                <View className="flex-row gap-x-3">
                  <Pressable
                    onPress={() => setGender('male')}
                    className={`flex-1 flex-row items-center justify-center gap-x-2 rounded-xl border px-4 py-4 ${
                      gender === 'male'
                        ? 'border-[#dc2626] bg-red-50'
                        : 'border-gray-200 bg-gray-50'
                    }`}>
                    <Ionicons
                      name={gender === 'male' ? 'radio-button-on' : 'radio-button-off'}
                      size={20}
                      color={gender === 'male' ? '#dc2626' : '#9ca3af'}
                    />
                    <Text
                      className={`text-base font-medium ${
                        gender === 'male' ? 'text-[#dc2626]' : 'text-gray-700'
                      }`}>
                      Male
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => setGender('female')}
                    className={`flex-1 flex-row items-center justify-center gap-x-2 rounded-xl border px-4 py-4 ${
                      gender === 'female'
                        ? 'border-[#dc2626] bg-red-50'
                        : 'border-gray-200 bg-gray-50'
                    }`}>
                    <Ionicons
                      name={gender === 'female' ? 'radio-button-on' : 'radio-button-off'}
                      size={20}
                      color={gender === 'female' ? '#dc2626' : '#9ca3af'}
                    />
                    <Text
                      className={`text-base font-medium ${
                        gender === 'female' ? 'text-[#dc2626]' : 'text-gray-700'
                      }`}>
                      Female
                    </Text>
                  </Pressable>
                </View>
              </View>

              {/* Date of Birth Field */}
              <View>
                <Text className="mb-2 text-sm font-semibold text-gray-700">Date of Birth</Text>
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
                            <Text className="text-base font-semibold text-[#dc2626]">Cancel</Text>
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
              </View>

              {/* Blood Group Field */}
              <View>
                <Text className="mb-2 text-sm font-semibold text-gray-700">Blood Group</Text>
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
              </View>

              {/* Address Field */}
              <View>
                <Text className="mb-2 text-sm font-semibold text-gray-700">Address</Text>
                <View className="flex-row items-center rounded-xl border border-gray-200 bg-gray-50 px-4 py-4">
                  <Ionicons name="location-outline" size={20} color="#9ca3af" />
                  <TextInput
                    className="ml-3 flex-1 text-base text-gray-900"
                    placeholder="Enter your address"
                    placeholderTextColor="#9ca3af"
                  />
                </View>
              </View>

              {/* Country Field */}
              <View>
                <Text className="mb-2 text-sm font-semibold text-gray-700">Country</Text>
                <View className="flex-row items-center rounded-xl border border-gray-200 bg-gray-50 px-4 py-4">
                  <Ionicons name="globe-outline" size={20} color="#9ca3af" />
                  <TextInput
                    className="ml-3 flex-1 text-base text-gray-900"
                    placeholder="Enter your country"
                    placeholderTextColor="#9ca3af"
                  />
                </View>
              </View>

              {/* State Field */}
              <View>
                <Text className="mb-2 text-sm font-semibold text-gray-700">State</Text>
                <View className="flex-row items-center rounded-xl border border-gray-200 bg-gray-50 px-4 py-4">
                  <Ionicons name="map-outline" size={20} color="#9ca3af" />
                  <TextInput
                    className="ml-3 flex-1 text-base text-gray-900"
                    placeholder="Enter your state"
                    placeholderTextColor="#9ca3af"
                  />
                </View>
              </View>

              {/* City Field */}
              <View>
                <Text className="mb-2 text-sm font-semibold text-gray-700">City</Text>
                <View className="flex-row items-center rounded-xl border border-gray-200 bg-gray-50 px-4 py-4">
                  <Ionicons name="business-outline" size={20} color="#9ca3af" />
                  <TextInput
                    className="ml-3 flex-1 text-base text-gray-900"
                    placeholder="Enter your city"
                    placeholderTextColor="#9ca3af"
                  />
                </View>
              </View>

              {/* Zip Code Field */}
              <View>
                <Text className="mb-2 text-sm font-semibold text-gray-700">Zip Code</Text>
                <View className="flex-row items-center rounded-xl border border-gray-200 bg-gray-50 px-4 py-4">
                  <Ionicons name="mail-outline" size={20} color="#9ca3af" />
                  <TextInput
                    className="ml-3 flex-1 text-base text-gray-900"
                    placeholder="Enter your zip code"
                    placeholderTextColor="#9ca3af"
                    keyboardType="numeric"
                  />
                </View>
              </View>

              {/* Phone Field */}
              <View>
                <Text className="mb-2 text-sm font-semibold text-gray-700">Phone Number</Text>
                <View className="flex-row items-center rounded-xl border border-gray-200 bg-gray-50 px-4 py-4">
                  <Ionicons name="call-outline" size={20} color="#9ca3af" />
                  <TextInput
                    className="ml-3 flex-1 text-base text-gray-900"
                    placeholder="Enter phone number"
                    placeholderTextColor="#9ca3af"
                    keyboardType="phone-pad"
                  />
                </View>
              </View>

              {/* Email Field */}
              <View>
                <Text className="mb-2 text-sm font-semibold text-gray-700">Email Address</Text>
                <View className="flex-row items-center rounded-xl border border-gray-200 bg-gray-50 px-4 py-4">
                  <Ionicons name="mail-outline" size={20} color="#9ca3af" />
                  <TextInput
                    className="ml-3 flex-1 text-base text-gray-900"
                    placeholder="Enter your email"
                    placeholderTextColor="#9ca3af"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              {/* Password Field */}
              <View>
                <Text className="mb-2 text-sm font-semibold text-gray-700">Password</Text>
                <View className="flex-row items-center rounded-xl border border-gray-200 bg-gray-50 px-4 py-4">
                  <Ionicons name="lock-closed-outline" size={20} color="#9ca3af" />
                  <TextInput
                    className="ml-3 flex-1 text-base text-gray-900"
                    placeholder="Create a password"
                    placeholderTextColor="#9ca3af"
                    secureTextEntry
                  />
                </View>
              </View>

              {/* Confirm Password Field */}
              <View>
                <Text className="mb-2 text-sm font-semibold text-gray-700">Confirm Password</Text>
                <View className="flex-row items-center rounded-xl border border-gray-200 bg-gray-50 px-4 py-4">
                  <Ionicons name="lock-closed-outline" size={20} color="#9ca3af" />
                  <TextInput
                    className="ml-3 flex-1 text-base text-gray-900"
                    placeholder="Confirm your password"
                    placeholderTextColor="#9ca3af"
                    secureTextEntry
                  />
                </View>
              </View>

              {/* Terms */}
              <Text className="text-sm leading-5 text-gray-500">
                By signing up, you agree to our{' '}
                <Text className="font-semibold text-[#dc2626]">Terms &amp; Conditions</Text> and{' '}
                <Text className="font-semibold text-[#dc2626]">Privacy Policy</Text>
              </Text>

              {/* Sign Up Button */}
              <Pressable
                onPress={() => router.push('/(tabs)')}
                className="mt-2 overflow-hidden rounded-xl active:opacity-90">
                <LinearGradient
                  colors={['#dc2626', '#b91c1c']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    paddingVertical: 16,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text className="text-center text-lg font-bold text-white">Create Account</Text>
                </LinearGradient>
              </Pressable>
            </View>

            {/* Sign In Link */}
            <View className="mt-8 flex-row justify-center gap-x-1">
              <Text className="text-base text-gray-600">Already have an account?</Text>
              <Link href="/(auth)/login" className="text-base font-bold text-[#dc2626]">
                Sign In
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
