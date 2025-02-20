import Auth from '../utils/auth';

// use right after clicking to add recipe (before adding to cart)
const addIngredient = async (name: string) => {
    const body = {
        name: name
    }

    try {
        const response = await fetch(
            'api/ingredient',
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Auth.getToken()}`
                },
                body: JSON.stringify(body)
            }
        )
        const responseData = await response.json();

        if(!response.ok) {
            if (response.status === 403) {
                console.warn(response.statusText);
                return null;
            }
            throw new Error(response.statusText);
        }

        return responseData;

    } catch (err) {
        console.error('Error adding ingredient: ', err);
        return Promise.reject('Could not add ingredient.');
    }

}

export { addIngredient }