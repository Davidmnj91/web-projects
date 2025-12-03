#!/bin/bash

# VERCEL_GIT_COMMIT_REF is the branch currently being deployed (e.g., "main" or "feat/login")
CURRENT_BRANCH="$VERCEL_GIT_COMMIT_REF"
COMMIT_MSG=$(git log -1 --pretty=%B)

echo "🌿 Current branch: $CURRENT_BRANCH"
echo "🔍 Analyzing commit: $COMMIT_MSG"

# -----------------------------------------------------------------------------
# CASE 1: Production (Main Branch)
# -----------------------------------------------------------------------------
if [[ "$CURRENT_BRANCH" == "main" ]]; then
  echo "🚀 Production branch detected (main)."
  echo "⏩ Skipping commit name validation on main (to allow Merge commits)."

  # On main, we rely purely on Turbo.
  # If files in this app changed -> Deploy.
  # If only README or a neighbor app changed -> Cancel.

  echo "🔍 Running turbo-ignore for production..."
  npx turbo-ignore

  # Capture turbo-ignore exit code
  EXIT_CODE=$?

  if [ $EXIT_CODE -eq 1 ]; then
    echo "✅ Changes detected. Proceeding with Production deployment."
  else
    echo "🛑 No relevant changes. Cancelling Production deployment."
  fi

  exit $EXIT_CODE
fi

# -----------------------------------------------------------------------------
# CASE 2: Preview (Pull Requests)
# -----------------------------------------------------------------------------
echo "🧪 Preview branch detected."

# 1. Strict commit message validation (Only for PRs)
# This enforces Conventional Commits during development
if [[ ! "$COMMIT_MSG" =~ ^(fix|feat)(\(.*\))?:.+ ]]; then
  echo "🛑 PR/Commit title does not start with 'fix' or 'feat'. Cancelling Preview."
  echo "ℹ️  Note: Use a title like 'feat: new login' to trigger a preview."
  exit 0 # Exit 0 tells Vercel to CANCEL the build (Ignore)
fi

echo "✅ Valid commit format."

# 2. File change validation (Turbo)
# If turbo-ignore returns 1 (changes found), Vercel proceeds.
# If turbo-ignore returns 0 (no changes), Vercel cancels.
echo "🔍 Running turbo-ignore for preview..."
npx turbo-ignore