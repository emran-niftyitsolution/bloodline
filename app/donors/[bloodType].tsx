import { View, Text, ScrollView, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams, useRouter } from 'expo-router';

// Mock donor data - replace with actual data from your backend
const mockDonors = [
  { id: '1', name: 'John Doe', age: 28, location: 'New York, NY', lastDonation: '2 months ago' },
  { id: '2', name: 'Jane Smith', age: 32, location: 'Los Angeles, CA', lastDonation: '1 month ago' },
  { id: '3', name: 'Mike Johnson', age: 25, location: 'Chicago, IL', lastDonation: '3 months ago' },
  { id: '4', name: 'Sarah Williams', age: 30, location: 'Houston, TX', lastDonation: '1 week ago' },
  { id: '5', name: 'David Brown', age: 35, location: 'Phoenix, AZ', lastDonation: '2 weeks ago' },
];

export default function DonorsScreen() {
  const { bloodType } = useLocalSearchParams<{ bloodType: string }>();
  const router = useRouter();

  // Filter donors by blood type (in real app, this would come from API)
  const donors = mockDonors;

  return (
    <View className="flex-1">
      <LinearGradient
        colors={['#dc2626', '#991b1b', '#7f1d1d']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      />

      <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 px-6 pt-20 pb-10">
          {/* Header */}
          <View className="mb-6 flex-row items-center">
            <Pressable
              onPress={() => router.back()}
              className="mr-4 h-10 w-10 items-center justify-center rounded-full bg-white/20">
              <Ionicons name="arrow-back" size={24} color="#ffffff" />
            </Pressable>
            <View className="flex-1">
              <Text className="text-3xl font-black text-white">Blood Type {bloodType}</Text>
              <Text className="mt-1 text-base font-medium text-white/80">
                {donors.length} donor{donors.length !== 1 ? 's' : ''} available
              </Text>
            </View>
          </View>

          {/* Donors List */}
          <View className="gap-y-4">
            {donors.map((donor) => (
              <Pressable
                key={donor.id}
                className="overflow-hidden rounded-2xl border border-white/20 bg-white active:opacity-90">
                <View className="px-6 py-5">
                  <View className="mb-3 flex-row items-center justify-between">
                    <View className="flex-1">
                      <Text className="text-xl font-bold text-gray-900">{donor.name}</Text>
                      <Text className="mt-1 text-sm text-gray-500">Age: {donor.age} years</Text>
                    </View>
                    <View className="h-16 w-16 items-center justify-center rounded-full bg-red-100">
                      <Text className="text-2xl font-black text-[#dc2626]">{bloodType}</Text>
                    </View>
                  </View>

                  <View className="mt-3 gap-y-2 border-t border-gray-100 pt-3">
                    <View className="flex-row items-center">
                      <Ionicons name="location-outline" size={18} color="#9ca3af" />
                      <Text className="ml-2 text-sm text-gray-600">{donor.location}</Text>
                    </View>
                    <View className="flex-row items-center">
                      <Ionicons name="time-outline" size={18} color="#9ca3af" />
                      <Text className="ml-2 text-sm text-gray-600">
                        Last donation: {donor.lastDonation}
                      </Text>
                    </View>
                  </View>

                  <Pressable className="mt-4 overflow-hidden rounded-xl">
                    <LinearGradient
                      colors={['#dc2626', '#b91c1c']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={{
                        paddingVertical: 12,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text className="text-center text-base font-bold text-white">
                        Contact Donor
                      </Text>
                    </LinearGradient>
                  </Pressable>
                </View>
              </Pressable>
            ))}
          </View>

          {donors.length === 0 && (
            <View className="mt-8 items-center rounded-2xl bg-white px-6 py-12">
              <Ionicons name="people-outline" size={64} color="#9ca3af" />
              <Text className="mt-4 text-lg font-semibold text-gray-900">
                No donors available
              </Text>
              <Text className="mt-2 text-center text-sm text-gray-500">
                There are currently no donors with blood type {bloodType} available.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

