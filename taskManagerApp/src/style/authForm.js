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
    fontSize: typography.sizes.xxxxl,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    marginBottom: spacing.lg,
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

  loginBtn: {
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.lg,
  },

  loginText: {
    color: colors.white,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
  },

  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
  },

  registerText: {
    color: '#555',
  },

  registerBtn: {
    color: '#FF7A00',
    fontWeight: '600',
  },
});
