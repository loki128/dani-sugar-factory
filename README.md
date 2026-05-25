# Dani Sugar Factory V2 - Live Candy Field

This version runs side-by-side with the root hover/video prototype. It uses the generated candy landscape as the scene and contains the Three.js candy-field implementation intended for a true-alpha Magnific atlas.

## Preview

From the project root:

```powershell
python -m http.server 5173
```

Open:

- V2 clean hero while alpha is blocked: `http://localhost:5173/v2-live-field/`
- V2 extraction preview from the current flattened atlas: `http://localhost:5173/v2-live-field/?previewField=1`
- V1 portal: `http://localhost:5173/`

## Assets

`../assets/refs/` contains the four Magnific exports. The three files described as transparent were exported with their checkerboard baked into RGB pixels. They cannot be used as production overlays without damaged edges and fragmented white candy. They are retained under `*-flattened.png` names and are loaded only for inspection under `?previewField=1`.

- `candy-landscape.webp`: optimized web background generated from the landscape PNG.
- `candy-atlas-flattened.png`: current source candy sheet for imperfect preview only.
- `title-with-candy-flattened.png`: current source reference for inspection only.
- `title-clean-flattened.png`: stored source reference; the moving experience uses locked HTML text instead.

For production, add true-alpha exports named `candy-atlas.png` and `title-with-candy.png`, then set `../assets/refs/production-status.json` to `"alphaReady": true`. The field route will then activate without the preview query.

## Behavior

- Desktop with a true-alpha atlas, or under the preview query: cursor attracts candy sprites; nearing the wordmark pulls the field into a candy crown; `Enter` triggers a burst and curtain transition.
- Current clean route, touch, and reduced motion: no degraded sprite extraction is displayed; the real background renders behind the locked title and usable entry button. A future true-alpha `title-with-candy.png` will automatically supply static edge decorations.
