export function calculateTotalBalance(
  ethBalance: number,
  ethPrice: number,
  tokens: Array<{
    tokenInfo: {
      price?: {
        rate: number
      }
    }
    balance: number
  }> = []
) {
  // Calculate ETH value
  const ethValue = ethBalance * ethPrice

  // Calculate tokens value
  const tokensValue = tokens.reduce((total, token) => {
    const price = token.tokenInfo.price?.rate ?? 0
    const balance = token.balance / Math.pow(10, 18)
    return total + balance * price
  }, 0)

  return {
    totalValueUSD: ethValue + tokensValue,
    ethValue,
    tokensValue,
  }
}
