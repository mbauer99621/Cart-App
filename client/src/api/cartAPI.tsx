import Auth from '../utils/auth';

// use upon creating user
const makeCart = async (userId: number) => {
    const body = {
        userId: userId
    }

    try {
        const response = await fetch(
            'api/cart/',
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Auth.getToken()}`
                },
                body: JSON.stringify(body)
            }
        );
        const responseData = await response.json();

        if(!response.ok) {
            throw new Error(response.statusText);
        }

        return responseData;

    } catch (err) {
        console.error('Error making cart: ', err);
        return Promise.reject('Could not make cart.');
    }
} 

const retrieveCart = async (userId: number) => {
    const body = {
        userId: userId
    }

    try {
        const response = await fetch(
            'api/cart/items',
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Auth.getToken()}`
                },
                body: JSON.stringify(body)
            },
        );
        const responseData = await response.json();

        if(!response.ok) {
            throw new Error(response.statusText);
        }

        return responseData.Ingredients

    } catch (err) {
        console.error('Error getting cart ingredients: ', err);
        return Promise.reject('Could not fetch cart ingredients.');
    }
}

const addToCart = async (name: string, userId: number) => {
    const body = {
        name: name,
        userId: userId
    }

    try {
        const response = await fetch(
            'api/cart/item',
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Auth.getToken()}`
                },
                body: JSON.stringify(body)
            }
        );
        const responseData = await response.json();

        if(!response.ok) {
            throw new Error(response.statusText);
        }

        return responseData;
    } catch (err) {
        console.error('Error adding cart ingredient: ', err);
        return Promise.reject('Could not add cart ingredient.');
    }
}

const DeleteFromCart = async (name: string, userId: number) => {
    const body = {
        name: name,
        userId: userId
    }

    try {
        const response = await fetch(
            'api/cart/item',
            {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Auth.getToken()}`
                },
                body: JSON.stringify(body)
            }
        );
        const responseData = await response.json();

        if(!response.ok) {
            throw new Error(response.statusText);
        }

        return responseData;
    } catch (err) {
        console.error('Error deleting cart ingredient: ', err);
        return Promise.reject('Could not delete cart ingredient.');
    }
}

export { makeCart, retrieveCart, addToCart, DeleteFromCart }