case "$BRANCH_NAME" in feat/*|fix/*)
    echo "🔍 Checking for changesets on branch $BRANCH_NAME..."

    # Detect default branch (main, master, etc.)
    DEFAULT_BRANCH=$(git symbolic-ref refs/remotes/origin/HEAD | sed 's@^refs/remotes/origin/@@')

    # Check staged changes for changeset files
    STAGED_CHANGESET=$(git diff --cached --name-only | grep -E '^\.changeset/.*\.md$' || true)

    # If branch already exists on remote, compare with remote
    if git show-ref --quiet refs/remotes/origin/"$BRANCH_NAME"; then
      COMMITTED_CHANGESET=$(git diff --name-only origin/"$BRANCH_NAME"..HEAD | grep -E '^\.changeset/.*\.md$' || true)
    else
      # New branch → diff against default branch
      COMMITTED_CHANGESET=$(git diff --name-only $(git merge-base HEAD "$DEFAULT_BRANCH")..HEAD | grep -E '^\.changeset/.*\.md$' || true)
    fi

    if [ -z "$STAGED_CHANGESET" ] && [ -z "$COMMITTED_CHANGESET" ]; then
      echo "⚠️  No changeset detected!"
      echo "👉 Run 'pnpm changeset' or 'npx changeset' to add one."
    fi

    # Validate changeset format
    pnpm changeset status > /dev/null 2>&1
    if [ $? -ne 0 ]; then
      echo "❌ ERROR: Changeset validation failed. Please check your changeset files."
      exit 1
    fi

    echo "✅ Changeset check passed!"
    ;;
esac