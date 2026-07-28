# EV Scooter App

A modern React Native application for electric scooter sharing and management, built with TypeScript and a comprehensive design system.

## 🚀 Features

- **Authentication System**: Login, Registration, OTP verification, Forgot Password
- **Modern UI/UX**: Dark theme with glassmorphism design
- **Component Library**: Reusable atomic design system
- **Navigation**: React Navigation v7 with stack and tab navigators
- **Type Safety**: Full TypeScript support
- **Theme System**: Centralized design tokens

## 📱 Screens

### Authentication Flow
- **Login Screen**: Phone number and password authentication
- **Registration Screen**: User account creation
- **OTP Verification**: Phone number verification
- **Forgot Password**: Password reset flow

### Main App (Coming Soon)
- Dashboard
- Vehicle Scanning
- Ride History
- Wallet
- Profile

## 🛠️ Tech Stack

- **React Native**: 0.86.2
- **TypeScript**: 5.8.3
- **React Navigation**: 7.x
- **React Native Reanimated**: 4.5.3
- **React Native Gesture Handler**: 3.1.0
- **React Native Linear Gradient**: 2.8.3
- **React Native Vector Icons**: 10.3.0
- **React Hook Form**: 7.83.0
- **Zod**: 4.4.3
- **Axios**: 1.18.1
- **MMKV Storage**: 4.3.2

## 📁 Project Structure

```
src/
├── assets/              # Images, fonts, and static assets
│   ├── fonts/
│   └── images/
├── theme/               # Design system and theme configuration
│   ├── colors.ts
│   ├── spacing.ts
│   ├── typography.ts
│   ├── radius.ts
│   ├── gradients.ts
│   ├── shadows.ts
│   ├── icons.ts
│   └── index.tsx
├── components/          # Reusable UI components
│   ├── atoms/          # Basic building blocks
│   │   ├── AppText
│   │   ├── AppButton
│   │   ├── AppInput
│   │   ├── AppIcon
│   │   ├── AppImage
│   │   ├── AppDivider
│   │   ├── GlassCard
│   │   ├── Spacer
│   │   ├── AppContainer
│   │   └── BrandLogo
│   ├── molecules/      # Composed components
│   │   ├── PhoneInput
│   │   ├── CountryCodePicker
│   │   ├── HelperMessage
│   │   ├── PrimaryButton
│   │   ├── OrDivider
│   │   ├── CreateAccountCard
│   │   ├── HelpCard
│   │   └── FooterSecurity
│   ├── organisms/      # Complex UI sections
│   │   ├── AuthHeader
│   │   ├── HeroVehicleSection
│   │   ├── WelcomeSection
│   │   └── LoginForm
│   └── templates/      # Page layouts
│       └── AuthTemplate
├── screens/            # Screen components
│   └── Auth/
│       ├── Login
│       ├── Registration
│       ├── OTP
│       └── ForgotPassword
├── navigation/         # Navigation configuration
│   ├── types.ts
│   ├── RootNavigator.tsx
│   ├── AuthNavigator.tsx
│   └── AppNavigator.tsx
├── hooks/              # Custom React hooks
├── store/              # State management
├── services/           # API services
├── constants/          # App constants
├── helpers/            # Helper functions
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
└── api/                # API configuration
```

## 🎨 Design System

### Colors
- **Primary**: Cyan (#00E5FF)
- **Background**: Dark blue gradient (#0A0E27 → #1A1F4E)
- **Surface**: Elevated dark surfaces (#1E2349, #252A5C)
- **Text**: White with varying opacity levels
- **Accent**: Success, Warning, Error, Info colors

### Typography
- **Font Family**: System fonts (Sora, Outfit, Plus Jakarta Sans ready)
- **Scale**: xs (11px) to massive (48px)
- **Weights**: Regular, Medium, SemiBold, Bold

### Spacing
- **Base Unit**: 4px
- **Scale**: xs (4px) to giant (64px)
- **Semantic**: screenPadding, cardPadding, buttonPadding

### Border Radius
- **Input**: 12px
- **Button**: 12px
- **Card**: 16px
- **Bottom Sheet**: 24px

## 🚦 Getting Started

### Prerequisites
- Node.js >= 22.11.0
- React Native CLI
- Xcode (for iOS)
- Android Studio (for Android)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd EVSCOOTER
```

2. **Install dependencies**
```bash
npm install
```

3. **Install iOS dependencies** (iOS only)
```bash
cd ios && pod install && cd ..
```

4. **Run the app**
```bash
# iOS
npm run ios

# Android
npm run android

# Start Metro bundler
npm start
```

## 📝 Development

### Available Scripts

- `npm start` - Start Metro bundler
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm test` - Run tests
- `npm run lint` - Run ESLint

### Component Usage

#### AppText
```tsx
<AppText variant="h1" color="primary">
  Hello World
</AppText>
```

#### AppButton
```tsx
<AppButton
  title="Sign In"
  variant="primary"
  onPress={handlePress}
/>
```

#### AppInput
```tsx
<AppInput
  label="Phone Number"
  placeholder="Enter phone"
  value={phone}
  onChangeText={setPhone}
  leftIcon="phone-outline"
/>
```

#### PrimaryButton
```tsx
<PrimaryButton
  title="Continue"
  onPress={handlePress}
/>
```

## 🎯 Roadmap

- [x] Project setup and structure
- [x] Theme system implementation
- [x] Atomic component library
- [x] Molecular components
- [x] Organism components
- [x] Template components
- [x] Login screen with full form
- [x] Navigation system
- [ ] Registration screen with full form
- [ ] OTP verification screen
- [ ] Forgot password screen
- [ ] Dashboard screen
- [ ] Vehicle scanning feature
- [ ] Ride management
- [ ] Wallet integration
- [ ] Profile management
- [ ] Backend API integration
- [ ] Push notifications
- [ ] Maps integration
- [ ] Payment gateway

## 📄 License

This project is proprietary and confidential.

## 👥 Team

Built with ❤️ by the EV Scooter Team