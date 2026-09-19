# Vopak Cyber Incident Tabletop

This repository contains a portable static website for a facilitator led cybersecurity tabletop exercise. It supports one team or two competing teams, a 90 to 120 minute session, timed injects, a controlled field mission, team scoring, and after action exports.

The exercise includes three rotating terminal scenarios. Facilitators can select a specific scenario or use random rotation, which avoids the most recently played scenario on the same browser.

The phishing inject reflects the current Vopak reporting practice. Employees use the Hoxhunt button for suspected phishing so the message reaches the Vopak SOC. When the user interacted with the message or compromise, IT impact, OT impact, safety impact, or operational impact is suspected, the Hoxhunt report is followed by immediate escalation to local IT or the OT focal point.

## Run locally

Open `dist/index.html` in a modern browser. All exercise data remains in the browser and can be exported as a JSON record.

## Publish with GitHub Pages

1. Create a private GitHub repository.
2. Upload the complete project, including the `.github` folder.
3. Open the repository settings and select Pages.
4. Choose GitHub Actions as the source.
5. Run the included Pages workflow.

The workflow publishes the contents of the `dist` folder.

## Important publishing note

The site contains Vopak branding and references to internal Vopak guidance. It does not bundle the internal source documents. Keep the repository and deployment private unless Vopak approves public distribution. Review all current internal requirements and contact information before facilitating a real exercise.

## Content boundaries

The scenario is fictional and uses generalized terminal operations. The exercise must not trigger real incident tickets, external notifications, operational shutdowns, or access to restricted areas. The approved Facility Security Plan, Cybersecurity Plan, Cyber Incident Response Plan, and directions from the cognizant Captain of the Port remain authoritative.
