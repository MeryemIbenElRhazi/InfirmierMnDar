import { ID, Account, Client, Databases, Avatars } from 'react-native-appwrite';

export const config = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.meryem.InfermierMnDar",
    projectId: "664df4ac0014ac19a0ec",
    databaseId: "664df69b002832ca2e58",
    userCollectionId: "664df6b8000809084cf6",
    storageId: "664df889002778b93735"
};

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId); // Your project ID

const databases = new Databases(client);
const account = new Account(client);
const avatars = new Avatars(client);

// Debugging: Log available methods
console.log('Available methods on Account:', Object.keys(account));

export const createUser = async (email, password, username) => {
    try {
        // Ensure email validation
        if (!email || !password || !username) {
            throw new Error('All fields are required.');
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            throw new Error('Invalid email format.');
        }

        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        );
        if (!newAccount) throw new Error('Account creation failed');
        
        const avatarUrl = avatars.getInitials(username);
        
        await signIn(email, password);
        
        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email: email,
                username: username,
                avatar: avatarUrl,
            }
        );
        
        return newUser;
    } catch (error) {
        console.error('Error creating user:', error);
        throw new Error(error.message);
    }
};

export async function signIn(email, password) {
    try {
        // Debugging: Log the function to see if it exists
        console.log('createEmailSession function:', account.createEmailSession);

        if (typeof account.createEmailSession !== 'function') {
            throw new Error('createEmailSession is not a function');
        }

        const session = await account.createEmailSession(email, password);
        return session;
    } catch (error) {
        console.error('Error signing in:', error);
        throw new Error(error.message);
    }
}
