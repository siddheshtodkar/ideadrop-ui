let accessToken: string | null = null

export const setOldAcccessToken = (token: string | null) => {
  accessToken = token
}

export const getAccessToken = () => accessToken