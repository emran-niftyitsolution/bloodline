import { View, Text, ScrollView, Pressable, Modal, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';

// Mock donor data - replace with actual data from your backend
const mockDonors = [
  {
    id: '1',
    name: 'John Doe',
    gender: 'Male',
    age: 28,
    country: 'USA',
    state: 'New York',
    city: 'New York',
    location: 'New York, NY',
    lastDonation: '2 months ago',
    available: true,
  },
  {
    id: '2',
    name: 'Jane Smith',
    gender: 'Female',
    age: 32,
    country: 'USA',
    state: 'California',
    city: 'Los Angeles',
    location: 'Los Angeles, CA',
    lastDonation: '1 month ago',
    available: true,
  },
  {
    id: '3',
    name: 'Mike Johnson',
    gender: 'Male',
    age: 25,
    country: 'USA',
    state: 'Illinois',
    city: 'Chicago',
    location: 'Chicago, IL',
    lastDonation: '3 months ago',
    available: true,
  },
  {
    id: '4',
    name: 'Sarah Williams',
    gender: 'Female',
    age: 30,
    country: 'USA',
    state: 'Texas',
    city: 'Houston',
    location: 'Houston, TX',
    lastDonation: '1 week ago',
    available: false,
  },
  {
    id: '5',
    name: 'David Brown',
    gender: 'Male',
    age: 35,
    country: 'USA',
    state: 'Arizona',
    city: 'Phoenix',
    location: 'Phoenix, AZ',
    lastDonation: '2 weeks ago',
    available: false,
  },
];

export default function DonorsScreen() {
  const { bloodType } = useLocalSearchParams<{ bloodType: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [showFilters, setShowFilters] = useState(false);
  const [availabilityFilter, setAvailabilityFilter] = useState<'all' | 'available' | 'unavailable'>('all');
  const [genderFilter, setGenderFilter] = useState<'all' | 'male' | 'female'>('all');
  const [countryFilter, setCountryFilter] = useState<string>('');
  const [stateFilter, setStateFilter] = useState<string>('');
  const [cityFilter, setCityFilter] = useState<string>('');
  const [ageSort, setAgeSort] = useState<'none' | 'asc' | 'desc'>('none');

  // Filter donors by blood type (in real app, this would come from API)
  const donors = mockDonors;
  const filteredDonors = donors
    .filter((d) => {
      if (availabilityFilter === 'available' && !d.available) return false;
      if (availabilityFilter === 'unavailable' && d.available) return false;
      return true;
    })
    .filter((d) => {
      if (genderFilter === 'male' && d.gender !== 'Male') return false;
      if (genderFilter === 'female' && d.gender !== 'Female') return false;
      return true;
    })
    .filter((d) => {
      if (countryFilter && !d.country.toLowerCase().includes(countryFilter.toLowerCase())) return false;
      if (stateFilter && !d.state.toLowerCase().includes(stateFilter.toLowerCase())) return false;
      if (cityFilter && !d.city.toLowerCase().includes(cityFilter.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      if (ageSort === 'asc') return a.age - b.age;
      if (ageSort === 'desc') return b.age - a.age;
      return 0;
    });


  return (
    <View className="flex-1">
      <StatusBar style="light" translucent backgroundColor="transparent" />
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
          <View className="flex-row items-center flex-1">
            <Pressable
              onPress={() => router.back()}
              className="mr-3 h-12 w-12 items-center justify-center rounded-full bg-white/20">
              <Ionicons name="arrow-back" size={24} color="#ffffff" />
            </Pressable>
            <Text className="text-3xl font-black text-white">Donors</Text>
          </View>
          <View className="flex-row items-center gap-x-3">
            <View className="h-12 w-12 items-center justify-center rounded-full bg-white/20">
              <Text className="text-xl font-black text-white">{bloodType}</Text>
            </View>
            <Pressable
              onPress={() => setShowFilters(true)}
              className="h-12 w-12 items-center justify-center rounded-full bg-white/20">
              <Ionicons name="filter" size={24} color="#ffffff" />
            </Pressable>
          </View>
        </View>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
        <View className="px-6 pb-10">

          {/* Donors List */}
          <View className="gap-y-4">
            {filteredDonors.map((donor) => {
              const isMale = donor.gender === 'Male';
              const cardColors = isMale
                ? { bg: 'bg-blue-50', border: 'border-blue-200', icon: '#3b82f6', text: 'text-blue-900' }
                : { bg: 'bg-pink-50', border: 'border-pink-200', icon: '#ec4899', text: 'text-pink-900' };

              return (
                <Pressable
                  key={donor.id}
                  className={`overflow-hidden rounded-3xl border-2 ${cardColors.border} ${cardColors.bg} active:opacity-90`}>
                  <View className="px-6 py-5">
                    {/* Gender & Age Header */}
                    <View className="mb-4 flex-row items-center justify-between">
                      <View className="flex-row items-center">
                        <View className={`mr-3 h-12 w-12 items-center justify-center rounded-full ${isMale ? 'bg-blue-100' : 'bg-pink-100'}`}>
                          <Ionicons
                            name={isMale ? 'male' : 'female'}
                            size={24}
                            color={cardColors.icon}
                          />
                        </View>
                        <View>
                          <Text className={`text-lg font-bold ${cardColors.text}`}>
                            {donor.gender}
                          </Text>
                          <Text className={`text-sm ${cardColors.text} opacity-70`}>
                            {donor.age} years old
                          </Text>
                        </View>
                      </View>
                      {donor.available ? (
                        <View className="rounded-full bg-green-100 px-3 py-1.5">
                          <View className="flex-row items-center">
                            <Ionicons name="checkmark-circle" size={16} color="#10b981" />
                            <Text className="ml-1 text-xs font-semibold text-green-700">
                              Available
                            </Text>
                          </View>
                        </View>
                      ) : (
                        <View className="rounded-full bg-yellow-100 px-3 py-1.5">
                          <View className="flex-row items-center">
                            <Ionicons name="time" size={16} color="#f59e0b" />
                            <Text className="ml-1 text-xs font-semibold text-yellow-700">
                              Not Available
                            </Text>
                          </View>
                        </View>
                      )}
                    </View>

                    {/* Details */}
                    <View className="mb-4 gap-y-3">
                      <View className="flex-row items-center">
                        <Ionicons name="location-outline" size={20} color={cardColors.icon} />
                        <Text className={`ml-3 text-sm font-medium ${cardColors.text}`}>
                          {donor.location}
                        </Text>
                      </View>
                      <View className="flex-row items-center">
                        <Ionicons name="time-outline" size={20} color={cardColors.icon} />
                        <Text className={`ml-3 text-sm font-medium ${cardColors.text}`}>
                          Last donation: {donor.lastDonation}
                        </Text>
                      </View>
                    </View>

                    {/* Contact Button */}
                    <Pressable className="overflow-hidden rounded-xl">
                      <LinearGradient
                        colors={isMale ? ['#3b82f6', '#2563eb'] : ['#ec4899', '#db2777']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{
                          paddingVertical: 14,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <View className="flex-row items-center">
                          <Ionicons name="call" size={18} color="#ffffff" />
                          <Text className="ml-2 text-center text-base font-bold text-white">
                            Contact Donor
                          </Text>
                        </View>
                      </LinearGradient>
                    </Pressable>
                  </View>
                </Pressable>
              );
            })}
          </View>

          {filteredDonors.length === 0 && (
            <View className="mt-8 items-center rounded-2xl bg-white px-6 py-12">
              <Ionicons name="people-outline" size={64} color="#9ca3af" />
              <Text className="mt-4 text-lg font-semibold text-gray-900">No donors available</Text>
              <Text className="mt-2 text-center text-sm text-gray-500">
                {availabilityFilter === 'available'
                  ? `No available donors for blood type ${bloodType}.`
                  : `There are currently no donors with blood type ${bloodType} available.`}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Filter Bottom Sheet */}
      <Modal visible={showFilters} transparent animationType="fade" onRequestClose={() => setShowFilters(false)}>
        <Pressable
          onPress={() => setShowFilters(false)}
          className="flex-1 bg-black/40"
          style={{ paddingTop: insets.top, paddingBottom: insets.bottom || 12 }}>
          <Pressable
            className="mt-auto rounded-t-3xl bg-white px-6 pb-8 pt-6"
            onPress={(e) => e.stopPropagation()}>
            <View className="mb-4 flex-row items-center justify-between">
              <Text className="text-xl font-bold text-gray-900">Filters</Text>
              <Pressable onPress={() => setShowFilters(false)} className="h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                <Ionicons name="close" size={20} color="#111827" />
              </Pressable>
            </View>

            {/* Availability */}
            <View className="mb-4">
              <Text className="mb-2 text-sm font-semibold text-gray-700">Availability</Text>
              <View className="flex-row gap-3">
                {[
                  { label: 'All', value: 'all' },
                  { label: 'Available', value: 'available' },
                  { label: 'Unavailable', value: 'unavailable' },
                ].map((opt) => (
                  <Pressable
                    key={opt.value}
                    onPress={() => setAvailabilityFilter(opt.value as typeof availabilityFilter)}
                    className={`rounded-full px-4 py-2 ${availabilityFilter === opt.value ? 'bg-[#dc2626]' : 'bg-gray-100'}`}>
                    <Text
                      className={`text-sm font-semibold ${
                        availabilityFilter === opt.value ? 'text-white' : 'text-gray-800'
                      }`}>
                      {opt.label}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            {/* Gender */}
            <View className="mb-4">
              <Text className="mb-2 text-sm font-semibold text-gray-700">Gender</Text>
              <View className="flex-row gap-3">
                {[
                  { label: 'All', value: 'all' },
                  { label: 'Male', value: 'male' },
                  { label: 'Female', value: 'female' },
                ].map((opt) => (
                  <Pressable
                    key={opt.value}
                    onPress={() => setGenderFilter(opt.value as typeof genderFilter)}
                    className={`rounded-full px-4 py-2 ${genderFilter === opt.value ? 'bg-[#dc2626]' : 'bg-gray-100'}`}>
                    <Text
                      className={`text-sm font-semibold ${
                        genderFilter === opt.value ? 'text-white' : 'text-gray-800'
                      }`}>
                      {opt.label}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            {/* Age Sort */}
            <View className="mb-4">
              <Text className="mb-2 text-sm font-semibold text-gray-700">Age</Text>
              <View className="flex-row gap-3">
                {[
                  { label: 'Default', value: 'none' },
                  { label: 'Youngest', value: 'asc' },
                  { label: 'Oldest', value: 'desc' },
                ].map((opt) => (
                  <Pressable
                    key={opt.value}
                    onPress={() => setAgeSort(opt.value as typeof ageSort)}
                    className={`rounded-full px-4 py-2 ${ageSort === opt.value ? 'bg-[#dc2626]' : 'bg-gray-100'}`}>
                    <Text
                      className={`text-sm font-semibold ${
                        ageSort === opt.value ? 'text-white' : 'text-gray-800'
                      }`}>
                      {opt.label}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            {/* Location */}
            <View className="mb-6">
              <Text className="mb-2 text-sm font-semibold text-gray-700">Location</Text>
              <View className="gap-3">
                <View>
                  <Text className="mb-1.5 text-xs font-medium text-gray-600">Country</Text>
                  <View className="flex-row items-center rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                    <Ionicons name="globe-outline" size={18} color="#9ca3af" />
                    <TextInput
                      className="ml-3 flex-1 text-base text-gray-900"
                      placeholder="Enter country"
                      placeholderTextColor="#9ca3af"
                      value={countryFilter}
                      onChangeText={setCountryFilter}
                    />
                    {countryFilter.length > 0 && (
                      <Pressable onPress={() => setCountryFilter('')} className="ml-2">
                        <Ionicons name="close-circle" size={20} color="#9ca3af" />
                      </Pressable>
                    )}
                  </View>
                </View>
                <View>
                  <Text className="mb-1.5 text-xs font-medium text-gray-600">State</Text>
                  <View className="flex-row items-center rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                    <Ionicons name="map-outline" size={18} color="#9ca3af" />
                    <TextInput
                      className="ml-3 flex-1 text-base text-gray-900"
                      placeholder="Enter state"
                      placeholderTextColor="#9ca3af"
                      value={stateFilter}
                      onChangeText={setStateFilter}
                    />
                    {stateFilter.length > 0 && (
                      <Pressable onPress={() => setStateFilter('')} className="ml-2">
                        <Ionicons name="close-circle" size={20} color="#9ca3af" />
                      </Pressable>
                    )}
                  </View>
                </View>
                <View>
                  <Text className="mb-1.5 text-xs font-medium text-gray-600">City</Text>
                  <View className="flex-row items-center rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                    <Ionicons name="business-outline" size={18} color="#9ca3af" />
                    <TextInput
                      className="ml-3 flex-1 text-base text-gray-900"
                      placeholder="Enter city"
                      placeholderTextColor="#9ca3af"
                      value={cityFilter}
                      onChangeText={setCityFilter}
                    />
                    {cityFilter.length > 0 && (
                      <Pressable onPress={() => setCityFilter('')} className="ml-2">
                        <Ionicons name="close-circle" size={20} color="#9ca3af" />
                      </Pressable>
                    )}
                  </View>
                </View>
              </View>
            </View>

            <View className="flex-row justify-between">
              <Pressable
                onPress={() => {
                  setAvailabilityFilter('all');
                  setGenderFilter('all');
                  setCountryFilter('');
                  setStateFilter('');
                  setCityFilter('');
                  setAgeSort('none');
                }}
                className="mr-3 flex-1 rounded-xl bg-gray-100 px-4 py-3">
                <Text className="text-center text-base font-semibold text-gray-800">Reset</Text>
              </Pressable>
              <Pressable
                onPress={() => setShowFilters(false)}
                className="flex-1 rounded-xl bg-[#dc2626] px-4 py-3">
                <Text className="text-center text-base font-semibold text-white">Apply</Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

