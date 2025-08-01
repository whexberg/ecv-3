import './image-card-grid.css';

import { ImageCard } from '@/src/app/board-members/components/image-card';

type Props = {
    items: Array<{ position: string; name: string; image: string }>;
};

export const ImageCardGrid = ({ items }: Props) => {
    return (
        <div className="image-card-grid grid">
            {items?.map((profile, idx) => (
                <ImageCard
                    key={profile.position + idx}
                    description={profile.position}
                    image={{ src: profile.image, alt: profile.name }}
                    title={profile.name}
                />
            ))}
        </div>
    );
};
