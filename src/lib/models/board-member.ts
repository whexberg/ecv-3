export type EncodedBoardMember = {
    id?: string;
    name?: string;
    image?: string;
    position?: string;
    created_at?: string;
    updated_at?: string;
};

export type IBoardMember = {
    id: string;
    name: string;
    image: string;
    position: string;
    createdAt: string;
    updatedAt: string;
};

export class BoardMember implements IBoardMember {
    id: string;
    name: string;
    image: string;
    position: string;
    createdAt: string;
    updatedAt: string;

    constructor(d: IBoardMember) {
        this.id = d.id;
        this.name = d.name;
        this.image = d.image;
        this.position = d.position;
        this.createdAt = d.createdAt;
        this.updatedAt = d.updatedAt;
    }

    public static deserialize = (d?: EncodedBoardMember): BoardMember => {
        return new BoardMember({
            id: d?.id ?? '',
            name: d?.name ?? '',
            image: d?.image ?? '',
            position: d?.position ?? '',
            createdAt: d?.created_at ?? '',
            updatedAt: d?.updated_at ?? '',
        });
    };

    public serialize = (): EncodedBoardMember => {
        return {
            id: this.id,
            name: this.name,
            image: this.image,
            position: this.position,
            created_at: this.createdAt,
            updated_at: this.updatedAt,
        };
    };
}
