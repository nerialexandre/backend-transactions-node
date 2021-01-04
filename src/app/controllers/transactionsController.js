
const { v4: uuid } = require('uuid')

const transactionsList = [
  {
    id: 'uuid',
    title: 'Salário',
    value: 4000,
    type: 'income'
  },
  {
    id: 'uuid',
    title: 'Freela',
    value: 2000,
    type: 'income'
  },
  {
    id: 'uuid',
    title: 'Pagamento da fatura',
    value: 4000,
    type: 'outcome'
  },
  {
    id: 'uuid',
    title: 'Cadeira Gamer',
    value: 1200,
    type: 'outcome'
  }
]

module.exports = () => {
  const controller = {}

  const getbalance = async () => {
    const balance = transactionsList.reduce((accumulator, transaction) => {
      if (transaction.type === 'income') {
        accumulator.income += transaction.value
      } else if (transaction.type === 'outcome') {
        accumulator.outcome += transaction.value
      }
      return accumulator
    }, {
      income: 0,
      outcome: 0,
      total: 0
    })

    balance.total = balance.income - balance.outcome
    return balance
  }

  controller.getAll = async (req, res) => {
    const balance = await getbalance()
    return res.status(200).json({ trasaction: transactionsList, balance: balance })
  }

  controller.getOne = async (req, res) => {
    const { id } = req.params

    console.log(id)

    const transaction = await transactionsList.find(item => item.id === id)

    console.log(transaction)

    res.status(200).json(transaction)
  }

  controller.create = async (req, res) => {
    const transaction = req.body

    const balance = await getbalance()
    balance.total = balance.income - balance.outcome

    if (transaction.type === 'outcome' && (balance.total - transaction.value) < 0) {
      return res.status(400).json({ message: 'valor solicitado menor que o saldo' })
    }

    transaction.id = uuid()

    transactionsList.push(transaction)

    return res.status(200).json(transaction)
  }

  return controller
}
