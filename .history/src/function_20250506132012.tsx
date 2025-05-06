


// Auth functions
const login = async (email: string, password: string) => {
    setLoading(true);

    try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // In a real app, we would verify credentials with the backend
        const mockUser = {
            id: `user_${Math.random().toString(36).substring(2, 9)}`,
            email,
            name: email.split('@')[0],
        };

        setUser(mockUser);
        localStorage.setItem('cipher_user', JSON.stringify(mockUser));
    } catch (error) {
        console.error('Login failed', error);
        throw error;
    } finally {
        setLoading(false);
    }
};

const register = async (email: string, password: string, name: string) => {
    setLoading(true);


    try {
        // call a function that register the user in the database 
        const key = await authenticateUser(email, password, name)

        setUser({ name, email, password })

        setUser(user);
        localStorage.setItem('cipher_user', JSON.stringify(mockUser));
    } catch (error) {
        console.error('Registration failed', error);
        throw error;
    } finally {
        setLoading(false);
    }
};

const logout = () => {
    setUser(null);
    localStorage.removeItem('cipher_user');
};
