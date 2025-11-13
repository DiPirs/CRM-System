class TokenManager {
	private accessToken: string | null = null
	private refreshToken: string | null = null

	setTokens(tokens: { accessToken: string; refreshToken: string }) {
		this.accessToken = tokens.accessToken
		this.refreshToken = tokens.refreshToken
	}

	getAccessToken(): string | null {
		return this.accessToken
	}

	getRefreshToken(): string | null {
		return this.refreshToken
	}

	clearTokens() {
		this.accessToken = null
		this.refreshToken = null
	}
}

export const tokenManager = new TokenManager()
