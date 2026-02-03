# Database Setup for Admin Password Management

## Overview

The admin password management system uses the existing `Home` table (same as all other pages) to store admin credentials. The email address is hardcoded and cannot be changed, while the password is stored in plain text and can be updated through the admin panel.

## Database Setup

**No additional setup required!** The admin password is stored in the same `Home` table that's already being used for all other pages.

The admin data is stored with:
- `page_name = "admin"` 
- `data` JSON field containing: `{ page: "admin", email: "Fdic515@gmail.com", password: "..." }`

The system will automatically create the admin record on first login if it doesn't exist, using the default password `admin123`.

## Important Notes

1. **Email is Hardcoded**: The admin email (`Fdic515@gmail.com`) is hardcoded in the application and cannot be changed through the UI or API.

2. **Plain Text Password**: Passwords are stored in plain text as requested. No hashing or encryption is applied.

3. **Password Recovery**: If the password is forgotten, the admin can set a new password through the Settings page (`/admin/settings`) without requiring the old password.

4. **Initial Password**: The default password is `admin123`. This will be set automatically when the table is created if no record exists.

## API Endpoints

- **POST /api/admin/login**: Authenticates admin with email and password
- **POST /api/admin/update-password**: Updates the admin password

## Admin Panel

Access the password change page at: `/admin/settings`

The Settings link is available in the admin sidebar navigation.

