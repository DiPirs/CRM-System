import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '../../store/store'

export const selectUserStore = (state: RootState) => state.user

export const selectProfile = createSelector(
	selectUserStore,
	user => user.profile
)
