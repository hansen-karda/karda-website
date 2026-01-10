import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// 1. You will get these values after running "npm create sanity@latest"
export const client = createClient({
    projectId: 'l2w4m5p0', // <--- You will paste your ID here
    dataset: 'production',
    useCdn: true, // set to `false` to bypass the edge cache
    apiVersion: '2023-05-03', // use current date (YYYY-MM-DD) to target the latest API version
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => {
    return builder.image(source);
};
