import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

// Mock donation data - in real app, this would come from your backend
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

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Calculate stats
  const totalDonations = donationHistory.length;
  const lastDonationDate = donationHistory.length > 0 ? donationHistory[0].date : null;

  // Check if user is available for donation (56 days between donations)
  const isAvailableForDonation = () => {
    if (!lastDonationDate) return true;
    const lastDate = new Date(lastDonationDate);
    const today = new Date();
    const daysSinceLastDonation = Math.floor(
      (today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    return daysSinceLastDonation >= 56;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const available = isAvailableForDonation();

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
          <View className="mr-3 h-12 w-12 items-center justify-center rounded-full bg-white/20">
            <Ionicons name="water" size={28} color="#ffffff" />
          </View>
          <Text className="text-3xl font-black text-white">BloodBooth</Text>
        </View>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
        <View className="px-6 pb-10">
          {/* Donation Stats Card */}
          <View className="mb-6 rounded-3xl bg-white px-8 py-6">
            <View className="w-full flex-row items-center justify-between">
              <View>
                <Text className="text-lg font-bold text-gray-700">Total Donations</Text>
                <Text className="mt-1 text-3xl font-black text-[#dc2626]">{totalDonations}</Text>
              </View>
              {available ? (
                <View className="rounded-full bg-green-100 px-3 py-1.5">
                  <View className="flex-row items-center">
                    <Ionicons name="checkmark-circle" size={16} color="#10b981" />
                    <Text className="ml-1 text-xs font-semibold text-green-700">Available</Text>
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

            {lastDonationDate && (
              <View className="mt-3 w-full">
                <Text className="text-sm text-gray-500">
                  Last donation: {formatDate(lastDonationDate)}
                </Text>
              </View>
            )}
          </View>

          {/* Blood Type Grid */}
          <View className="flex-row flex-wrap justify-center gap-4">
            {bloodTypes.map((bloodType) => (
              <Pressable
                key={bloodType}
                onPress={() => router.push(`/donors/${bloodType}`)}
                className="w-[48%] overflow-hidden rounded-3xl border border-gray-200 bg-white active:opacity-80">
                <View
                  style={{
                    paddingVertical: 24,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text className="text-3xl font-black text-[#dc2626]">{bloodType}</Text>
                  <View className="mt-2 flex-row items-center">
                    <Ionicons name="people" size={16} color="#dc2626" />
                    <Text className="ml-1 text-sm font-medium text-[#dc2626]">Donors</Text>
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
