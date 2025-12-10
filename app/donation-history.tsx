import { View, Text, ScrollView, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Mock donation history data
const donationHistory = [
  {
    id: '1',
    date: '2024-01-15',
    location: 'City Hospital',
    bloodType: 'O+',
    status: 'Completed',
  },
  {
    id: '2',
    date: '2023-11-20',
    location: 'Red Cross Center',
    bloodType: 'O+',
    status: 'Completed',
  },
  {
    id: '3',
    date: '2023-09-10',
    location: 'Community Blood Bank',
    bloodType: 'O+',
    status: 'Completed',
  },
  {
    id: '4',
    date: '2023-07-05',
    location: 'Regional Medical Center',
    bloodType: 'O+',
    status: 'Completed',
  },
];

export default function DonationHistoryScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
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
          <Text className="text-2xl font-black text-white">Donation History</Text>
        </View>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 px-6 pb-10">
          {/* Donation History Card */}
          <View className="rounded-[40px] bg-white px-8 py-10">
            <View className="mb-6 flex-row items-center justify-between">
              <Text className="text-2xl font-bold text-gray-900">Your Donations</Text>
              <Pressable
                onPress={() => router.push('/create-donation')}
                className="overflow-hidden rounded-xl active:opacity-90">
                <LinearGradient
                  colors={['#dc2626', '#b91c1c']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 16,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View className="flex-row items-center">
                    <Ionicons name="add-circle" size={20} color="#ffffff" />
                    <Text className="ml-1 text-center text-base font-bold text-white">Create</Text>
                  </View>
                </LinearGradient>
              </Pressable>
            </View>

            {donationHistory.length === 0 ? (
              <View className="items-center py-12">
                <Ionicons name="water-outline" size={64} color="#9ca3af" />
                <Text className="mt-4 text-lg font-semibold text-gray-900">No donations yet</Text>
                <Text className="mt-2 text-center text-sm text-gray-500">
                  Your donation history will appear here once you make your first donation.
                </Text>
              </View>
            ) : (
              <View className="gap-y-4">
                {donationHistory.map((donation) => (
                  <View
                    key={donation.id}
                    className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
                    <View className="px-6 py-5">
                      <View className="mb-3 flex-row items-center justify-between">
                        <View className="flex-1">
                          <Text className="text-lg font-bold text-gray-900">
                            {formatDate(donation.date)}
                          </Text>
                          <Text className="mt-1 text-sm text-gray-500">{donation.location}</Text>
                        </View>
                        <View className="h-12 w-12 items-center justify-center rounded-full bg-red-100">
                          <Text className="text-base font-black text-[#dc2626]">
                            {donation.bloodType}
                          </Text>
                        </View>
                      </View>

                      <View className="mt-3 flex-row items-center border-t border-gray-200 pt-3">
                        <View
                          className={`flex-row items-center rounded-full px-3 py-1 ${
                            donation.status === 'Completed'
                              ? 'bg-green-100'
                              : donation.status === 'Pending'
                                ? 'bg-yellow-100'
                                : 'bg-gray-100'
                          }`}>
                          <Ionicons
                            name={
                              donation.status === 'Completed'
                                ? 'checkmark-circle'
                                : donation.status === 'Pending'
                                  ? 'time'
                                  : 'close-circle'
                            }
                            size={16}
                            color={
                              donation.status === 'Completed'
                                ? '#10b981'
                                : donation.status === 'Pending'
                                  ? '#f59e0b'
                                  : '#6b7280'
                            }
                          />
                          <Text
                            className={`ml-1 text-xs font-semibold ${
                              donation.status === 'Completed'
                                ? 'text-green-700'
                                : donation.status === 'Pending'
                                  ? 'text-yellow-700'
                                  : 'text-gray-700'
                            }`}>
                            {donation.status}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            )}

            {/* Summary */}
            {donationHistory.length > 0 && (
              <View className="mt-8 rounded-2xl border border-gray-200 bg-red-50 p-6">
                <View className="flex-row items-center justify-between">
                  <View>
                    <Text className="text-sm font-medium text-gray-600">Total Donations</Text>
                    <Text className="mt-1 text-3xl font-black text-[#dc2626]">
                      {donationHistory.length}
                    </Text>
                  </View>
                  <View className="h-16 w-16 items-center justify-center rounded-full bg-white">
                    <Ionicons name="trophy" size={32} color="#dc2626" />
                  </View>
                </View>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

