# You can Cook

Mobile-first Astro recipe PWA for GitHub Pages. Recipes are individual JSON files, so they are easy to edit from a phone through GitHub.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:4321`.

## Production check

```bash
npm run build
npm run preview
```

## Configure GitHub edit links

For working GitHub edit links during local development:

```bash
PUBLIC_GITHUB_REPO=youcancook/youcancook.github.io npm run dev
```

If your GitHub username or repository is different, change the value above.

## Add and edit recipes

- Use `/new` to validate and preview a new recipe, then copy/open the generated JSON in GitHub.
- Every recipe page has an **Edit this recipe on GitHub** link.
- Recipe files are stored in `src/content/recipes/`.

## Deploy

Push to the `main` branch of your GitHub repository. In **Settings → Pages**, select **GitHub Actions** as the source. The included workflow handles Astro deployment.

For a user site like `youcancook.github.io`, keep the site at the root. For a project site, you can set `BASE_PATH` during deployment if needed.

## Install as an app

- Android Chrome: menu → **Install app** or **Add to Home screen**.
- iPhone/iPad: Safari → Share → **Add to Home Screen**.

## Mobile floating action button

In a regular mobile browser, the **Add recipe** button is raised above bottom browser controls. In installed standalone mode, it moves back toward the safe-area edge.


## Imported legacy collection

Recipes, the chef logo/favicon, and the Dal Makhani photo reference were imported from the original `chahatdeep/chef` website. The imported recipes are stored as normal JSON files and can be edited like the rest of the collection.

## Optional recipe photos

The recipe editor accepts either image URLs/site paths or photos selected from the phone. Selected files are previewed locally and added to the generated recipe JSON as `/photos/<recipe-slug>/<filename>`. Upload those image files to the matching folder under `public/photos/` before publishing. Photos are optional.

## Included experience features

- Favorites stored locally in the browser, with a Favorites filter on the home page.
- Consistent recipe image areas and placeholders for recipes without photography.
- Full-screen cooking mode with ingredient checklists, step navigation, progress, and screen wake lock where supported.
- Native mobile sharing with clipboard fallback, plus a print-optimized recipe layout.
- Schema.org Recipe JSON-LD on every recipe page.
- Progressive loading, retry handling, loading indicators, and useful empty states.
