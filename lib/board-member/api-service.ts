import { ApiService } from '@/lib/api-service';
import { EncodedBoardMember } from '@/lib/board-member/models/board-member';
import { AsyncResult } from '@/lib/result';

export type ApiError = {
    message: string;
    status: number;
    endpoint: string;
};

export class BoardMemberApiService extends ApiService {
    private static _instance: BoardMemberApiService;

    private constructor() {
        super();
    }

    public static get instance(): BoardMemberApiService {
        BoardMemberApiService._instance ??= new BoardMemberApiService();
        return BoardMemberApiService._instance;
    }

    // Board Members API
    public async getBoardMembers(): AsyncResult<EncodedBoardMember[], ApiError> {
        return this.makeRequest<EncodedBoardMember[]>('/api/board-members', {
            method: 'POST',
        });
    }
}
