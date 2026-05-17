# Next.js Delphi Rebrand Design

## Summary

AcaraKita will gain a new `frontend-next/` application that replaces the existing vanilla frontend with a full Next.js product shell. The current AdonisJS + MongoDB backend remains the source of truth for authentication, events, profile data, weather, holidays, dashboard data, and GraphQL search.

The new UI follows the Delphi “Cognac-Stained Parchment” style: a warm parchment interface, editorial typography, calm spacing, rounded cards, and restrained accents.

## Goals

- Rebuild the public and authenticated AcaraKita UI in Next.js.
- Preserve the current backend API behavior and data model.
- Rebrand the interface with the Delphi visual system.
- Use a modern route structure for public and authenticated pages.
- Improve the authenticated dashboard around event management while retaining calendar, weather, holiday, and stats context.

## Non-goals

- Rewrite the AdonisJS backend into Next.js.
- Change the MongoDB schemas unless a UI-blocking backend gap is discovered later.
- Replace current auth behavior beyond what is needed for the Next.js client session.
- Add unrelated product features beyond the current app capabilities.

## Application Architecture

The project will add a separate Next.js app under `frontend-next/`. This keeps the existing AdonisJS API project intact and allows the frontend to be built, tested, and deployed independently.

The Next.js app will consume the existing API through a shared client layer. Pages and components should not duplicate raw fetch logic. Authenticated API requests will attach the JWT token stored by the client session flow.

The AdonisJS backend remains responsible for:

- User registration and login
- JWT validation
- Event CRUD
- Dashboard statistics
- Profile reads and updates
- Password reset or change behavior exposed by the existing API
- Weather and holiday data
- GraphQL event search

The Next.js frontend is responsible for:

- Route structure and navigation
- Delphi design system implementation
- Client session handling
- Auth redirects
- Form UI and client-side interaction state
- Rendering API data and mutation feedback

## Routes

The Next.js app will use modern product-style routes:

- `/` — editorial premium landing page
- `/sign-in` — login page
- `/sign-up` — registration page
- `/app` — authenticated dashboard command center
- `/app/profile` — profile and account settings
- `/app/search` — GraphQL-powered event search

Unauthenticated users who visit protected `/app` routes should be redirected to `/sign-in`.

## Visual Design System

The UI will use the Delphi “Cognac-Stained Parchment” visual direction.

### Colors

- Primary background: Parchment White `#fdf6ee`
- Primary text: Deep Cognac `#2b180a`
- Secondary text and subtle borders: Muted Stone `#94877c`
- Tertiary text and accents: Pressed Cacao `#7f6e60`
- Primary CTA background: Burnt Umber `#3e2407`
- Hover and secondary surfaces: Cloud Fog `#f0e6dc`
- Sparse highlights: Fire Opal `#f65726` and Sunset Orange `#ff5c00`
- Text on dark backgrounds: White `#ffffff`

### Typography

Use Source Serif as the substitute for Martina Plantijn Light. It will be used for large editorial headings and section titles. Use Inter for body copy, navigation, forms, buttons, metadata, and utility text.

Large headings should use low font weights, tight negative letter spacing, and calm line heights. Body copy should default to Inter around 15px with readable 1.4 line height.

### Components

The Next.js app should include a small shared design system for:

- Primary, secondary, tertiary, and auth buttons
- Text inputs and form fields
- Cards and feature cards
- Page shell and navigation
- Auth forms
- Event cards
- Dashboard panels
- Toast or inline feedback messages
- Empty states

Interactive elements and contained content blocks should use rounded corners, typically 12px for buttons and inputs and 16–20px for larger cards. Shadows should be subtle and diffuse.

## Public Landing Page

The landing page will use an editorial premium direction. It should feel calm, scholarly, and invitation-first rather than loud or highly saturated.

The hero section should include:

- A centered Source Serif headline
- Short Inter subcopy describing AcaraKita as a refined way to manage social events
- Primary and secondary CTAs
- Floating testimonial-like or event insight cards that suggest thoughtful activity and social proof

The page can include feature sections below the hero, using two-column content and compact card grids. The visual rhythm should alternate between parchment and cloud-fog surfaces where useful.

## Auth Pages

`/sign-in` and `/sign-up` should use focused parchment-style forms with minimal distraction. They will call the existing `/auth/login` and `/auth/register` endpoints.

Successful authentication stores the JWT and user session data for subsequent protected requests, then routes the user into `/app`. Errors should appear near the relevant form controls when possible, with a general calm error state for API-level failures.

## Authenticated App Shell

The `/app` area will use a persistent product shell with clear navigation to dashboard, search, and profile. Navigation should use muted stone for inactive items and deep cognac for active or hover states.

The selected dashboard layout is a two-column command center:

- Left/main column: event management, primary actions, and event cards
- Right/context column: calendar, weather, holidays, and lightweight stats

On smaller screens, the layout should collapse into a single-column flow with the event management area first and context panels below it.

## Event Management

The dashboard should preserve current event CRUD capabilities:

- List events
- Create events
- Edit events
- Delete events
- Display title, date, location, and notes

Event create and edit interactions may use modals, drawers, or dedicated inline forms, but they should stay consistent with the Delphi design system and avoid dense visual noise.

Mutations should provide toast-style or inline success and failure feedback. Empty event states should be warm and useful, with a clear CTA to create the first event.

## Search

`/app/search` will use the existing GraphQL endpoint for event search. Search should support the current searchable dimensions: title, date, location, notes, and month/year filtering if available through the existing API.

The search page should use an uncluttered form, clear result cards, and empty states for no matches.

## Profile

`/app/profile` will expose profile and account settings supported by the current backend. This includes profile editing and password behavior if present in the existing API. Delete-account behavior should only be included if the API currently supports it.

Profile forms should be grouped into clear cards: identity, contact/details, and account security.

## Error Handling

Errors should be calm, local, and actionable:

- Field validation errors appear near fields.
- API mutation errors appear near the affected form or action.
- Protected route failures redirect to `/sign-in`.
- Empty states explain what happened and offer the next useful action.
- Unexpected API failures should avoid technical stack details in the UI.

## Testing and Verification

Implementation should verify both code correctness and user-facing behavior.

Backend checks where relevant:

- Existing backend typecheck and lint commands
- Existing backend tests if they are already meaningful for touched API contracts

Frontend checks inside `frontend-next/`:

- Typecheck
- Lint
- Production build

Manual browser verification:

- Landing page
- Sign-in
- Sign-up
- Protected route redirect behavior
- Dashboard event CRUD
- Search
- Profile update flows
- Desktop and mobile responsive layouts

## Open Implementation Notes

The implementation plan should inspect the current API contracts before coding the API client. If a frontend requirement is blocked by a missing or inconsistent backend contract, the plan should call out the smallest backend change needed rather than expanding into a backend rewrite.
