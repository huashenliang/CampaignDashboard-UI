import { CurrentBoardType, SET_BOARD_TYPE } from '../../Actions/actionTypes';

interface IBoardState {
    boardType: string
}

const initialState: IBoardState = {
    boardType: 'All'
}

export const boardTypeReducer = (state: IBoardState = initialState, action: CurrentBoardType): IBoardState => {
    switch (action.type) {
        case SET_BOARD_TYPE:
            return {
                boardType: action.payload
            }
        default:
            return state;
    }
}
