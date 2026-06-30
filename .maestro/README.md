# iOS Simulator E2E (Codemagic + Maestro)

Runs the NMOAcademy iOS app on a **cloud macOS simulator** and exercises it with
Maestro UI flows. **No Apple Developer account or code signing required** — simulator
builds are unsigned.

## One-time setup (you)
1. Sign up at https://codemagic.io (free tier ≈ 500 macOS build-minutes/month).
2. Add this repository (or upload a zip of the mobile app folder).
3. Run the **`ios-simulator-e2e`** workflow (defined in `../codemagic.yaml`).

## What the CI does
1. `npm install` + `pod install`
2. Builds NMOAcademy for the iOS Simulator (Release → JS bundle embedded, no Metro/server needed)
3. Boots a simulator, installs the app
4. Runs every flow in this `.maestro/` folder
5. Uploads **screenshots, video, and a JUnit report** as build artifacts → I review them

## Flows
| File | Needs backend? | What it checks |
|---|---|---|
| `01-launch-smoke.yaml` | No | App launches & renders without crashing |
| `02-onboarding-nav.yaml` | No | Language → onboarding → sign-in entry navigation |
| `03-login.yaml` *(added later)* | Yes (reachable API) | Real email login → dashboard |

## Notes
- `03-login.yaml` needs a **publicly reachable backend** (the cloud Mac can't see a
  `localhost` dev server). Either point the app at a staging API or run against prod with test creds.
- Fixing the iOS config blockers (Camera/Mic/Speech `Info.plist` usage strings) is
  recommended before flows that touch those features, so the app doesn't crash on permission access.
- For more robust selectors later, add `testID` props to the login inputs/buttons.
- Interactive option: build can also be pushed to **Appetize.io** for a browser-embedded
  simulator you (or I, via the chrome-devtools MCP) can poke live.
