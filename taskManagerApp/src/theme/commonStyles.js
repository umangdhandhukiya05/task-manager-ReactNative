import { StyleSheet } from 'react-native';
import { colors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';

export const commonStyles = StyleSheet.create({
  // Container Styles
  container: {
    flex: 1,
    padding: spacing.huge,
    backgroundColor: colors.background,
  },

  containerCentered: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.largest,
    backgroundColor: colors.background,
  },

  scrollContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // Text Styles
  title: {
    fontSize: typography.sizes.xxxxl,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    marginBottom: spacing.lg,
  },

  titleLarge: {
    fontSize: typography.sizes.xxxl,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    marginBottom: spacing.xxl,
  },

  titleMedium: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    marginBottom: spacing.lg,
  },

  titleSmall: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },

  headingLarge: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
  },

  headingMedium: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.text.primary,
  },

  text: {
    fontSize: typography.sizes.base,
    color: colors.text.primary,
    lineHeight: 20,
  },

  textSecondary: {
    fontSize: typography.sizes.base,
    color: colors.text.secondary,
    lineHeight: 20,
  },

  textTertiary: {
    fontSize: typography.sizes.sm,
    color: colors.text.tertiary,
  },

  textLight: {
    fontSize: typography.sizes.sm,
    color: colors.text.light,
  },

  // Input Styles
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.lg,
    backgroundColor: colors.surface,
    fontSize: typography.sizes.base,
    color: colors.text.primary,
  },

  inputSmall: {
    height: 45,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
    backgroundColor: colors.surface,
    fontSize: typography.sizes.sm,
    color: colors.text.primary,
  },

  inputLarge: {
    height: 55,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.xl,
    backgroundColor: colors.surface,
    fontSize: typography.sizes.base,
    color: colors.text.primary,
  },

  inputFocused: {
    borderColor: colors.primary,
    borderWidth: 2,
  },

  inputError: {
    borderColor: colors.error,
    borderWidth: 1.5,
  },

  textArea: {
    minHeight: 120,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    marginBottom: spacing.lg,
    backgroundColor: colors.surface,
    fontSize: typography.sizes.base,
    color: colors.text.primary,
  },

  // Button Styles
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.xxxl,
    paddingHorizontal: spacing.largest,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.lg,
  },

  buttonSmall: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonLarge: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.xxxl,
    paddingHorizontal: spacing.largest,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.xl,
  },

  buttonSecondary: {
    backgroundColor: colors.secondary,
    paddingVertical: spacing.xxxl,
    paddingHorizontal: spacing.largest,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonOutline: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.primary,
    paddingVertical: spacing.xxxl,
    paddingHorizontal: spacing.largest,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonDisabled: {
    backgroundColor: colors.gray,
    paddingVertical: spacing.xxxl,
    paddingHorizontal: spacing.largest,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Button Text Styles
  buttonText: {
    color: colors.white,
    fontWeight: typography.weights.semibold,
    fontSize: typography.sizes.md,
  },

  buttonTextSmall: {
    color: colors.white,
    fontWeight: typography.weights.semibold,
    fontSize: typography.sizes.sm,
  },

  buttonTextLarge: {
    color: colors.white,
    fontWeight: typography.weights.bold,
    fontSize: typography.sizes.lg,
  },

  // Error/Message Styles
  error: {
    color: colors.error,
    fontSize: typography.sizes.sm,
    marginBottom: spacing.lg,
    marginTop: spacing.sm,
  },

  errorBackground: {
    backgroundColor: colors.errorLight,
    padding: spacing.lg,
    borderRadius: 8,
    marginBottom: spacing.lg,
  },

  success: {
    color: colors.success,
    fontSize: typography.sizes.sm,
    marginBottom: spacing.lg,
  },

  // Card Styles
  card: {
    backgroundColor: colors.surface,
    padding: spacing.huge,
    borderRadius: 14,
    marginBottom: spacing.huge,
    elevation: 3,
  },

  cardSmall: {
    backgroundColor: colors.surface,
    padding: spacing.xxl,
    borderRadius: 12,
    marginBottom: spacing.lg,
    elevation: 2,
  },

  // Flexbox Utilities
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Loader
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Divider
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.lg,
  },

  // Link/Text Button
  link: {
    color: colors.primary,
    fontWeight: typography.weights.semibold,
    fontSize: typography.sizes.base,
  },

  linkSmall: {
    color: colors.primary,
    fontWeight: typography.weights.semibold,
    fontSize: typography.sizes.sm,
  },

  // Badge/Chip
  badge: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: 20,
    backgroundColor: colors.primaryLight,
  },

  badgeSecondary: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: 20,
    backgroundColor: colors.secondaryLight,
  },

  // Form Label
  label: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
    color: colors.text.primary,
    marginBottom: spacing.md,
    marginTop: spacing.lg,
  },

  labelSmall: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },
});
