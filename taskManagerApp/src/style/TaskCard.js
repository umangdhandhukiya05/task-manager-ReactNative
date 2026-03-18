import { StyleSheet } from "react-native";
import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";
import { spacing } from "@/theme/spacing";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    padding: spacing.huge,
    borderRadius: 14,
    marginBottom: spacing.xxxl,
    elevation: 3,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    maxWidth:"80%",
  },

  editBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 6,
  },

  editText: {
    color: colors.white,
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.semibold,
  },

  description: {
    marginTop: spacing.md,
    color: colors.text.secondary,
    fontSize: typography.sizes.base,
    maxWidth:"80%"
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.lg,
  },

  chip: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: 20,
    marginRight: spacing.lg,
  },

  chipText: {
    color: colors.white,
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.semibold,
  },

  dropdown: {
    marginTop: spacing.lg,
    width: 160,
    height: 36,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: spacing.lg,
  },

  dueDate: {
    marginTop: spacing.lg,
    fontSize: typography.sizes.xs,
    color: colors.text.light,
  },
});
