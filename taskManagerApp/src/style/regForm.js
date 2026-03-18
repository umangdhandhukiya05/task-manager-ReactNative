import { StyleSheet } from "react-native";
import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";
import { spacing } from "@/theme/spacing";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.largest,
    backgroundColor: colors.background,
  },

  title: {
    fontSize: typography.sizes.xxxl,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.max,
    color: colors.text.primary,
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.lg,
    backgroundColor: colors.surface,
  },

  error: {
    color: colors.error,
    marginBottom: spacing.lg,
  },

  button: {
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.lg,
  },

  buttonText: {
    color: colors.white,
    fontWeight: typography.weights.semibold,
    fontSize: typography.sizes.md,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.largest,
  },

  link: {
    color: colors.primary,
    fontWeight: typography.weights.semibold,
  },
});
