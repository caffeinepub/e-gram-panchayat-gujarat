# e GRAM PANCHAYAT GUJARAT

## Current State

- Full website with gujaratforms.com-style layout, Nav: Home, About, Services, Gallery, Blog, Guides, Contact, Login/Register
- Backend: fully supports Gallery CRUD, Scheme CRUD, ServiceLink CRUD, Form catalog CRUD, Blog CRUD, Submissions, SiteInfo, UserProfile, with blob-storage and authorization
- Admin.tsx: only 3 tabs visible -- Form Submissions, Blog, Site Info (non-functional save). Gallery, Schemes, Service Links, Form Catalog management tabs are MISSING from admin UI
- Admin button in header: visible only to admin users after login, links to /admin

## Requested Changes (Diff)

### Add
- Admin Panel Gallery tab: upload photo/video via blob-storage, list all gallery items with delete option
- Admin Panel Schemes tab: add/edit/delete Gujarat government schemes with title, description, link, documents required, category
- Admin Panel Service Links tab: add/edit/delete service links (name, URL, icon, category) including all Gujarat government app links
- Admin Panel Forms tab: add/edit/delete form catalog entries
- Admin Panel Music/Audio section: upload audio files via blob-storage, list and delete
- Site Info save: wire existing site info form to backend updateSiteInfo call
- Government schemes and app links: pre-populate with comprehensive list (Digital Gujarat, e-Dhara, AnyROR, Revenue Dept, PM Awas, e-Shram, Ayushman Bharat, Ration KYC, PM Kisan, PAN Card, Aadhaar, PMSBY, PMJJBY, etc.)

### Modify
- Admin.tsx: expand from 3 tabs to 7 tabs: Submissions, Blog, Gallery, Schemes, Service Links, Forms, Site Info
- Site Info tab: wire Save button to backend

### Remove
- Nothing to remove

## Implementation Plan

1. Expand Admin.tsx with 4 new tabs: Gallery, Schemes, Service Links, Forms
2. Gallery tab: use StorageClient/ExternalBlob to upload photos/videos, list items with delete
3. Schemes tab: CRUD UI for scheme management using backend addScheme/editScheme/deleteScheme
4. Service Links tab: CRUD UI using backend addServiceLink/editServiceLink/deleteServiceLink; pre-populate comprehensive Gujarat government links list
5. Forms tab: CRUD UI for form catalog using backend addForm/editForm/deleteForm
6. Site Info tab: fix Save button to call backend updateSiteInfo
7. Backend: add music/audio support (treat as gallery item with type=audio) or add dedicated audio field -- use existing GalleryItem type with a mediaType field
8. Update government schemes data with comprehensive list in backend seed or admin UI defaults
