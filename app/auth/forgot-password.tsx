import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1" style={{ paddingTop: insets.top || 0 }}>
      <StatusBar style="light" translucent backgroundColor="transparent" />
      <LinearGradient
        colors={['#dc2626', '#991b1b', '#7f1d1d']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      />

      <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 px-4 pb-10 pt-20">
          {/* Top Section with Logo */}
          <View className="mb-12 items-center">
            <View className="mb-8 h-20 w-20 items-center justify-center rounded-full bg-white">
              <Ionicons name="water" size={44} color="#dc2626" />
            </View>
            <Text className="mb-3 text-5xl font-black text-white">BloodBooth</Text>
            <Text className="text-lg font-medium text-white/80">
              Reset your password to continue
            </Text>
          </View>

          {/* Form Card */}
          <View className="rounded-[40px] bg-white px-6 pb-8 pt-10">
            <View className="mb-8">
              <Text className="mb-1 text-2xl font-bold text-gray-900">Forgot Password</Text>
              <Text className="text-base text-gray-500">
                Don&apos;t worry! Enter your email and we&apos;ll send you reset instructions.
              </Text>
            </View>

            <View className="gap-y-6">
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

              {/* Send OTP Button */}
              <Pressable
                onPress={() => router.push('/auth/login')}
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
                  <Text className="text-center text-lg font-bold text-white">Send OTP</Text>
                </LinearGradient>
              </Pressable>
            </View>

            {/* Sign In Link */}
            <View className="mt-8 flex-row justify-center gap-x-1">
              <Text className="text-base text-gray-600">Remember your password?</Text>
              <Link href="/auth/login" className="text-base font-bold text-[#dc2626]">
                Sign In
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
