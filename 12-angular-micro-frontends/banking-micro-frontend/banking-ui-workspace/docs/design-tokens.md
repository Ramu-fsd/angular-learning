# Design tokens

The components currently use a compact, local set of CSS values. These values are intended as an initial shared visual language and can be promoted to CSS custom properties as the design system grows.

| Token | Value | Usage |
|---|---|---|
| Primary | `#245fc7` | Main actions and links |
| Text | `#1c2a40` | Primary content |
| Muted text | `#8490a2` | Descriptions and metadata |
| Border | `#e4eaf2` | Cards and controls |
| Surface | `#ffffff` | Cards and panels |
| Success | `#16794e` | Completed/healthy states |
| Warning | `#9a6813` | Pending/review states |
| Danger | `#b83434` | Failed/high-risk states |
| Info | `#315fae` | Informational states |

Use semantic variants rather than hardcoding colors in each remote. Confirm contrast and accessibility before production adoption.
