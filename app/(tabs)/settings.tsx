import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SettingsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Mock user data - in real app, this would come from your backend/state
  const userName = 'John Doe';
  const userEmail = 'john.doe@example.com';

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
        <View className="flex-row items-center">
          <View className="mr-3 h-12 w-12 items-center justify-center rounded-full bg-white/20">
            <Ionicons name="settings-outline" size={28} color="#ffffff" />
          </View>
          <Text className="text-3xl font-black text-white">Settings</Text>
        </View>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
        <View className="px-6 pb-10">
          {/* Profile Section */}
          <View className="mb-6 rounded-3xl bg-white px-8 py-6">
            <View className="items-center">
              <View className="mb-4 h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-gray-200">
                <Ionicons name="person" size={48} color="#dc2626" />
              </View>
              <Text className="mb-1 text-2xl font-bold text-gray-900">{userName}</Text>
              <Text className="text-base text-gray-600">{userEmail}</Text>
            </View>
          </View>

          {/* Content Card */}
          <View className="rounded-3xl bg-white px-8 py-10">
            {/* Settings Options */}
            <View className="gap-y-4">
              {/* Profile */}
              <Pressable
                onPress={() => router.push('/profile')}
                className="flex-row items-center rounded-xl border border-gray-200 bg-gray-50 px-4 py-4">
                <Ionicons name="person-outline" size={24} color="#dc2626" />
                <Text className="ml-3 flex-1 text-base font-semibold text-gray-900">Profile</Text>
                <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
              </Pressable>

              {/* Donation History */}
              <Pressable
                onPress={() => router.push('/donation-history')}
                className="flex-row items-center rounded-xl border border-gray-200 bg-gray-50 px-4 py-4">
                <Ionicons name="time-outline" size={24} color="#dc2626" />
                <Text className="ml-3 flex-1 text-base font-semibold text-gray-900">
                  Donation History
                </Text>
                <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
              </Pressable>

              {/* Notifications */}
              <Pressable className="flex-row items-center rounded-xl border border-gray-200 bg-gray-50 px-4 py-4">
                <Ionicons name="notifications-outline" size={24} color="#dc2626" />
                <Text className="ml-3 flex-1 text-base font-semibold text-gray-900">
                  Notifications
                </Text>
                <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
              </Pressable>

              {/* Privacy */}
              <Pressable className="flex-row items-center rounded-xl border border-gray-200 bg-gray-50 px-4 py-4">
                <Ionicons name="lock-closed-outline" size={24} color="#dc2626" />
                <Text className="ml-3 flex-1 text-base font-semibold text-gray-900">Privacy</Text>
                <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
              </Pressable>

              {/* About */}
              <Pressable className="flex-row items-center rounded-xl border border-gray-200 bg-gray-50 px-4 py-4">
                <Ionicons name="information-circle-outline" size={24} color="#dc2626" />
                <Text className="ml-3 flex-1 text-base font-semibold text-gray-900">About</Text>
                <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
              </Pressable>

              {/* Logout */}
              <Pressable
                onPress={() => router.push('/(auth)/login')}
                className="mt-4 flex-row items-center justify-center rounded-xl border border-red-200 bg-red-50 px-4 py-4">
                <Ionicons name="log-out-outline" size={24} color="#dc2626" />
                <Text className="ml-3 text-base font-semibold text-[#dc2626]">Logout</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
