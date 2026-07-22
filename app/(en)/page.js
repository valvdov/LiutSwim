import HomePage from '@/components/HomePage';
import {getContent} from '@/lib/content';

export default async function Page() {
    const content = await getContent();
    return <HomePage lang="en" content={content}/>;
}
