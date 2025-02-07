import {Config} from 'react-native-config';

export const uploadImageToImgur = async (imageBase64: string) => {
    try {
        const CLIENT_ID = Config.IMGUR_CLIENT_ID;

        const response = await fetch('https://api.imgur.com/3/upload', {
            method: 'POST',
            headers: {
                'Authorization': `Client-ID ${CLIENT_ID}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                image: imageBase64,
                type: 'base64',
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.data.link;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};