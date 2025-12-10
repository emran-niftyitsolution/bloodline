import { View, Text, ScrollView, Pressable, TextInput, Modal, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export default function CreateDonationScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [bloodGroup, setBloodGroup] = useState<string>('');
  const [donationDate, setDonationDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');

  const formatDate = (date: Date | null): string => {
    if (!date) return 'DD/MM/YYYY';
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = () => {
    // Handle donation creation logic here
    // For now, just navigate back
    router.back();
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
        <View className="flex-row items-center">
          <Pressable
            onPress={() => router.back()}
            className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-white/20">
            <Ionicons name="arrow-back" size={24} color="#ffffff" />
          </Pressable>
          <Text className="text-3xl font-black text-white">Create Donation</Text>
        </View>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 px-6 pb-10">
          {/* Form Card */}
          <View className="rounded-[40px] bg-white px-8 py-10">
            <View className="mb-8">
              <Text className="mb-1 text-2xl font-bold text-gray-900">New Donation</Text>
              <Text className="text-base text-gray-500">Record your blood donation</Text>
            </View>

            <View className="gap-y-5">
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

              {/* Donation Date Field */}
              <View>
                <Text className="mb-2 text-sm font-semibold text-gray-700">Donation Date</Text>
                <Pressable
                  onPress={() => setShowDatePicker(true)}
                  className="flex-row items-center rounded-xl border border-gray-200 bg-gray-50 px-4 py-4">
                  <Ionicons name="calendar-outline" size={20} color="#9ca3af" />
                  <Text
                    className={`ml-3 flex-1 text-base ${
                      donationDate ? 'text-gray-900' : 'text-gray-400'
                    }`}>
                    {formatDate(donationDate)}
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
                          value={donationDate || new Date()}
                          mode="date"
                          display="spinner"
                          onChange={(event, selectedDate) => {
                            if (selectedDate) {
                              setDonationDate(selectedDate);
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
                      value={donationDate || new Date()}
                      mode="date"
                      display="default"
                      onChange={(event, selectedDate) => {
                        setShowDatePicker(false);
                        if (event.type === 'set' && selectedDate) {
                          setDonationDate(selectedDate);
                        }
                      }}
                      maximumDate={new Date()}
                    />
                  )
                )}
              </View>

              {/* Location Field */}
              <View>
                <Text className="mb-2 text-sm font-semibold text-gray-700">Location</Text>
                <View className="flex-row items-center rounded-xl border border-gray-200 bg-gray-50 px-4 py-4">
                  <Ionicons name="location-outline" size={20} color="#9ca3af" />
                  <TextInput
                    className="ml-3 flex-1 text-base text-gray-900"
                    placeholder="Enter donation location"
                    placeholderTextColor="#9ca3af"
                    value={location}
                    onChangeText={setLocation}
                  />
                </View>
              </View>

              {/* Notes Field */}
              <View>
                <Text className="mb-2 text-sm font-semibold text-gray-700">Notes (Optional)</Text>
                <View className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-4">
                  <TextInput
                    className="min-h-[100px] text-base text-gray-900"
                    placeholder="Add any additional notes..."
                    placeholderTextColor="#9ca3af"
                    value={notes}
                    onChangeText={setNotes}
                    multiline
                    textAlignVertical="top"
                  />
                </View>
              </View>

              {/* Submit Button */}
              <Pressable
                onPress={handleSubmit}
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
                  <Text className="text-center text-lg font-bold text-white">Create Donation</Text>
                </LinearGradient>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

