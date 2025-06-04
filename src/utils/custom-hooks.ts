import { ThunkDispatch } from '@reduxjs/toolkit';
import { TOrdersStreamActions } from '@services/ordersStream/actions';
import { rootReducer } from '@services/store';
import {
	TConstructorActions,
	TIngredientInfoActions,
	TIngredientsActions,
	TOrderActions,
	TUserActions,
} from '@services/types-slice';
import { Dispatch, SetStateAction, useState } from 'react';
import {
	useDispatch as dispatchHook,
	useSelector as selectorHook,
} from 'react-redux';

type TReturnOnChange = (e: React.ChangeEvent<HTMLInputElement>) => void;

export const useForm = <TState extends Record<string, any>>(
	initialState: TState
): [TState, TReturnOnChange, Dispatch<SetStateAction<TState>>] => {
	const [form, setFormValue] = useState(initialState);

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormValue({
			...form,
			[e.target.name]: e.target.value,
		});
	};
	return [form, onChange, setFormValue];
};

export type AppActions =
	| TConstructorActions
	| TIngredientInfoActions
	| TIngredientsActions
	| TOrderActions
	| TUserActions
	| TOrdersStreamActions;

// при использовании WS тут начинается ошибка
// export type RootState = ReturnType<typeof store.getState>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActions>;

export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = selectorHook.withTypes<RootState>();
