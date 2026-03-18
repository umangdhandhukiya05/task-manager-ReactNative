import { StyleSheet } from "react-native";
import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";
import { spacing } from "@/theme/spacing";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.xxl,
    backgroundColor: colors.background,
  },

  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  searchRow: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
  },

  search: {
    flex: 1,
    backgroundColor: colors.surface,
    padding: spacing.xxl,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: spacing.lg,
    fontSize: typography.sizes.base,
    color: colors.text.primary,
  },

  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xxl,
  },

  dropdown: {
    width: '48%',
    height: 42,
    backgroundColor: colors.surface,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.lg,
  },

  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    color: colors.text.light,
    fontSize: typography.sizes.base,
  },

  addButton: {
    backgroundColor: colors.primary,
    height: 42,
    width: 42,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  addText: {
    color: colors.white,
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.semibold,
  },
});