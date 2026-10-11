# SnapShare Scaling Plan

## 1. Assumptions

SnapShare is a photo-sharing application where users upload photos and
view feeds from people they follow.

Starting facts:

- 10,000,000 registered users
- 10% of users are active each day
- Each active user uploads 1 photo per day
- Each active user views 50 feed pages per day
- Average photo size is 2 MB
- Each photo also has a 50 KB thumbnail
- One day is approximately 100,000 seconds for easy estimation
- Peak traffic is approximately 5 times average traffic

## 2. Daily Active Users

10,000,000 registered users × 10%

= 1,000,000 daily active users (DAU)

Therefore, SnapShare has approximately 1,000,000 daily active users.

## 3. Uploads Per Second

Each active user uploads 1 photo per day.

1,000,000 users × 1 upload

= 1,000,000 uploads per day

Using approximately 100,000 seconds per day:

1,000,000 ÷ 100,000

= 10 uploads per second

Average uploads = approximately 10 uploads/second.

Peak uploads:

10 × 5 = 50 uploads/second

Therefore:

- Average: 10 uploads/second
- Peak: 50 uploads/second

## 4. Feed Views Per Second

Each active user views 50 feed pages per day.

1,000,000 users × 50 views

= 50,000,000 feed views per day

Using approximately 100,000 seconds per day:

50,000,000 ÷ 100,000

= 500 feed views per second

Average feed views = approximately 500 views/second.

Peak feed views:

500 × 5 = 2,500 feed views/second

Therefore:

- Average: 500 feed views/second
- Peak: 2,500 feed views/second

## 5. Photo Storage Per Year

Each photo is 2 MB.

There are 1,000,000 uploads per day.

1,000,000 × 2 MB

= 2,000,000 MB per day

= 2,000 GB per day

= 2 TB per day

Over one year:

2 TB × 365

= 730 TB per year

### Thumbnail storage

Each thumbnail is 50 KB.

1,000,000 photos × 50 KB

= 50,000,000 KB per day

= 50 GB per day

Over one year:

50 GB × 365

= 18,250 GB

= approximately 18.25 TB per year

### Total photo and thumbnail storage

730 TB + 18.25 TB

= approximately 748.25 TB per year

Therefore, SnapShare needs approximately 748 TB of storage per year
for photos and thumbnails, before considering replication or other
storage overhead.

## 6. Read-Heavy or Write-Heavy?

SnapShare is read-heavy.

There are approximately:

- 10 uploads per second
- 500 feed views per second

There are about 50 times more feed views than uploads.

This means the system needs to be designed mainly to handle large numbers
of reads.

Caching, CDNs, load balancing and read replicas can help handle the
large number of feed requests.

## 7. Why Photos Should Not Be Stored Inside the Database

Photo files should not be stored directly inside the relational database
because they are large files and would make the database much larger and
harder to scale.

Instead, photos should be stored in object storage such as Amazon S3,
Cloud Storage or another object-storage service.

The database should store information about the photo, such as:

- photo ID
- user ID
- caption
- upload time
- photo URL
- thumbnail URL

The actual image files are stored in object storage.

## 8. Architecture Diagram

```text
                         ┌─────────────┐
                         │    Users    │
                         └──────┬──────┘
                                │
                         ┌──────▼──────┐
                         │     DNS     │
                         └──────┬──────┘
                                │
                  ┌─────────────┴─────────────┐
                  │                           │
                  ▼                           ▼
          ┌──────────────┐            ┌──────────────┐
          │     CDN      │            │Load Balancer │
          │ Photos/files │            └──────┬───────┘
          └──────────────┘                   │
                                             │
                              ┌──────────────┼──────────────┐
                              │              │              │
                              ▼              ▼              ▼
                         ┌────────┐     ┌────────┐     ┌────────┐
                         │ App 1  │     │ App 2  │     │ App 3  │
                         └───┬────┘     └───┬────┘     └───┬────┘
                             │              │              │
                             └──────────────┼──────────────┘
                                            │
                         ┌──────────────────┼──────────────────┐
                         │                  │                  │
                         ▼                  ▼                  ▼
                    ┌─────────┐       ┌──────────┐       ┌─────────┐
                    │  Cache  │       │ Primary  │       │  Queue  │
                    │ (Redis) │       │    DB    │       │         │
                    └─────────┘       └────┬─────┘       └────┬────┘
                                           │                  │
                                           ▼                  ▼
                                    ┌─────────────┐      ┌─────────┐
                                    │ Read Replica│      │ Worker  │
                                    └─────────────┘      └────┬────┘
                                                              │
                                                              ▼
                                                       ┌─────────────┐
                                                       │  Thumbnail  │
                                                       │   Storage   │
                                                       └─────────────┘

                         ┌─────────────────────────┐
                         │    Object Storage       │
                         │      Original Photos   │
                         └─────────────────────────┘
```
