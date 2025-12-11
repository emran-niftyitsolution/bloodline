import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
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
        <View className="flex-row items-center justify-between">
          <Pressable
            onPress={() => router.back()}
            className="h-10 w-10 items-center justify-center rounded-full bg-white/20">
            <Ionicons name="arrow-back" size={24} color="#ffffff" />
          </Pressable>
          <View className="flex-1 px-3">
            <Text className="text-3xl font-black text-white">History</Text>
          </View>
          <Pressable
            onPress={() => router.push('/create-donation')}
            className="overflow-hidden rounded-xl border border-white/30 bg-white/20 active:opacity-90">
            <View
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
            </View>
          </Pressable>
        </View>
        <View className="mt-4 flex-row items-center justify-between">
          <Text className="text-lg font-bold text-white">Total Donations</Text>
          <Text className="text-4xl font-black text-white">{donationHistory.length}</Text>
        </View>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 px-6 pb-10">
          {donationHistory.length === 0 ? (
            <View className="items-center py-12">
              <Ionicons name="water-outline" size={64} color="#f3f4f6" />
              <Text className="mt-4 text-lg font-semibold text-white">No donations yet</Text>
              <Text className="mt-2 text-center text-sm text-white/80">
                Your donations will appear here once you make your first donation.
              </Text>
            </View>
          ) : (
            <View className="gap-y-3">
              {donationHistory.map((donation) => (
                <View
                  key={donation.id}
                  className="rounded-2xl border border-gray-200 bg-white px-4 py-4 shadow-sm">
                  <View className="flex-row items-center justify-between">
                    <View className="flex-1">
                      <Text className="text-base font-bold text-gray-900">
                        {formatDate(donation.date)}
                      </Text>
                      <Text className="mt-1 text-sm text-gray-600">{donation.location}</Text>
                    </View>
                    <View className="h-10 w-10 items-center justify-center rounded-full bg-red-100">
                      <Text className="text-sm font-black text-[#dc2626]">
                        {donation.bloodType}
                      </Text>
                    </View>
                  </View>
                  <View className="mt-3 flex-row items-center">
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
                            : '#9ca3af'
                      }
                    />
                    <Text
                      className={`ml-2 text-sm font-semibold ${
                        donation.status === 'Completed'
                          ? 'text-green-700'
                          : donation.status === 'Pending'
                            ? 'text-yellow-700'
                            : 'text-gray-600'
                      }`}>
                      {donation.status}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
