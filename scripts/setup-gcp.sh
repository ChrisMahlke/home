# scripts/setup-gcp.sh
#!/bin/bash

# SAFE GCP SETUP - ISOLATED RESOURCES ONLY
PROJECT_ID="helpful-quanta-463702-a3"
BUCKET_NAME="chrismahlke-homepage-strings-71027948544"

echo "�� Setting up SAFE ISOLATED GCP resources..."
echo "Project ID: $PROJECT_ID"
echo "Bucket Name: $BUCKET_NAME"
echo ""

# Set the project
gcloud config set project $PROJECT_ID

# Enable Cloud Storage API (safe - won't affect existing services)
echo "📦 Enabling Cloud Storage API..."
gcloud services enable storage.googleapis.com

# Create new isolated bucket
echo "🪣 Creating isolated bucket: $BUCKET_NAME"
gsutil mb gs://$BUCKET_NAME

# Upload strings.json to the bucket
echo "📤 Uploading strings.json to bucket..."
gsutil cp src/strings.json gs://$BUCKET_NAME/strings.json

# Make only the strings.json file publicly readable (safe)
echo "🔓 Making strings.json publicly readable..."
gsutil iam ch allUsers:objectViewer gs://$BUCKET_NAME

echo ""
echo "✅ GCP setup complete!"
echo "�� Strings URL: https://storage.googleapis.com/$BUCKET_NAME/strings.json"
echo "�� To update strings: gsutil cp src/strings.json gs://$BUCKET_NAME/strings.json"