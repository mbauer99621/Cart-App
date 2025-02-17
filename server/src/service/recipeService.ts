class RecipeService {
    private baseUrl: string;

    constructor() {
        this.baseUrl = "https://www.themealdb.com/api/json/v1/1";
    }

    fetchRandomRecipe = async () => {
        const recipeResponse = await fetch (
            `${this.baseUrl}/random.php`
        );

        const recipeBody = await recipeResponse.json();

        // console.log(recipeBody);

        return recipeBody.meals;
    }

    fetchCategories = async () => {
        const categoriesResponse = await fetch (
            `${this.baseUrl}/list.php?c=list`
        );

        const categoriesBody = await categoriesResponse.json();
        return categoriesBody.meals;
    }

    fetchMealsByCategory = async(category: string) => {
        const recipesResponse = await fetch (
            `${this.baseUrl}/filter.php?c=${category}`
        );

        const recipesBody = await recipesResponse.json();
        return recipesBody.meals;
    }

    fetchRecipeById = async(id: string) => {
        const recipesResponse = await fetch (
            `${this.baseUrl}/lookup.php?i=${id}`
        );

        const recipesBody = await recipesResponse.json();
        return recipesBody.meals;
    }
}

export default new RecipeService()