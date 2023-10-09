#!/bin/sh

# Define variables
LOCAL_DIR="./dist/*"
REMOTE_DIR="machines/dev/"
REMOTE_USER="zoli"
#REMOTE_HOST="192.168.0.99"
REMOTE_HOST="zmakra.com"

# Copy the contents of the local directory to the remote directory
scp -r $LOCAL_DIR $REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR

# Check for any error during the copy
if [ $? -eq 0 ]; then
    echo "Copy successful."
else
    echo "Error occurred during copy." >&2
fi