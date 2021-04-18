import { Dispatch } from "react";
import { SET_BOARD_TYPE, CurrentBoardDispatchType } from "./actionTypes";

export const setBoardType = (BoardType: string) => async (dispatch: Dispatch<CurrentBoardDispatchType>) => {
    dispatch({
        type: SET_BOARD_TYPE,
        payload: BoardType
    })
};
