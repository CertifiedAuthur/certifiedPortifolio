# Zorai Project Handbook

## 1. What This Project Is

Zorai is an AI-powered content operations platform for generating, reviewing, scheduling, and publishing content across multiple channels.

At its core, it combines:
- a **FastAPI backend** for orchestration and APIs,
- a **React frontend** for operators and reviewers,
- **PostgreSQL + pgvector** for persistence and semantic retrieval,
- **Redis + Celery** for background processing and periodic automation,
- **OpenAI models** for generation, analysis, and embeddings,
- **LightRAG** for graph-based knowledge retrieval,
- optional integrations for **X**, **LinkedIn**, **Substack**, **Reddit**, **Firebase notifications**, and email verification.

This is not a simple post generator. It is a content system that tries to turn personal knowledge, uploaded documents, transcripts, discovered ideas, and feedback into a repeatable publishing workflow.

The project has grown into several connected product surfaces:
- knowledge ingestion,
- topic planning,
- topic discovery,
- short-form post generation,
- Substack generation,
- Reddit generation,
- opportunity/proposal generation,
- human review and feedback,
- scheduling and publishing,
- knowledge graph querying,
- analytics and operational settings.

---

## 2. Core Product Idea

The system is built around one belief:

> your future content should come from your existing knowledge, experience, and documented work-not from generic prompting alone.

To achieve that, the platform stores and retrieves knowledge in two main ways:

1. **Vector retrieval (pgvector)**
   - semantic similarity over embedded chunks of uploaded documents and historical content.
   - best for concrete examples and directly relevant passages.

2. **Graph retrieval (LightRAG)**
   - graph-aware retrieval over extracted entities and relationships.
   - best for conceptual relationships, thematic synthesis, and broader technical context.

These retrieval systems are then used in multiple downstream workflows:
- generating weekly topics,
- discovering ranked topic candidates,
- generating short posts,
- generating Substack posts/notes/series,
- generating Reddit posts,
- answering chat-style questions in Knowledge Chat,
- generating Upwork proposals and cover letters.

---

## 3. High-Level System Architecture

## 3.1 Runtime Components

In Docker-based operation, the system consists of these main services:

- **frontend**
  - built from the `web` app,
  - served as a production bundle,
  - talks to the backend API.

- **backend**
  - FastAPI application,
  - exposes all REST APIs under `/api/v1`,
  - also exposes `/health`.

- **worker**
  - Celery worker,
  - executes ingestion, generation, posting, verification, and scheduling tasks.

- **beat**
  - Celery Beat scheduler,
  - triggers recurring jobs like schedule generation, pending schedule processing, and retrying failed posts.

- **postgres**
  - main relational database,
  - also hosts pgvector extension for embeddings.

- **redis**
  - API response cache,
  - Celery broker and result backend use separate Redis DBs.

- **lightrag**
  - separate knowledge graph service,
  - handles entity/relationship extraction and graph-aware query synthesis.

- **nginx** (optional in production profile)
  - reverse proxy for frontend/backend.

## 3.2 Main Architectural Style

The backend uses a **thin-router, service-heavy** pattern.

That means:
- routes mainly validate requests, enforce auth, and call services/tasks,
- business logic lives in `app/modules/**`,
- persistence is handled via SQLAlchemy models and async sessions,
- long-running work is pushed into Celery tasks,
- UI state is mostly page-local in the frontend, while server state is managed with React Query.

## 3.3 Important Architectural Characteristics

- **Asynchronous by default on backend data access** via async SQLAlchemy.
- **Background-first for heavy workflows** like ingestion and generation.
- **Hybrid retrieval strategy** using both vector and graph knowledge.
- **Human-in-the-loop moderation** through pending review, post detail, and feedback collection.
- **Cache + invalidate approach** rather than event-sourced or CQRS architecture.
- **Runtime schema self-healing** at startup through `init_db()` in addition to Alembic migrations.

---

## 4. Tech Stack

## 4.1 Backend

From `pyproject.toml`, the backend stack includes:
- Python 3.12
- FastAPI
- Uvicorn
- SQLAlchemy async
- asyncpg + psycopg2-binary
- Alembic
- pgvector
- Celery
- Redis
- OpenAI SDK
- tiktoken
- pypdf
- python-docx
- yt-dlp
- httpx
- beautifulsoup4
- lxml
- duckduckgo-search
- robotexclusionrulesparser
- python-jose
- bcrypt/passlib-related hashing path
- Authlib
- Firebase Admin SDK
- APScheduler
- Pydantic v2 + pydantic-settings
- structlog
- tenacity
- numpy

## 4.2 Frontend

From `web/package.json`, the frontend uses:
- React 19
- Vite
- TypeScript
- React Router
- TanStack React Query
- Axios
- Tailwind CSS
- Lucide React icons
- Recharts
- react-hot-toast
- Firebase Web SDK

---

## 5. Repository Mental Model

The easiest way to understand this repository is to think of it in 6 layers.

### Layer 1: Entry and infrastructure
- `app/main.py`
- `app/config.py`
- `app/database.py`
- `app/worker.py`
- `Dockerfile`
- `docker-compose.yml`
- `docker-compose.dev.yml`

### Layer 2: Data model
- `app/models/**`

### Layer 3: Public APIs
- `app/routes/**`
- `app/schemas.py`

### Layer 4: Business logic
- `app/modules/**`
- `app/tasks/**`

### Layer 5: Web application
- `web/src/pages/**`
- `web/src/components/**`
- `web/src/contexts/**`
- `web/src/api/**`
- `web/src/types.ts`

### Layer 6: Schema evolution and tests
- `alembic/**`
- `tests/**`

---

## 6. Application Startup and Boot Sequence

The startup process is important because this system does more at boot than many normal apps.

## 6.1 `app/main.py`

The FastAPI app is created in `create_app()`.

Main behaviors:
- loads settings,
- sets FastAPI docs availability depending on environment,
- applies CORS middleware,
- registers every API router under `/api/v1`,
- exposes `/health`.

Registered routers include:
- auth
- content
- posts
- schedule
- feedback
- settings
- topics
- substack
- reddit
- topic_discovery
- ratings
- knowledge_graph
- opportunities

## 6.2 Lifespan behavior

On startup:
- logging is configured,
- settings are loaded,
- database initialization runs,
- LinkedIn setup hints may be logged if OAuth config is incomplete.

On shutdown:
- the app logs shutdown cleanly.

## 6.3 Database initialization behavior

`app/database.py` contains `init_db()`, which is more than a simple `create_all()`.

It performs:
- pgvector extension enablement,
- enum normalization and repair,
- enum value additions,
- conditional type migration for topic discovery statuses,
- advisory lock usage to prevent cross-process schema deadlocks,
- table creation,
- data normalization for legacy uppercase enum values,
- idempotent column additions for evolving schemas.

This means the app includes **runtime schema repair logic**. That is convenient operationally, but it also means schema behavior is not controlled only by Alembic.

---

## 7. Configuration Model

Configuration is centralized in `app/config.py` using `pydantic-settings`.

## 7.1 Categories of settings

### App
- app name, environment, debug, secret key, host, port

### Operation mode
- `automatic` or `manual`

### Database
- async and sync PostgreSQL URLs

### Redis / Celery
- Redis URL
- broker URL
- result backend URL

### OpenAI
- API key
- main model
- embedding model
- max tokens
- temperature

### Platform integrations
- X API credentials
- LinkedIn OAuth credentials/tokens

### Notifications
- Firebase project and credential paths

### Verification
- score thresholds
- scrape/search settings

### Scheduling
- timezone
- start/end hour
- jitter window

### Transcription
- OpenAI vs AssemblyAI toggle

### LightRAG
- service URL
- API key
- timeout
- default query mode

### Security
- encryption key
- JWT algorithm
- token expiration
- CORS origins

### Email verification
- SMTP host, port, username, password
- sender identity
- verification expiration
- frontend URL

### Rate limiting
- X and LinkedIn daily/interval limits

## 7.2 Notable design detail

Some settings are updated through the API, but parts of the system still fundamentally derive behavior from environment-backed settings. In practice, not all runtime changes behave like durable persisted settings.

---

## 8. Data Model Deep Dive

This section is the backbone of the system.

## 8.1 Base mixins

From `app/models/base.py`:
- `UUIDMixin` gives UUID primary keys.
- `TimestampMixin` gives `created_at` and `updated_at` with timezone-aware defaults.

## 8.2 User and OAuth models

From `app/models/auth.py`:

### `User`
Represents an application user/operator.

Fields include:
- email
- hashed password
- active flag
- admin flag
- display name
- FCM device token
- email verification state and token fields

### `OAuthToken`
Stores encrypted platform tokens.

Fields include:
- provider (`x` or `linkedin`)
- encrypted access token
- encrypted refresh token
- token type
- scope
- expiration timestamp

## 8.3 Content ingestion models

From `app/models/content.py`:

### `ContentDocument`
Represents an uploaded file or YouTube transcript.

Key fields:
- title
- document type (`pdf`, `docx`, `txt`, `youtube_transcript`)
- processing status (`pending`, `processing`, `completed`, `failed`)
- source URL / file path
- raw text
- metadata JSON
- week start date
- whether it is general knowledge vs weekly routine
- knowledge destination (`main`, `substack`, or similar repo destination)
- personal context type
- progress tracking fields
- error message

### `ContentChunk`
Represents one chunk of a document.

Key fields:
- document id
- chunk index
- content text
- embedding (3072-dim vector)
- token count
- day of week
- section title

These are the main vector-retrieval primitives.

## 8.4 Legacy / shared knowledge model

From `app/models/knowledge.py`:

### `KnowledgeEntry`
A knowledge unit with embedding and metadata.

This appears to be an older or parallel knowledge store beside `ContentChunk`.

Important fields:
- source type
- source document id
- title
- content
- embedding
- token count
- day of week
- attribution
- tags
- knowledge repo
- personal context type

The codebase suggests that `ContentChunk` is now the more primary retrieval surface, while `KnowledgeEntry` still exists for compatibility and some hybrid retrieval paths.

## 8.5 Topics and topic plans

From `app/models/topic.py`:

### `TopicPlan`
Represents a weekly topic plan.

Key fields:
- title
- week label
- active flag

### `Topic`
Represents one topic within a plan.

Key fields:
- plan id
- day of week + day index
- platform
- post type
- title
- description
- talking points
- status (`draft`, `approved`, `used`, `discarded`)
- source context

These power the weekly planning workflow.

## 8.6 Posts and threads

From `app/models/post.py`:

### `Post`
The central generated-content record.

Key fields:
- platform (`x`, `linkedin`, `substack`, `reddit`)
- status (`draft`, `generating`, `verifying`, `pending_review`, `approved`, `scheduled`, `publishing`, `published`, `failed`, `discarded`)
- content
- content embedding
- character count
- thread flag
- verification score / passed flag
- scheduled/published timestamps
- external platform id
- generation prompt
- knowledge entry ids
- day of week
- error message
- retry count
- manually posted flag
- Substack-specific metadata

### `PostThread`
For X threads.

Key fields:
- parent post id
- sequence index
- content
- character count
- optional external post id

### `SubstackSeries`
A long-form content series.

### `PostClaim`
One extracted factual claim for verification.

## 8.7 Verification persistence

From `app/models/verification.py`:

### `VerificationResult`
Overall verification record per post.

Fields:
- post id
- overall score
- claim count
- verified claim count
- search queries used
- summary

### `VerificationEvidence`
Evidence row for a claim.

Fields:
- claim id
- source URL
- page title
- scraped content
- relevant excerpt
- support score
- analysis

## 8.8 Feedback model

From `app/models/feedback.py`:

### `UserFeedback`
Captures reviewer action on a post.

Actions:
- approved
- rejected
- edited

Stored fields include:
- original content
- edited content
- rejection reason
- notes

This is crucial because it feeds analytics and style learning.

## 8.9 Scheduling model

From `app/models/schedule.py`:

### `PostSchedule`
A scheduled slot for a platform.

Key fields:
- optional post id
- platform
- scheduled time
- status (`pending`, `executed`, `skipped`, `failed`)
- day of week

## 8.10 Notifications

From `app/models/notification.py`:

### `NotificationLog`
Stores outbound push notification attempts.

Fields:
- notification type
- notification status
- title
- body
- data JSON
- FCM message id
- error message

---

## 9. Security and Authentication

## 9.1 JWT authentication

From `app/auth.py`:
- passwords are hashed with bcrypt,
- JWTs are signed using the configured secret and algorithm,
- bearer auth is enforced through FastAPI dependencies,
- `get_current_user()` fetches the user from the DB and checks activity status,
- `require_admin()` gates admin-only endpoints.

## 9.2 Email verification

The auth flow requires email verification before successful login. Verification tokens are stored on the user record and email sending is handled through SMTP-based service code.

## 9.3 OAuth token storage

LinkedIn and X OAuth tokens are persisted in encrypted form in `oauth_tokens`.

## 9.4 Important auth caveat

There is a notable implementation risk visible in the codebase: registration logic reportedly sets admin status too broadly rather than only for the first user. A future maintainer should verify and fix this carefully.

---

## 10. Caching Strategy

From `app/cache.py`, the system uses Redis-based read-through caching for selected API endpoints.

Key properties:
- keys are prefixed with `cache:`,
- TTL depends on namespace,
- writes invalidate namespace prefixes,
- caching failure should not break API correctness.

Namespaces include:
- posts
- pending
- documents
- schedule-today
- schedule-upcoming
- feedback-stats
- style-analysis
- settings
- topics

This is a simple but effective optimization model.

---

## 11. Logging

From `app/logging_config.py`:
- uses `structlog`,
- supports JSON or console output,
- timestamps and log levels are included,
- noisy dependency logs are reduced.

Operationally, this project expects structured logs to be part of normal observability.

---

## 12. Background Processing and Automation

## 12.1 Celery worker

From `app/worker.py`, Celery is configured with:
- JSON serialization,
- Redis broker/backend,
- UTC handling,
- per-domain queue routing,
- late acknowledgment,
- single-prefetch worker behavior,
- retry defaults,
- periodic beat schedule.

Queues include:
- ingestion
- generation
- verification
- posting
- default/scheduler

## 12.2 Beat schedule

Recurring jobs:
- generate daily schedule at 00:05,
- process pending schedules every 5 minutes,
- retry failed posts every 30 minutes.

## 12.3 Why background jobs matter here

This project does many expensive operations that should not block HTTP requests:
- document parsing,
- transcription,
- chunk embedding,
- LightRAG insertion,
- post generation,
- post publishing,
- verification,
- schedule processing.

The backend therefore uses a pattern of:
1. accept request,
2. create or identify DB row,
3. enqueue task,
4. return task-like acknowledgement,
5. UI polls or refreshes relevant pages.

---

## 13. Backend Feature Areas

## 13.1 Auth and account management

Main responsibilities:
- user registration,
- login,
- current user retrieval,
- email verification,
- resend verification,
- device registration for notifications,
- LinkedIn OAuth callback handling.

Conceptually, auth is both access control and a small operator-account system.

## 13.2 Content ingestion

This is where the knowledge base begins.

Primary capabilities:
- upload PDF, DOCX, TXT,
- ingest YouTube URL,
- parse and normalize text,
- split into chunks,
- embed chunks,
- persist document + chunk data,
- optionally push into LightRAG graph pipeline,
- track progress and errors,
- delete documents and related graph artifacts.

The ingestion flow is foundational to the project because nearly every “smart” feature becomes stronger as ingestion quality improves.

## 13.3 Topic planning

The topic planner generates a weekly content plan from the knowledge base.

Main behaviors:
- creates one active topic plan,
- creates per-day topics,
- includes titles, descriptions, talking points, post types, and source context,
- allows later editing, deletion, and status updates.

This is the structured planning layer.

## 13.4 Topic discovery

Topic discovery is different from topic planning.

Planning answers:
- “What should I post this week?”

Discovery answers:
- “What are promising ranked content opportunities hidden in my knowledge base?”

Discovery candidates are scored and tracked through statuses such as:
- discovered
- planned
- drafted
- published

This backlog is especially tied into Substack and broader ideation.

## 13.5 Short-form post generation

This is the central post engine for X and LinkedIn, and in some paths other platforms.

Important characteristics visible from the codebase:
- pulls context from personal knowledge and graph retrieval,
- incorporates feedback-derived style analysis,
- stores generation prompt for auditability,
- can split long X content into thread parts,
- attempts anti-repetition by using recent post excerpts,
- supports generation from topics, discovered ideas, or direct prompts.

## 13.6 Verification

The codebase contains a serious verification subsystem:
- claim extraction,
- web search,
- page scraping,
- evidence scoring,
- overall verification summary.

However, an important maintainer note is that the code suggests this flow is not fully wired into the current main post-generation pipeline in the way the docs/comments may imply.

So verification is present and modeled deeply, but parts of it appear underutilized in the active end-to-end path.

## 13.7 Publishing

Posting logic handles:
- publishing to X,
- publishing to LinkedIn,
- tracking external IDs,
- daily rate-limit checking,
- retry behavior,
- schedule-driven publication.

There is some inconsistency in the codebase around X strategy: both API-based posting and browser/session-oriented automation concepts exist.

## 13.8 Scheduling

Scheduling creates time slots and later processes due schedules.

This area decides:
- how many platform posts per day,
- time windows,
- timezone,
- jitter/randomization,
- whether a schedule already has a post assigned,
- whether a due slot should publish an existing post or trigger generation.

## 13.9 Feedback and learning

Feedback is captured whenever a reviewer:

That feedback powers:

## 13.10 Ratings

The project also contains explicit rating workflows in addition to basic feedback. This gives a richer signal layer for analyzing post quality, especially around Substack-style content.

## 13.11 Substack generation

Substack is treated as its own feature domain, not just a platform enum.

Capabilities include:
- generate full Substack posts,
- generate shorter notes,
- generate series,
- track content mode (`free`, `paid`, `playbook`),
- track tone/style/pillar,
- associate posts with series and playbook numbering.

This area is more editorially rich than short-form generation.

## 13.12 Reddit generation

Reddit generation is specialized around community-native writing.

Inputs include:
- topic,
- subreddit description,
- strategy selection,
- optional knowledge base usage.

The goal is not generic repurposing, but subreddit-aware content shaped by community norms.

## 13.13 Knowledge graph integration

The LightRAG layer provides:
- health checks,
- graph stats,
- node/edge listing,
- indexed document listing,
- delete operations,
- insertion with tracking,
- query modes (`naive`, `local`, `global`, `hybrid`, `mix`).

This is exposed both for internal retrieval and a user-facing query interface.

## 13.14 Opportunities generator

A newer feature area generates:
- Upwork proposals,
- formal cover letters.

The pipeline here combines:
- GPT-based job analysis,
- PGVector retrieval,
- LightRAG retrieval,
- GPT drafting.

This means the project is not only a content engine anymore; it also acts as a personalized career/intellectual asset generator.

---

## 14. API Surface by Domain

This section explains the API from the operator’s point of view.

## 14.1 Auth API

Main actions:
- register
- login
- get current user
- register device token
- verify email
- resend verification
- LinkedIn OAuth callback

## 14.2 Content API

Main actions:
- upload document
- ingest YouTube
- list documents
- get document
- delete document

Expected behavior:
- heavy processing is async,
- document status is polled from frontend.

## 14.3 Posts API

Main actions:
- list posts
- list pending-review posts
- get single post
- preview with verification details
- generate post
- edit content
- approve/reject/edit action
- delete post
- regenerate post
- publish now
- toggle manual posted status

## 14.4 Schedule API

Main actions:
- today’s schedule
- upcoming/due schedules
- generate schedule

## 14.5 Feedback API

Main actions:
- stats
- style analysis

## 14.6 Settings API

Main actions:
- get/update settings
- set mode
- get platform connections
- get LinkedIn auth URL
- disconnect platform

## 14.7 Topics API

Main actions:
- generate topics
- list plans
- get active plan
- get plan by id
- update topic
- delete plan
- delete topic

## 14.8 Substack API

Main actions:
- generate post
- generate note
- generate series
- list posts
- list series
- get series
- get series posts
- get option catalogs

## 14.9 Discovery API

Main actions:
- discover topic candidates
- get backlog with filters
- update status
- update notes
- generate post from discovery topic
- delete topic candidate

## 14.10 Ratings API

Main actions:
- submit rating
- get rating for post
- get rating analytics

## 14.11 Reddit API

Main actions:
- generate Reddit post
- list Reddit posts

## 14.12 Knowledge Graph API

Main actions:
- health
- stats
- list nodes
- list edges
- list graph documents
- delete graph document
- insert text
- track insert status
- query graph

## 14.13 Opportunities API

Main action:
- generate proposal / cover letter response

---

## 15. Frontend Architecture

## 15.1 General model

The frontend is a React SPA organized around pages under `web/src/pages`.

There is no heavy global state library. Instead, state is split as follows:
- **React Query** for server state,
- **AuthContext** for user/session,
- **ThemeContext** for dark mode,
- **SidebarContext** for shell UI behavior,
- local component state for forms and toggles.

## 15.2 Route structure

Public routes:
- login
- register
- verify-email

Protected layout routes:
- dashboard
- topics
- substack
- reddit
- posts
- post detail
- pending review
- content
- schedule
- analytics
- settings
- opportunities
- chat

## 15.3 API access strategy

Frontend API calls are centralized in `web/src/api/endpoints.ts`.

Benefits of this approach:
- page code stays simpler,
- request contracts mirror backend contracts,
- adding a new page usually means adding one new endpoint wrapper and matching TS types.

## 15.4 Styling strategy

The UI is built with Tailwind classes plus shared semantic component classes in `web/src/index.css`:
- `.btn`
- `.btn-primary`
- `.btn-secondary`
- `.btn-danger`
- `.btn-ghost`
- `.btn-icon`
- `.card`
- `.input`
- `.label`
- `.badge`

Dark mode is implemented through:
- `ThemeContext`,
- `html.dark`,
- Tailwind `darkMode: "class"`,
- global CSS remapping for common gray-scale utilities.

This design makes dark mode broad and immediate, but also means some theme behavior comes from global CSS specificity tricks rather than purely local component styles.

---

## 16. Frontend Pages Explained

## 16.1 Login

Purpose:
- authenticate operator.

Behavior:
- calls login endpoint,
- detects unverified email errors,
- supports resending verification.

## 16.2 Register

Purpose:
- create account.

Behavior:
- calls register endpoint,
- moves user into a “check your email” path.

## 16.3 Verify Email

Purpose:
- finalize signup.

Behavior:
- consumes token from URL,
- calls verify endpoint,
- stores returned access token.

## 16.4 Dashboard

Purpose:
- operational overview.

Shows:
- post stats,
- pending review count,
- today’s schedule,
- feedback metrics,
- recent post information.

## 16.5 Topics page

Purpose:
- manage weekly topic planning and discovery.

Capabilities:
- generate weekly plans,
- edit/delete topics,
- review by day of week,
- run topic discovery,
- bulk-generate platform posts from discovered or custom topics,
- now limited to X and LinkedIn for discovery-page post generation.

This page is one of the biggest operational surfaces in the app.

## 16.6 Posts page

Purpose:
- central library of generated posts.

Capabilities:
- filter by status/platform,
- bulk select,
- bulk delete,
- open post detail,
- generate from weekly plan or discovery backlog.

## 16.7 Post detail

Purpose:
- reviewer workbench.

Capabilities:
- inspect content,
- inspect verification claims/evidence,
- approve,
- reject,
- edit,
- publish now in certain cases.

This is where the system becomes human-supervised rather than purely automatic.

## 16.8 Pending Review

Purpose:
- quick triage queue.

Behavior:
- polls pending-review posts,
- links into detailed review.

## 16.9 Content page

Purpose:
- ingest knowledge.

Capabilities:
- upload files,
- ingest YouTube,
- monitor progress,
- delete documents,
- see per-document status.

A centered confirmation modal is now used for document deletion.

## 16.10 Schedule page

Purpose:
- operational calendar view.

Capabilities:
- view today’s schedule,
- view upcoming/due schedules,
- generate schedule.

## 16.11 Analytics

Purpose:
- feedback and style monitoring.

Capabilities:
- KPI visualizations,
- style analysis output,
- charting.

## 16.12 Settings

Purpose:
- operational configuration and integration state.

Capabilities:
- update settings,
- change manual/automatic mode,
- inspect integration connection state,
- begin LinkedIn authorization,
- disconnect X/LinkedIn.

## 16.13 Substack

Purpose:
- long-form content workspace.

Tabs/capabilities:
- generate post,
- generate note,
- view discovery backlog,
- generate from discovered topics,
- rate generated long-form pieces,
- manage series-related content.

## 16.14 Reddit

Purpose:
- community-native Reddit drafting.

Capabilities:
- enter subreddit norms/context,
- choose strategy,
- generate async draft,
- review generated Reddit posts.

## 16.15 Knowledge Chat

Purpose:
- ask questions against the knowledge base like ChatGPT.

Capabilities:
- user/assistant message history,
- selectable LightRAG query modes,
- source reference expansion,
- reusable starter prompts.

This is the most direct “query my documents” experience in the app.

## 16.16 Opportunities

Purpose:
- generate career-facing writing artifacts.

Capabilities:
- choose mode (proposal or cover letter),
- paste job description,
- add optional metadata,
- receive structured analysis plus generated output.

---

## 17. Shared Frontend Components and Contexts

## 17.1 Layout shell

Main shell pieces:
- `Layout`
- `Header`
- `Sidebar`

Responsibilities:
- protected app framing,
- responsive nav,
- dark mode toggle,
- user identity and logout.

## 17.2 `TopicPicker`

A particularly important component.

It merges two sources:
- weekly plan topics,
- discovery backlog topics,

and also supports custom free-text input.

This helps keep topic entry consistent across Substack, Reddit, and any future topic-based surfaces.

## 17.3 `ConfirmModal`

Used for destructive confirmations.

It now provides a centered, focused confirmation experience instead of relying only on top-right toast-style interactions.

## 17.4 Auth context

Handles:
- current user loading,
- token persistence,
- logout,
- device registration / notification bootstrap.

## 17.5 Theme context

Handles:
- persisted light/dark preference,
- immediate application of `html.dark`,
- global theme switching.

## 17.6 Sidebar context

Handles:
- mobile sidebar state,
- desktop collapse persistence.

---

## 18. End-to-End Workflows

This is one of the most important sections for future understanding.

## 18.1 User signup and access workflow

1. User registers with email and password.
2. Backend stores user and verification token.
3. SMTP email is sent.
4. User clicks verification link.
5. Frontend verify page calls verify endpoint.
6. Access token is stored.
7. Protected app becomes available.

## 18.2 Document ingestion workflow

1. User uploads file or enters YouTube URL.
2. Backend creates content document record.
3. Background task parses/transcribes content.
4. Text is chunked.
5. Embeddings are generated.
6. Chunks are stored in DB.
7. LightRAG insertion may run as a follow-up branch.
8. Frontend polls document status and progress.
9. Completed knowledge becomes available to other features.

## 18.3 Weekly topic planning workflow

1. User opens Topics page.
2. Frontend requests active plan or generates new one.
3. Topic generation service pulls retrieval context.
4. GPT produces structured topic plan.
5. Plan and topics are stored.
6. User can edit, approve, discard, or delete topics.
7. Posts may later be generated from approved topics.

## 18.4 Topic discovery workflow

1. User triggers discovery.
2. Discovery service gathers graph/context signals.
3. GPT synthesizes ranked topic candidates.
4. Candidates are stored with scores and statuses.
5. User can promote, annotate, generate from, or delete candidates.

## 18.5 Post generation workflow

1. User chooses topic source or direct generation path.
2. Backend creates/queues generation request.
3. Generation service retrieves:
   - semantically similar chunks,
   - graph context,
   - personal experience context,
   - style/feedback context,
   - recent-post anti-repetition context.
4. GPT drafts content.
5. If X content is long, thread splitting may occur.
6. Post record is stored with prompt metadata.
7. Post enters review or later scheduling path depending on workflow.

## 18.6 Review and approval workflow

1. Generated post appears in pending review or posts list.
2. Reviewer opens detailed preview.
3. Reviewer inspects post and verification details.
4. Reviewer approves, rejects, or edits.
5. Feedback is stored.
6. Downstream publishing or scheduling becomes possible.

## 18.7 Scheduling workflow

1. Daily schedule is generated by job or user action.
2. Time slots are created for platforms.
3. Pending schedules are checked periodically.
4. If a due schedule has a linked post, publish it.
5. Otherwise, trigger generation or skip/fail according to logic.
6. Schedule status is updated.

## 18.8 Publishing workflow

1. Post is approved or otherwise ready.
2. Publishing service checks limits and integration state.
3. Platform-specific publishing call is made.
4. External post ID is stored.
5. Post status becomes published.
6. Push notification may be sent.

## 18.9 Knowledge Chat workflow

1. User asks a question in chat UI.
2. Frontend calls LightRAG query endpoint.
3. Retrieval mode determines breadth/strategy.
4. LightRAG synthesizes answer with references.
5. Frontend renders answer plus expandable source snippets.

## 18.10 Opportunities workflow

1. User pastes job description.
2. Service runs initial analysis.
3. PGVector retrieval finds directly relevant context.
4. LightRAG adds broader technical relationships.
5. GPT writes proposal/cover letter.
6. Frontend shows result and structured analysis.

---

## 19. Retrieval Architecture

This is one of the defining aspects of the system.

## 19.1 PGVector retrieval

Used for:
- finding semantically similar content chunks,
- grounding generation in specific prior material,
- retrieving examples and concrete details.

Strengths:
- direct relevance,
- chunk-level specificity,
- easy ranking by similarity.

## 19.2 LightRAG retrieval

Used for:
- graph-aware conceptual retrieval,
- synthesis across entities and relationships,
- knowledge chat,
- stronger conceptual grounding in some generation flows.

Strengths:
- better thematic and relational understanding,
- useful for “how things connect” questions.

## 19.3 Combined use

Many features combine both systems.

In practical terms:
- PGVector provides **precise evidence and examples**,
- LightRAG provides **wider conceptual framing**.

This is one of the smartest design decisions in the project.

---

## 20. Quality Control Layers

The system has several quality-control mechanisms, though they are not always equally active.

### Layer 1: source grounding
Generation prompts are augmented by retrieved knowledge.

### Layer 2: anti-repetition
Recent content excerpts are used to vary output.

### Layer 3: human review
Pending review and post detail allow approval/edit/rejection.

### Layer 4: feedback capture
User feedback is persisted and later analyzed.

### Layer 5: verification subsystem
A claims/evidence model exists for factual validation.

### Layer 6: rating system
Explicit rating flows provide richer quality signals.

---

## 21. Infrastructure and Deployment Model

## 21.1 Dockerfile strategy

The root `Dockerfile` is multi-stage:
- base
- dependencies
- application
- development target
- production target
- worker target
- beat target

Important details:
- uses Python 3.12 slim,
- installs `uv` tooling,
- includes ffmpeg and PostgreSQL build deps,
- creates non-root app user,
- exposes port 8000,
- uses entrypoint script in standard app target.

## 21.2 Compose strategy

There are two main compose definitions:

### `docker-compose.yml`
- more production-shaped,
- includes optional nginx profile,
- frontend served on port 3000 by default,
- backend on 8000.

### `docker-compose.dev.yml`
- local development-oriented,
- no nginx,
- frontend default 3002,
- backend default 8002,
- backend runs with reload and reload-dir.

## 21.3 Volumes

Persistent storage includes:
- PostgreSQL data,
- Redis data,
- uploads,
- X sessions,
- X screenshots,
- LightRAG storage.

This shows the project expects long-lived operational state, not only ephemeral jobs.

---

## 22. Frontend-Backend Contract Style

The frontend type layer closely mirrors backend schemas.

This has several advantages:
- less confusion about request/response shape,
- easier feature addition,
- easier debugging because payload structures line up with domain objects.

The downside is that model drift between backend and frontend needs active maintenance whenever the backend evolves.

---

## 23. Operational Modes

The backend supports `manual` and `automatic` operation modes.

Conceptually:
- **manual** means more human intervention and approval-oriented flow,
- **automatic** suggests more autonomous scheduling/publishing behavior.

This is a project-level product control, not just a UI preference.

---

## 24. Notifications

The system supports Firebase push notifications.

Main roles of notifications:
- post published alerts,
- post pending review alerts,
- verification failure alerts,
- system error alerts.

Device registration is tied into authenticated frontend behavior.

---

## 25. What Makes This Project Distinctive

This project is notable because it is not just one thing.

It combines:
- personal knowledge management,
- semantic retrieval,
- graph retrieval,
- editorial planning,
- AI generation,
- moderation,
- analytics,
- scheduling,
- publishing,
- career-writing generation,
- chat-style document querying.

A simpler project would stop at “generate a tweet.”
This one tries to build a durable personal content operating system.

---

## 26. Important Design Choices and Why They Matter

## 26.1 Thin routers, heavy services

Good because:
- route files stay readable,
- core logic is reusable,
- domain logic can evolve separately from HTTP transport.

## 26.2 Background task orientation

Good because:
- expensive steps do not block request/response lifecycle,
- ingestion and generation remain operationally manageable.

## 26.3 Hybrid retrieval

Good because:
- one retrieval mode is rarely enough,
- graph + vector gives better balance of specificity and abstraction.

## 26.4 Prompt traceability

Storing prompts on posts is valuable for:
- debugging,
- quality iteration,
- future reproducibility.

## 26.5 Human-in-the-loop control

This is critical in content systems because:
- quality varies,
- platform tone matters,
- factual or reputational risk exists,
- feedback is a strategic asset.

---

## 27. Important Quirks, Risks, and Maintenance Notes

This is one of the most important sections for a future maintainer.

### 27.1 Runtime schema repair exists alongside migrations
The project does not rely only on Alembic. Startup also mutates schema and normalizes enum data. This makes bootstrapping convenient, but it can obscure migration boundaries.

### 27.2 Verification appears partially disconnected from the main generation path
The codebase contains a substantial verification subsystem, but current active generation flow appears less tightly integrated than comments may suggest.

### 27.3 Settings updates may not fully persist the way an operator expects
Some settings behave more like runtime/in-memory mutations than true durable configuration changes.

### 27.4 X integration strategy is not fully unified
There are signs of both API-based and browser/session-based X approaches in the codebase.

### 27.5 Knowledge storage has overlap
`ContentChunk` and `KnowledgeEntry` both exist. A future refactor may want to clarify which one is canonical for each retrieval use case.

### 27.6 Some very large frontend files are feature-packed
Pages like Topics, Substack, and some others are powerful but large. Long-term maintainability would improve if they were decomposed into smaller components/hooks.

### 27.7 UX consistency is improving but not complete
A centered confirmation modal now exists, but not every destructive action in the app necessarily uses a unified confirmation flow yet.

### 27.8 Admin handling deserves audit
User admin assignment should be rechecked carefully for security correctness.

### 27.9 Analytics percentages may need verification
The frontend appears to treat approval-rate formatting inconsistently across surfaces.

### 27.10 Some backend capabilities are richer than the current UI
For example, much of the LightRAG admin/exploration surface is available on the backend even when not fully exposed in frontend pages.

---

## 28. Suggested Mental Model for Future You

If you revisit this project years later, remember it in this order:

### First: it is a knowledge system
Everything starts with content ingestion and retrieval.

### Second: it is a planning system
Topics and discovery decide what content should exist.

### Third: it is a generation system
Multiple generators turn knowledge into publishable assets.

### Fourth: it is a review system
Humans shape, approve, reject, and teach the system.

### Fifth: it is an automation system
Celery, schedules, and publishing move work forward over time.

### Sixth: it is a personal leverage system
Knowledge Chat and Opportunities show that the value is not only social posting-it is reusable intelligence.

---

## 29. Suggested Reading Order for a New Maintainer

If someone new joins and wants to understand the project quickly, this is the best code-reading order:

1. `app/main.py`
2. `app/config.py`
3. `app/database.py`
4. `app/models/post.py`
5. `app/models/content.py`
6. `app/models/topic.py`
7. `app/routes/posts.py`
8. `app/modules/generation/service.py`
9. `app/tasks/generation.py`
10. `app/routes/content.py`
11. `app/tasks/ingestion.py`
12. `app/modules/knowledge_base/retriever.py`
13. `app/routes/topics.py`
14. `app/modules/topics/service.py`
15. `app/routes/knowledge_graph.py`
16. `web/src/App.tsx`
17. `web/src/api/endpoints.ts`
18. `web/src/types.ts`
19. `web/src/pages/Topics.tsx`
20. `web/src/pages/Posts.tsx`
21. `web/src/pages/Content.tsx`
22. `web/src/pages/Substack.tsx`
23. `web/src/pages/KnowledgeChat.tsx`
24. `web/src/components/Sidebar.tsx`
25. `web/src/contexts/AuthContext.tsx`

---

## 30. If You Needed to Rebuild This Project From Scratch

The essential build order would be:

1. auth and user model
2. content document storage
3. chunking + embeddings + pgvector retrieval
4. post model and generation pipeline
5. review workflow
6. schedule model and publishing loop
7. topic planning
8. topic discovery
9. Substack and Reddit specializations
10. LightRAG integration
11. notifications
12. analytics and ratings
13. opportunities generator
14. advanced UX like dark mode and knowledge chat

This order reflects the real dependency structure of the project.

---

## 31. Final Summary

Zorai is a multi-surface AI operations platform centered on turning private knowledge into reusable publishing and career assets.

Its deepest foundations are:
- ingestion,
- retrieval,
- planning,
- generation,
- review,
- automation.

Its strongest architectural ideas are:
- hybrid retrieval,
- background-task orchestration,
- human-in-the-loop control,
- prompt traceability,
- durable domain modeling.

Its biggest long-term maintenance concerns are:
- runtime schema repair complexity,
- overlapping knowledge stores,
- partial verification integration,
- inconsistent integration strategies in some areas,
- large frontend feature files.

If you remember only one sentence about this system, remember this:

> Zorai is a personal knowledge-to-content operating system that uses AI, retrieval, review, and automation to transform owned knowledge into structured, publishable outputs.
