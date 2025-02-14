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

        return recipeBody.meals[0];
    }
}

export default new RecipeService()