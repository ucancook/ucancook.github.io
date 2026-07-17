export type RecipePhoto = {
  src: string;
  alt?: string;
  credit?: string;
};

export type Recipe = {
  slug: string;
  title: string;
  description: string;
  prepMinutes: number;
  cookMinutes: number;
  servings: number;
  calories?: number;
  tags: string[];
  photos?: RecipePhoto[];
  ingredients: { amount: string; item: string; note?: string }[];
  steps: string[];
  notes?: string[];
  updated: string;
};

export const normalizeTag = (value: string) =>
  value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const cuisineAliases = new Set(['chinese', 'japanese', 'japenese', 'thai']);
const removedTags = new Set([
  'brunch', 'lunch', 'snack', 'high fiber', 'one pot', 'meal prep',
  'kid friendly', 'dairy free', 'gluten free',
]);

const consolidateTags = (tags: string[]) => {
  const consolidated = tags
    .filter((tag) => !removedTags.has(tag.toLowerCase().trim()))
    .map((tag) => (cuisineAliases.has(tag.toLowerCase().trim()) ? 'Asian' : tag));
  return [...new Set(consolidated)];
};

const recipeModules = import.meta.glob('../content/recipes/*.json', { eager: true });

export const recipes: Recipe[] = Object.values(recipeModules)
  .map((module: any) => module.default as Recipe)
  .map((recipe) => ({ ...recipe, tags: consolidateTags(recipe.tags) }))
  .sort((a, b) => a.title.localeCompare(b.title));

const tagCatalog = [
  'Special', 'Breakfast', 'Dinner', 'Appetizer', 'Side dish', 'Soup', 'Salad', 'Dessert', 'Drink',
  'Indian', 'Italian', 'Mexican', 'Asian', 'Mediterranean', 'Middle Eastern', 'American',
  'Healthy', 'High protein', 'Vegan', 'Vegetarian', 'Low carb',
  'Low calorie', 'Mid calorie', 'High calorie', 'Quick',
];

export const allTags = [
  ...tagCatalog,
  ...[...new Set(recipes.flatMap((recipe) => recipe.tags))].filter((tag) => !tagCatalog.includes(tag)),
];
