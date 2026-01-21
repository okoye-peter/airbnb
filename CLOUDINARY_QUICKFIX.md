# Step-by-Step: Get Your Cloudinary Credentials

Follow these steps to get your Cloudinary credentials and fix the upload error.

## Step 1: Log into Cloudinary

1. Open your browser and go to: https://cloudinary.com/console
2. Log in with your Cloudinary account credentials

## Step 2: Get Your Cloud Name

Once logged in, you'll see your dashboard. At the top, you'll see:

```
┌─────────────────────────────────────┐
│ Product Environment                 │
│ Cloud name: dxyz123abc    ← COPY THIS
│ API Key: 123456789                  │
│ API Secret: ****************        │
└─────────────────────────────────────┘
```

**Copy the Cloud Name** (it will be something like `dxyz123abc` or similar)

## Step 3: Create an Upload Preset

1. Click the **Settings** gear icon (usually in the bottom-left or top-right)
2. Click on the **Upload** tab
3. Scroll down to find **Upload presets** section
4. Click **Add upload preset** button
5. Fill in the form:
   - **Preset name**: Type `airbnb_unsigned` (or any name you prefer)
   - **Signing Mode**: ⚠️ **IMPORTANT** - Select **Unsigned** (not Signed!)
   - **Folder**: Type `airbnb` (optional, for organization)
   - Leave other settings as default
6. Click **Save**
7. **Copy the preset name** you just created (e.g., `airbnb_unsigned`)

## Step 4: Update Your .env File

Open the file: `/Users/Okoye/Desktop/Next js app/airbnb/.env`

Find lines 27-28 and replace them with your actual values:

```bash
# BEFORE (placeholder values):
CLOUDINARY_CLOUD_NAME="your_cloud_name_here"
CLOUDINARY_UPLOAD_PRESET="your_upload_preset_here"

# AFTER (your actual values, NO QUOTES):
CLOUDINARY_CLOUD_NAME=dxyz123abc
CLOUDINARY_UPLOAD_PRESET=airbnb_unsigned
```

**Important:** 
- Replace `dxyz123abc` with YOUR actual cloud name from Step 2
- Replace `airbnb_unsigned` with YOUR actual preset name from Step 3
- Remove the quotes around the values

## Step 5: Restart Your Dev Server

In your terminal:
1. Press `Ctrl+C` to stop the current server
2. Run: `npm run dev`
3. Wait for it to start

## Step 6: Test the Upload

1. Go to your app in the browser
2. Try uploading an image again
3. It should work now! ✅

---

## Quick Checklist

- [ ] Logged into Cloudinary
- [ ] Copied Cloud Name from dashboard
- [ ] Created Upload Preset with **Unsigned** mode
- [ ] Copied Preset Name
- [ ] Updated `.env` file (removed quotes)
- [ ] Restarted dev server
- [ ] Tested upload

---

## Still Not Working?

If you still see the "Unknown API key" error after following all steps:

1. **Double-check** that the Upload Preset is set to **Unsigned** (not Signed)
2. **Verify** there are no typos in your `.env` file
3. **Confirm** you removed the quotes around the values
4. **Make sure** you restarted the dev server after changing `.env`

Check the terminal console - you should now see debug output like:
```
Cloudinary Config: {
  cloudName: 'dxy...',
  uploadPreset: 'air...',
  hasCloudName: true,
  hasUploadPreset: true
}
```

If it shows `NOT SET`, the environment variables aren't loading correctly.
