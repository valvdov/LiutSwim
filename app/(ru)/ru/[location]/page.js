import LocationPage from '@/components/LocationPage';
import {getLocation, locationMetadata, locationStaticParams} from '@/lib/locationPage';

export const dynamicParams = true;
export const revalidate = 3600;

export function generateStaticParams() {
    return locationStaticParams();
}

export async function generateMetadata({params}) {
    const {location} = await params;
    return locationMetadata(location, 'ru');
}

export default async function Page({params}) {
    const {location: id} = await params;
    const {content, location} = await getLocation(id);
    return <LocationPage lang="ru" content={content} location={location}/>;
}
