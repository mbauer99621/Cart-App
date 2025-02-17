//landindPage.tsx

import { useEffect, useState } from "react";


interface Category {
    idCategory: string;
    strCategory: string;
    strCategoryThumb: string;
}

const Home = () => {
    const [categories, setCategories] = useState<Category[]>([]); // Explicitly define state type

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
                const data = await response.json();
                
                if (data.categories) {
                    setCategories(data.categories as Category[]); // Cast response to expected type
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <section id="recipe-categories-section">
            <div id="recipe-categories-container">
                <div id="recipe-categories-wrapper">
                    <div id="recipe-categories">
                        {categories.length > 0 ? (
                            categories.map((category) => (
                                <div key={category.idCategory} className="category-card">
                                    <h3>{category.strCategory}</h3>
                                    <img src={category.strCategoryThumb} alt={category.strCategory} />
                                </div>
                            ))
                        ) : (
                            <p>Loading categories...</p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Home;
