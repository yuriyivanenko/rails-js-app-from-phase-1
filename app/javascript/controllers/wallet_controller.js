import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["addFunds", "walletBalance"]

  add() {
    const wallet = this.walletBalanceTarget
    const element = this.addFundsTarget
    const amount = parseInt(element.value)
    let walletBalance

    fetch("http://localhost:3000/wallet")
      .then((res) => res.json())
      .then((data) => {
        walletBalance = data[0].amount
        let updateWalletToThisAmount = amount + walletBalance
        this.updateWallet(updateWalletToThisAmount)
        wallet.textContent = `$${updateWalletToThisAmount.toFixed(2)}`
        element.value = ""
      })
  }

  updateWallet(amount) {
    fetch("http://localhost:3000/wallet/balance", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: amount }),
    })
  }
}
