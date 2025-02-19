import Auth from '../utils/auth';

// use upon creating user
const makeFridge = async (userId: number) => {
    const body = {
        userId: userId
    }

    try {
        const response = await fetch(
            'api/fridge/',
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
        console.error('Error making fridge: ', err);
        return Promise.reject('Could not make fridge.');
    }
} 

const retrieveFridge = async (userId: number) => {
    const body = {
        userId: userId
    }

    try {
        const response = await fetch(
            'api/fridge/items',
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
        console.error('Error getting fridge ingredients: ', err);
        return Promise.reject('Could not fetch fridge ingredients.');
    }
}

const addToFridge = async (name: string, userId: number) => {
    const body = {
        name: name,
        userId: userId
    }

    try {
        const response = await fetch(
            'api/fridge/item',
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
        console.error('Error adding fridge ingredient: ', err);
        return Promise.reject('Could not add fridge ingredient.');
    }
}

const DeleteFromFridge = async (name: string, userId: number) => {
    const body = {
        name: name,
        userId: userId
    }

    try {
        const response = await fetch(
            'api/fridge/item',
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
        console.error('Error deleting fridge ingredient: ', err);
        return Promise.reject('Could not delete fridge ingredient.');
    }
}

export { makeFridge, retrieveFridge, addToFridge, DeleteFromFridge }