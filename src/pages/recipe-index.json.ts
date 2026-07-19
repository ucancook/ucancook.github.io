import type { APIRoute } from 'astro';
import { recipes, normalizeTag } from '../lib/recipes';

export const prerender = true;

export const GET: APIRoute = () => {
  const index = recipes.map((recipe, index) => ({
    index: index + 1,
    slug: recipe.slug,
    title: recipe.title,
    description: recipe.description,
    added: recipe.added ?? recipe.updated,
    updated: recipe.updated,
    prepMinutes: recipe.prepMinutes,
    cookMinutes: recipe.cookMinutes,
    ingredientCount: recipe.ingredients.length,
    tags: recipe.tags,
    normalizedTags: recipe.tags.map((tag) => normalizeTag(tag)),
    search: `${recipe.title} ${recipe.description} ${recipe.tags.join(' ')} ${recipe.ingredients
      .map((ingredient) => ingredient.item)
      .join(' ')}`.toLowerCase(),
    photo: recipe.photos?.[0] ?? null,
  }));

  return new Response(JSON.stringify(index), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });
};

