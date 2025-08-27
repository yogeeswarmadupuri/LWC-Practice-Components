# GptProfileComponent

A Lightning Web Component that displays a professional Salesforce resume/profile and lets users download it as a PDF using the jsPDF library from a Static Resource.

## Overview
- Renders profile header, contact info, skills, work experience, education, and key achievements.
- Provides a "Download Resume" button that generates and downloads a PDF locally (client-side) using jsPDF.
- Uses Lightning base components and styles scoped to the component.

## Key Features
- Download resume as PDF with layout-aware page breaks and wrapped text.
- Clean, responsive layout using LWC + CSS.
- Defensive error handling with toasts on initialization or PDF generation failures.

## Security & Compliance
- External links include `rel="noopener noreferrer"` with `target="_blank"` to prevent reverse tabnabbing.
- The jsPDF library is loaded via `@salesforce/resourceUrl` and `loadScript`, leveraging Salesforce CSP and Locker/LWS.
- No dynamic HTML injection (`innerHTML`) or unsafe DOM manipulation.
- Recommendation: Host certification badge images as a Static Resource bundle rather than linking external URLs to avoid CSP issues and improve reliability.

## Dependencies
- Static Resources:
  - `jspdf` (zip or JS file providing `window.jspdf.jsPDF`)
  - `profilePhoto` (your profile image; PNG/JPG)
  - Optional: a certification images bundle (e.g. `certBadges/Administrator.png`, etc.)
- Lightning Base Components: `lightning-button`, `lightning-icon`

## Targets
The component is exposed to the following targets via its meta file:
- `lightning__AppPage`
- `lightning__HomePage`
- `lightning__RecordPage`
- `lightning__Tab`
- `lightningCommunity__Page`
- `lightningCommunity__Default`

## Usage
1. Ensure the `jspdf` and `profilePhoto` Static Resources exist.
2. Drag-and-drop `c-gpt-profile-component` onto a Lightning App, Home, Record, or Experience Cloud page using the Lightning App Builder.
3. Optionally customize name, email, links, skills, experience, education, and achievements in the component JS file.

Example (embedding in another LWC):

```html
<template>
    <c-gpt-profile-component></c-gpt-profile-component>
</template>
```

## Configuration
- Contact and profile fields are defined as component fields (e.g., `name`, `email`, `linkedInUrl`). To make these configurable at design time, promote them to `@api` and define design attributes in the `.js-meta.xml` file.
- Certification images: replace external `imageUrl` values with Static Resource URLs and import via `@salesforce/resourceUrl` for CSP safety.

## Testing
- Unit tests scaffold: `force-app/main/default/lwc/gptProfileComponent/__tests__/gptProfileComponent.test.js`
- Run tests: `npm run test:unit`

## Linting & Code Quality
- Lint the project: `npm run lint`
- Salesforce Code Analyzer (if installed):
  - ESLint rules only: `sf code-analyzer run --rule-selector eslint:Recommended --target force-app/main/default/lwc/gptProfileComponent --view table`
  - Note: PMD/CPD/SFGE engines require Java 11+; Flow engine requires Python 3.10+. Add a `code-analyzer.yml` to disable unavailable engines if needed.

## Notes & Limitations
- PDF generation is client-side; formatting fidelity depends on jsPDF capabilities and the text content.
- Large changes to the template’s structure or CSS may require adjusting PDF layout constants (margins, line heights, page-break logic).
- The component currently uses internal fields for content; consider externalizing content into Custom Metadata/Labels or making fields public (`@api`) for admin configurability.

## Accessibility
- Links include accessible labels where needed.
- Profile image includes descriptive `alt` text. Review and adjust for your own usage.

## Change Log (Highlights)
- Security: `rel="noopener noreferrer"` added to external links.
- Resource loading: removed cache-busting query strings from `loadScript`.
- Robustness: null-check added for summary text before use.
- Lint: cleaned up console usage; minor ESLint fixes applied.
