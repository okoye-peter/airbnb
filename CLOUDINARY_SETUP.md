# Cloudinary Setup Guide

This guide will help you configure Cloudinary for your Airbnb application.

## Step 1: Create a Cloudinary Account

1. Go to [Cloudinary](https://cloudinary.com/) and sign up for a free account
2. After signing up, you'll be redirected to your dashboard

## Step 2: Get Your Cloud Name

1. On your Cloudinary dashboard, you'll see your **Cloud name** at the top
2. Copy this value - you'll need it for `CLOUDINARY_CLOUD_NAME`

## Step 3: Create an Upload Preset

Since we're using the unsigned upload API (no SDK), you need to create an upload preset:

1. In your Cloudinary dashboard, go to **Settings** (gear icon)
2. Click on the **Upload** tab
3. Scroll down to **Upload presets**
4. Click **Add upload preset**
5. Configure the preset:
   - **Preset name**: Choose a name (e.g., `airbnb_unsigned`)
   - **Signing Mode**: Select **Unsigned**
   - **Folder**: Optionally set a default folder (e.g., `airbnb`)
   - Leave other settings as default or customize as needed
6. Click **Save**
7. Copy the preset name - you'll need it for `CLOUDINARY_UPLOAD_PRESET`

## Step 4: Update Your .env File

Open your `.env` file and update the Cloudinary configuration:

```bash
CLOUDINARY_CLOUD_NAME="your_actual_cloud_name"
CLOUDINARY_UPLOAD_PRESET="your_actual_upload_preset"
```

Replace:
- `your_actual_cloud_name` with your Cloud name from Step 2
- `your_actual_upload_preset` with your preset name from Step 3

## Step 5: Test the Upload

1. Start your development server: `npm run dev`
2. Navigate to create a new home listing
3. Upload an image in the description step
4. Check your Cloudinary Media Library to verify the upload

## Important Notes

- **Unsigned uploads** are used for simplicity and don't require API keys in the client
- Images will be stored in the folder specified in your upload preset or in the API call
- The upload preset controls security settings like file size limits and allowed formats
- You can view all uploaded images in your Cloudinary Media Library

## Security Considerations

- Upload presets can have restrictions (file size, format, etc.)
- Consider enabling **Auto-tagging** and **Auto-categorization** in your preset
- For production, you may want to add additional validation or use signed uploads

## Troubleshooting

- **Upload fails**: Check that your cloud name and upload preset are correct
- **CORS errors**: Cloudinary should handle CORS automatically for unsigned uploads
- **File too large**: Check your upload preset's file size limit
- **Wrong folder**: Verify the folder path in the upload preset or API call
