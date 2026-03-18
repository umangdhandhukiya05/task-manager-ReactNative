import { StyleSheet } from "react-native";
import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";
import { spacing } from "@/theme/spacing";

export const styles = StyleSheet.create({
  container: { padding: spacing.largest },

  title: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.largest,
    color: colors.text.primary,
  },

  label: {
    fontSize: typography.sizes.base,
    marginBottom: spacing.md,
    fontWeight: typography.weights.semibold,
    color: colors.text.primary,
  },

  input: {
    backgroundColor: colors.surface,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.xxl,
    marginBottom: spacing.md,
    color: colors.text.primary,
  },

  dropdown: {
    height: 50,
    backgroundColor: colors.surface,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },

  dateBtn: {
    backgroundColor: colors.surface,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.xxxl,
    marginBottom: spacing.huge,
  },

  dateText: { 
    fontSize: typography.sizes.base,
    color: colors.text.primary,
  },

  button: {
    backgroundColor: colors.primary,
    padding: spacing.huge,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: colors.white,
    fontWeight: typography.weights.bold,
    fontSize: typography.sizes.md,
  },

  errorText: {
    color: colors.error,
    fontSize: typography.sizes.xs,
    marginBottom: spacing.lg,
  },

  errorInput: { borderColor: colors.error },

  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: spacing.largest,
  },

  calendarBox: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.lg,
  },

  closeBtn: {
    backgroundColor: colors.primary,
    padding: spacing.xxl,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: spacing.lg,
  },
});
