#!/bin/bash

COMMIT_MSG=$(git log -1 --pretty=%B)

echo "🔍 Evaluating commit: $COMMIT_MSG"

if [[ ! "$COMMIT_MSG" =~ ^(fix|feat)(\(.*\))?:.+ ]]; then
  echo "🛑 Commit is not a fix or feat. Skipping deployment."
  exit 0
fi

echo "✅ Commit request deploy."

echo "🔍 Executing turbo-ignore to detect app changes..."
npx turbo-ignore