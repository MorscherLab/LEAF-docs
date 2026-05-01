# Use the Hosted Lab Version

If your lab operates a MINT server with LEAF deployed, no local installation is required. Access the lab's MINT URL through a web browser and authenticate with your lab credentials.

> [Screenshot: MINT login page with the LEAF plugin tile visible after login]

## Access MINT

The Morscher Lab default URL is [mint.morscherlab.org](https://mint.morscherlab.org). Other deployments use site-specific URLs; consult your lab administrator if the address is not known.

## Log in

Use the credentials your lab admin gave you. MINT handles authentication; LEAF reads your identity from the MINT session — there is no separate LEAF login.

## Find LEAF

After logging in, look for the **LEAF** tile or sidebar entry. The exact location depends on how your admin configured the dashboard.

> [Screenshot: MINT dashboard with the LEAF plugin highlighted]

Click the tile. LEAF opens inside MINT — the lab branding stays at the top, and the LEAF interface renders below.

## What's different from desktop?

| | Desktop | Hosted (MINT) |
|---|---|---|
| **Where data lives** | On your computer | On the lab server |
| **Login** | None — local only | Lab credentials |
| **RAW files** | You browse local folders | You browse server folders the admin shared with you |
| **Performance** | Limited by your machine | Limited by the lab server |
| **Sharing results** | You email `.msd` files | Coworkers open the same file path |

The analysis workflow itself is identical — same Extract page, same charts, same export options.

## Troubleshooting

| Problem | Fix |
|---------|-----|
| "Can't reach the server" | Check you're on the lab network or VPN. Ask your admin if you're not sure. |
| "LEAF not visible after login" | Your account may not have access to the LEAF plugin. Ask your admin to grant the `leaf` plugin role. |
| Login loops back to the page | Cookies or third-party cookies may be blocked for the lab domain. Allow them and reload. |
| Files I expect to see aren't listed | The admin sets which folders are visible to LEAF. Ask them to add the folder you need. |

## Next step

→ [Run your first analysis](/get-started/quickstart) (5 minutes — same workflow on desktop and hosted)
