# Edge-to-Edge Troubleshooting Guide

## Common Error: "Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined"

This error occurs when React cannot find a valid component for rendering. For edge-to-edge implementation, this typically means:

1. **Incorrect import pattern** - Wrong import syntax for the package
2. **Package not installed** - Missing or corrupted installation
3. **Version conflicts** - Incompatible package versions
4. **Metro cache issues** - Cached module resolution problems
5. **Expo compatibility** - Missing configuration for Expo projects

## Quick Fixes

### 1. Clear Metro Bundler Cache

```bash
# For React Native CLI
npx react-native start --reset-cache

# For Expo
expo start -c
# or
rm -rf .expo && expo start

# Alternative commands
npm start -- --reset-cache
yarn start --reset-cache
```

### 2. Reinstall Package

```bash
# Remove and reinstall
npm uninstall react-native-edge-to-edge
npm install react-native-edge-to-edge

# For Expo
npx expo install react-native-edge-to-edge

# Clean install
rm -rf node_modules package-lock.json
npm install
```

### 3. Verify Import Patterns

Try these import patterns in your code:

**Pattern 1: Default Import (Recommended)**
```javascript
import EdgeToEdge from 'react-native-edge-to-edge';
```

**Pattern 2: Named Import**
```javascript
import { EdgeToEdge } from 'react-native-edge-to-edge';
```

**Pattern 3: Namespace Import**
```javascript
import * as EdgeToEdge from 'react-native-edge-to-edge';
```

**Pattern 4: Dynamic Import**
```javascript
const EdgeToEdge = require('react-native-edge-to-edge').default;
```

## Comprehensive Debugging Steps

### Step 1: Package Verification

Run the debug utility to check installation:

```javascript
import { debugEdgeToEdge } from './src/Utils/EdgeToEdgeDebug';

// In your component or debug screen
debugEdgeToEdge().then(result => {
  console.log('Debug result:', result);
});
```

### Step 2: Import Pattern Testing

Test which import pattern works:

```javascript
import { testImportPatterns } from './src/Utils/EdgeToEdgeDebug';

testImportPatterns();
```

### Step 3: Health Check

```javascript
import { healthCheck } from './src/Utils/EdgeToEdgeDebug';

const result = healthCheck();
console.log('Health check:', result);
```

## Platform-Specific Configuration

### Android Configuration

Ensure your `android/app/src/main/AndroidManifest.xml` has:

```xml
<activity
  android:name=".MainActivity"
  android:theme="@style/AppTheme"
  android:windowSoftInputMode="adjustResize"
  android:exported="true">
  
  <!-- Add these attributes for edge-to-edge -->
  android:fitSystemWindows="false"
</activity>
```

### Expo Configuration

For Expo projects, add to `app.json`:

```json
{
  "expo": {
    "android": {
      "softwareKeyboardLayoutMode": "resize"
    },
    "plugins": [
      [
        "react-native-edge-to-edge",
        {
          "android": {
            "edgeToEdgeEnabled": true
          }
        }
      ]
    ]
  }
}
```

## Version Compatibility

| Package | React Native | Expo | Status |
|---------|-------------|------|---------|
| react-native-edge-to-edge@1.7.0 | 0.63+ | SDK 43+ | ✅ Compatible |
| react-native-edge-to-edge@1.6.0 | 0.62+ | SDK 42+ | ✅ Compatible |
| react-native-edge-to-edge@1.5.0 | 0.61+ | SDK 41+ | ⚠️ May need patches |

## Common Issues and Solutions

### Issue 1: Package Not Found
**Symptoms**: `Unable to resolve module 'react-native-edge-to-edge'`
**Solution**:
```bash
npm install react-native-edge-to-edge
# For Expo: npx expo install react-native-edge-to-edge
npx react-native start --reset-cache
```

### Issue 2: Incorrect Import
**Symptoms**: `undefined is not a function` or component undefined
**Solution**: Try different import patterns (see above)

### Issue 3: Metro Cache Corruption
**Symptoms**: Random import failures after package changes
**Solution**: Always clear cache after package installation/removal

### Issue 4: Expo Compatibility
**Symptoms**: Works in development but fails in production build
**Solution**: Add proper Expo config and run `expo prebuild`

## Advanced Troubleshooting

### 1. Check Package Exports

```javascript
// In your browser console or React Native debugger
const package = require('react-native-edge-to-edge');
console.log('Package exports:', Object.keys(package));
console.log('Default export:', package.default);
```

### 2. Verify Native Linking (React Native CLI only)

```bash
# Check if native module is linked
npx react-native config

# Manual linking (if needed)
npx react-native link react-native-edge-to-edge
```

### 3. Check for Version Conflicts

```bash
# Check installed versions
npm list react-native-edge-to-edge
npm list react-native

# Check for duplicate packages
npm ls | grep duplicate
```

### 4. Debug Build Process

```bash
# Clean build folders
cd android && ./gradlew clean && cd ..

# Rebuild
npx react-native run-android
```

## Fallback Implementation

Always implement fallback rendering:

```javascript
import EdgeToEdgeWrapper from './src/Components/EdgeToEdgeWrapper';

const MyScreen = () => (
  <EdgeToEdgeWrapper>
    <YourContent />
  </EdgeToEdgeWrapper>
);
```

The wrapper automatically handles:
- ✅ Import pattern detection
- ✅ Platform compatibility checks  
- ✅ Error boundaries
- ✅ Fallback rendering

## Performance Tips

1. **Memoize Components**: Use `React.memo()` for edge-to-edge wrappers
2. **Lazy Loading**: Load edge-to-edge only when needed
3. **Conditional Rendering**: Only use on supported platforms
4. **Error Boundaries**: Wrap with proper error handling

## Monitoring and Logging

Add these debug lines to track edge-to-edge performance:

```javascript
// In your App.js or main component
import { debugEdgeToEdgeInstallation } from './src/Utils/EdgeToEdgeDebug';

// Run on app start
debugEdgeToEdgeInstallation();
```

## Support Matrix

| Platform | Minimum Version | Recommended | Notes |
|----------|----------------|-------------|-------|
| Android | 5.0 (API 21) | 8.0+ (API 26) | Best performance on newer OS |
| iOS | 11.0 | 13.0+ | Limited edge-to-edge support |
| Expo | SDK 43 | SDK 47+ | Requires proper config |

## Emergency Recovery

If all else fails:

1. **Complete Clean Install**:
```bash
rm -rf node_modules package-lock.json
npm install
npx react-native start --reset-cache
```

2. **Version Downgrade**:
```bash
npm install react-native-edge-to-edge@1.6.0
```

3. **Alternative Packages**: Consider `react-native-safe-area-context` or manual implementation

## Getting Help

1. Check package documentation: [react-native-edge-to-edge](https://github.com/react-native-community/react-native-edge-to-edge)
2. Create issue with debug output from our utilities
3. Provide: React Native version, Platform, Import pattern used, Error stack trace

Remember to always test edge-to-edge functionality on actual devices, as simulators may not accurately represent system UI behavior.