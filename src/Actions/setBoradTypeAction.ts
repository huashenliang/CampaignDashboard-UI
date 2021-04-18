import { Dispatch } from "react";
import { SET_BOARD_TYPE, CurrentBoardType } from "./actionTypes";

export const setBoardType = (BoardType: string) => async (dispatch: Dispatch<CurrentBoardType>) => {
    dispatch({
        type: SET_BOARD_TYPE,
        payload: BoardType
    })
};
