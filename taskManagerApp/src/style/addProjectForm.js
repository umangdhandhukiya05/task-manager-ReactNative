import { StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { spacing } from '@/theme/spacing';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.largest,
    backgroundColor: colors.background,
  },

  title: {
    fontSize: typography.sizes.xxxl,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.largest,
    color: colors.text.primary,
  },

  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: spacing.xxl,
    marginBottom: spacing.lg,
  },

  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },

  error: {
    color: colors.error,
    marginBottom: spacing.lg,
  },

  button: {
    backgroundColor: colors.primary,
    padding: spacing.xxxl,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: spacing.lg,
  },

  buttonText: {
    color: colors.white,
    fontWeight: typography.weights.semibold,
    fontSize: typography.sizes.md,
  },
});
