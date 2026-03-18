import { StyleSheet } from "react-native";
import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";
import { spacing } from "@/theme/spacing";

export const styles = StyleSheet.create({
  headerText: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    padding: spacing.lg,
    backgroundColor: colors.lightGray,
  },
  
  container: {
    flex: 1,
    padding: spacing.huge,
    backgroundColor: colors.background,
  },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },

  search: {
    flex: 1,
    backgroundColor: colors.surface,
    padding: spacing.xxl,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },

  addButton: {
    marginLeft: spacing.lg,
    backgroundColor: colors.primary,
    height: 48,
    width: 48,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  addText: {
    color: colors.white,
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.semibold,
  },

  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  welcomeUser:{
    fontSize: typography.sizes.xl,
    paddingBottom: spacing.xxl,
    color: colors.text.primary,
    fontWeight: typography.weights.semibold,
  }
});
