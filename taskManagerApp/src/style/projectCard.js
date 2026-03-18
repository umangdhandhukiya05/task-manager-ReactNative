import { StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { spacing } from '@/theme/spacing';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    padding: spacing.huge,
    borderRadius: 14,
    marginBottom: spacing.huge,
    elevation: 3,
  },

  title: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    maxWidth: '80%',
  },

  creator: {
    fontSize: typography.sizes.xs,
    color: colors.text.tertiary,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },

  description: {
    marginTop: spacing.md,
    color: colors.text.tertiary,
    maxWidth: '80%',
  },

  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.xxxl,
  },

  taskBtn: {
    backgroundColor: colors.secondaryLight,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: 8,
    marginRight: spacing.lg,
  },

  taskText: {
    color: colors.secondary,
    fontWeight: typography.weights.semibold,
    fontSize: typography.sizes.sm,
  },

  btn: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
});
