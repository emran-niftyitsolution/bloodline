import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

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
        <View className="flex-1 pb-10 pt-20">
          {/* Top Section with Logo */}
          <View className="mb-12 items-center">
            <View className="mb-8 h-20 w-20 items-center justify-center rounded-full bg-white">
              <Ionicons name="water" size={44} color="#dc2626" />
            </View>
            <Text className="mb-3 text-5xl font-black text-white">BloodBooth</Text>
            <Text className="text-lg font-medium text-white/80">
              Sign in to continue saving lives
            </Text>
          </View>

          {/* Form Card */}
          <View className="rounded-t-[40px] bg-white px-8 pb-8 pt-10">
            <View className="mb-8">
              <Text className="mb-1 text-2xl font-bold text-gray-900">Login</Text>
              <Text className="text-base text-gray-500">Enter your credentials below</Text>
            </View>

            <View className="gap-y-5">
              {/* Username Field */}
              <View>
                <Text className="mb-2 text-sm font-semibold text-gray-700">Username</Text>
                <View className="flex-row items-center rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                  <Ionicons name="person-outline" size={20} color="#9ca3af" />
                  <TextInput
                    className="ml-3 flex-1 text-base text-gray-900"
                    placeholder="Enter username"
                    placeholderTextColor="#9ca3af"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              {/* Password Field */}
              <View>
                <Text className="mb-2 text-sm font-semibold text-gray-700">Password</Text>
                <View className="flex-row items-center rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                  <Ionicons name="lock-closed-outline" size={20} color="#9ca3af" />
                  <TextInput
                    className="ml-3 flex-1 text-base text-gray-900"
                    placeholder="Enter password"
                    placeholderTextColor="#9ca3af"
                    secureTextEntry
                  />
                </View>
              </View>

              {/* Forgot Password */}
              <View className="items-end">
                <Link href="/auth/forgot-password" className="text-sm font-semibold text-[#dc2626]">
                  Forgot Password?
                </Link>
              </View>

              {/* Login Button */}
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
                  <Text className="text-center text-lg font-bold text-white">Sign In</Text>
                </LinearGradient>
              </Pressable>
            </View>

            {/* Divider */}
            <View className="my-8">
              <View className="flex-row items-center">
                <View className="h-px flex-1 bg-gray-200" />
                <Text className="px-4 text-sm text-gray-400">or continue with</Text>
                <View className="h-px flex-1 bg-gray-200" />
              </View>
            </View>

            {/* Social Login */}
            <View className="mb-8 flex-row gap-x-3">
              <Pressable className="flex-1 flex-row items-center justify-center gap-x-2 rounded-xl border border-gray-200 bg-white py-4">
                <Ionicons name="logo-google" size={20} color="#ef4444" />
                <Text className="text-sm font-semibold text-gray-700">Google</Text>
              </Pressable>
              <Pressable className="flex-1 flex-row items-center justify-center gap-x-2 rounded-xl border border-gray-200 bg-white py-4">
                <Ionicons name="logo-facebook" size={20} color="#2563eb" />
                <Text className="text-sm font-semibold text-gray-700">Facebook</Text>
              </Pressable>
            </View>

            {/* Sign Up Link */}
            <View className="flex-row justify-center gap-x-1">
              <Text className="text-base text-gray-600">Don&apos;t have an account?</Text>
              <Link href="/auth/signup" className="text-base font-bold text-[#dc2626]">
                Sign Up
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
