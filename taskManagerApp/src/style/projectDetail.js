import { StyleSheet } from "react-native";
import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";
import { spacing } from "@/theme/spacing";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.largest,
  },

  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.largest,
    elevation: 4,
    shadowColor: colors.black,
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },

  title: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    marginBottom: spacing.largest,
  },

  section: {
    marginBottom: spacing.huge,
  },

  label: {
    fontSize: typography.sizes.xs,
    color: colors.text.light,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontWeight: typography.weights.semibold,
  },

  value: {
    fontSize: typography.sizes.base,
    color: colors.text.primary,
    fontWeight: typography.weights.medium,
  },

  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.xxl,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});