export interface CreateRoomDto {
    title: string,
    joinCode: string,
    maxParticipants: number
    ownerId: number
}