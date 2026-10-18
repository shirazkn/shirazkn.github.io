#!/bin/bash
set -e
# Clean first so files from deleted posts or a dev-server build never get published
hugo --cleanDestinationDir
git add .
git commit -m "$1"
git push origin main