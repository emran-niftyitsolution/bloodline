import { View, Text, ScrollView, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
  const router = useRouter();

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
          <View className="mb-8 items-center">
            <View className="mb-4 h-20 w-20 items-center justify-center rounded-full bg-white">
              <Ionicons name="settings-outline" size={44} color="#dc2626" />
            </View>
            <Text className="mb-2 text-4xl font-black text-white">Settings</Text>
            <Text className="text-lg font-medium text-white/80">
              Manage your account preferences
            </Text>
          </View>

          {/* Content Card */}
          <View className="rounded-[40px] bg-white px-8 py-10">
            <Text className="mb-6 text-2xl font-bold text-gray-900">Settings</Text>

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
                onPress={() => router.push('/auth/login')}
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

